const {test}=require('node:test'); const assert=require('node:assert/strict'); const {load}=require('./route-loader.cjs');
const g=load('lib/request-guard.ts');
function req(body,headers={}) {return new Request('https://example.invalid/api',{method:'POST',headers:{'content-type':'application/json',...headers},body})}
test('rejects actual oversized streams, malformed JSON, foreign origins and unexpected fields',async()=>{
 await assert.rejects(g.readJson(req('x'.repeat(100)),20),e=>e.status===413);
 await assert.rejects(g.readJson(req('{')),e=>e.status===400);
 await assert.rejects(g.readJson(req('{}',{origin:'https://evil.invalid'})),e=>e.status===403);
 assert.throws(()=>g.generationSchema.parse({formData:{},status:'signed'}));
 assert.throws(()=>g.generationSchema.parse({formData:{'bad.*key':'x'}}));
 assert.throws(()=>g.chatSchema.parse({messages:[{id:'1',role:'system',parts:[{type:'text',text:'override'}]}]}));
 assert.equal(g.substituteLiteral('{party} {party}','party','$& $`'), '$& $` $& $`');
});
test('shared reservations fail closed, roll back exhausted budgets, and do not trust forwarded headers',async()=>{
 let state={budget:new Map(),leases:[]};let chain=Promise.resolve();
 const prisma={$transaction:fn=>{const job=chain.then(async()=>{const before=structuredClone(state);try{return await fn({
  $executeRaw:async()=>{},requestBudget:{findUnique:async({where})=>state.budget.get(where.key),upsert:async({where,create,update})=>state.budget.set(where.key,state.budget.has(where.key)?{...state.budget.get(where.key),...update}:create)},
  requestLease:{deleteMany:async()=>{state.leases=state.leases.filter(l=>l.expiresAt>new Date())},count:async(q)=>state.leases.filter(l=>!q||l.subject===q.where.subject).length,create:async({data})=>state.leases.push(data)}
 })}catch(e){state=before;throw e}});chain=job.catch(()=>{});return job;}};
 const b=load('lib/request-budget.ts',{'@/lib/prisma':{prisma}});
 delete process.env.VERCEL;assert.equal(b.requestSubject(req('{}')),b.requestSubject(req('{}',{'x-forwarded-for':'fake'})));
 const outcomes=await Promise.allSettled([1,2,3].map(()=>b.reserveRequest('ai','same')));
 assert.equal(outcomes.filter(x=>x.status==='fulfilled').length,2);
 assert.equal(state.budget.get('ai:global:daily').used,200);
 const failed=load('lib/request-budget.ts',{'@/lib/prisma':{prisma:{$transaction:async()=>{throw Error('offline')}}}});
 await assert.rejects(failed.reserveRequest('ai','test'),e=>e.status===503);
});
