const {test}=require('node:test');const assert=require('node:assert/strict');const {load}=require('./route-loader.cjs');
const g=load('lib/generation-fidelity.ts'); const {resolveDocument}=load('lib/document-resolver.ts');
const mutual=resolveDocument('business','non-disclosure-agreement','mutual',{state:'Georgia'});
test('mutual intent cannot be satisfied by the one-way audited output',()=>{
 const fields={disclosingParty:'Alpha Ltd',receivingParty:'Beta Ltd'};
 assert.ok(g.validateFidelity('Alpha Ltd discloses to Beta Ltd. Only the receiving party shall keep it secret.',mutual,fields).includes('MUTUAL_OBLIGATIONS_NOT_PRESERVED'));
 const text='Alpha Ltd and Beta Ltd. Mutual confidentiality obligations. Each party shall protect the confidential information of the other party.';
 assert.equal(g.validateFidelity(text,mutual,fields).length,0);
 assert.match(g.generationPrompt(mutual,fields,''),/MUTUAL NDA/);
 const unilateral=resolveDocument('business','non-disclosure-agreement','unilateral',{state:'Georgia'});
 assert.ok(g.validateFidelity(text,unilateral,fields).includes('UNILATERAL_OBLIGATIONS_NOT_PRESERVED'));
});
test('generic and localized jurisdictions retrieve identical state/national context; city adds rather than replaces state',()=>{
 const base=resolveDocument('real-estate','residential-lease-agreement',null,{state:'Georgia'});
 const local=resolveDocument('real-estate','georgia-residential-lease-agreement');
 assert.deepEqual([...g.jurisdictionKeys(base)],[...g.jurisdictionKeys(local)]);
 assert.deepEqual([...g.jurisdictionKeys(resolveDocument('real-estate','chicago-residential-lease-agreement'))],['us','illinois','chicago']);
 const fact={id:'f',jurisdiction:'georgia',content:'Fixture only',citation:null,source:'manual',sourceUrl:'https://example.gov/fixture',status:'approved',reviewedById:'reviewer',reviewedAt:new Date()};
 assert.equal(g.grounding(base,[fact]).facts.length,1);
 assert.equal(g.grounding(base,[{...fact,reviewedAt:new Date(0)}]).facts.length,0);
 assert.equal(g.grounding(base,[{...fact,reviewedAt:new Date(Date.now()+86400000)}]).facts.length,0);
 assert.equal(g.grounding(base,[{...fact,reviewedById:null}]).facts.length,0);
});
test('user rent survives citation cleaning but cannot authorize an unsupported legal cap',()=>{
 const r=resolveDocument('real-estate','georgia-residential-lease-agreement');
 const fields={rentAmount:'1500',leaseStartDate:'2026-11-01'};
 const cleaned=g.cleanGeneratedText('Rent is $1,500 per month.\nLease starts 2026-11-01.','',[],fields);
 assert.match(cleaned.cleaned,/\$1,500 per month/);assert.equal(cleaned.flagged,0);
 assert.equal(g.validateFidelity(cleaned.cleaned,r,fields).length,0);
 const legal=g.cleanGeneratedText('The statutory maximum is $1,500 per month.','',[],fields);
 assert.ok(legal.flagged>0);assert.match(legal.cleaned,/NEEDS_LEGAL_REVIEW/);
 assert.ok(g.validateFidelity('Rent is $2,000 per month.',r,fields).includes('FACT_NOT_PRESERVED:rentAmount'));
 assert.ok(g.validateFidelity('Signed on October 10, 2026.',r,{}).includes('FABRICATED_EXECUTION_DATE'));
 assert.ok(g.outputIssues('Name: [PARTY_A_NAME]').includes('UNRESOLVED_PLACEHOLDERS'));
});
test('expired/missing scope review is never treated as launch approval',()=>{
 const {reviewedScope}=load('lib/reviewed-document-scopes.ts');assert.equal(reviewedScope('anything'),undefined);
 assert.equal(reviewedScope('fixture',new Date(),[{key:'fixture',reviewer:'Synthetic test',evidenceUrl:'https://example.invalid/review',reviewedAt:'2020-01-01',expiresAt:'2020-01-02'}]),undefined);
});
test('export rechecks source revocation/freshness instead of trusting a saved approval flag',async()=>{
 const crypto=require('crypto');let status='approved';
 const content='Synthetic source statement';const contentHash=crypto.createHash('sha256').update(content).digest('hex');
 const {requireReviewedVersion}=load('lib/document-review.ts',{'./reviewed-document-scopes':{reviewedScope:()=>({evidenceUrl:'https://example.invalid/review'})},'./prisma':{prisma:{verifiedFact:{findMany:async()=>[{id:'f',content,status,reviewedById:'reviewer',reviewedAt:new Date(),sourceUrl:'https://example.gov/source'}]},documentReview:{findUnique:async()=>null}}}});
 const version={id:'v',contentHash:'doc-hash',review:{readyForExport:true,scopeKey:'scope',scopeEvidenceUrl:'https://example.invalid/review',checkedAt:new Date().toISOString(),sourceSnapshot:[{id:'f',contentHash}]}};
 await requireReviewedVersion(version);status='rejected';await assert.rejects(requireReviewedVersion(version),e=>e.status===409);
});
