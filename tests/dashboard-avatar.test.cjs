const {test}=require('node:test');const assert=require('node:assert/strict');const sharp=require('sharp');const {load}=require('./route-loader.cjs');
test('avatar decoding rejects disguised files and metadata is removed from resized output',async()=>{
 const {normalizeAvatar}=load('lib/avatar-storage.ts',{'./prisma':{prisma:{}},'@vercel/blob':{}});
 await assert.rejects(()=>normalizeAvatar(Buffer.from('<svg><script>alert(1)</script></svg>')));
 await assert.rejects(()=>normalizeAvatar(Buffer.from('not an image')));
 const input=await sharp({create:{width:400,height:300,channels:3,background:'#ff0000'}}).jpeg().withMetadata().toBuffer();
 const output=await normalizeAvatar(input);const meta=await sharp(output).metadata();assert.equal(meta.format,'webp');assert.equal(meta.width,256);assert.equal(meta.height,256);assert.equal(meta.exif,undefined);
});
test('private avatar reads bind the object to authenticated owner before storage I/O',async()=>{
 let reads=0;const api=load('lib/avatar-storage.ts',{'./prisma':{prisma:{storedAvatar:{findFirst:async({where})=>where.userId==='owner'&&where.id==='avatar'&&where.status==='active'?{pathname:'avatars/fixture.webp'}:null}}},'@vercel/blob':{get:async(path,options)=>{reads++;assert.equal(path,'avatars/fixture.webp');assert.equal(options.access,'private');return{statusCode:200}}}});
 assert.equal(await api.readAvatar('other','avatar'),null);assert.equal(reads,0);assert.equal((await api.readAvatar('owner','avatar')).statusCode,200);
});
