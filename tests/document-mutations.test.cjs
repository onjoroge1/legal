const {test}=require('node:test');const assert=require('node:assert/strict');const {load}=require('./route-loader.cjs');
test('clients cannot assign signed/paid transitions or protected metadata even with mutations enabled',()=>{
 const {documentMutationSchema:s,editableLegacyDocument}=load('lib/document-mutation-schema.ts');
 for(const payload of [{status:'signed'},{status:'completed'},{metadata:{signatures:[]}},{metadata:{versionId:'foreign'}},{metadata:{paymentStatus:'paid'}},{userId:'other'}])assert.throws(()=>s.parse(payload));
 assert.equal(editableLegacyDocument({status:'signed',metadata:{}}),false);
 assert.equal(editableLegacyDocument({status:'draft',metadata:{signingRequests:[]}}),false);
 assert.equal(editableLegacyDocument({status:'draft',metadata:{versionId:'reviewed-version'}}),false);
 assert.equal(editableLegacyDocument({status:'draft',metadata:{formData:{rentAmount:'1500'}}}),true);
});
