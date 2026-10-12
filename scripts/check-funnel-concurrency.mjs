import assert from 'node:assert/strict'
import {randomUUID} from 'node:crypto'
import {PrismaClient} from '@prisma/client'
import {load} from '../tests/route-loader.cjs'
const url=new URL(process.env.DATABASE_URL||'http://invalid');if(!['127.0.0.1','localhost'].includes(url.hostname)||url.pathname!=='/legal_test')throw Error('Disposable local legal_test database required')
const prisma=new PrismaClient(),userId=`funnel-${randomUUID()}`,orderId=randomUUID();let id
const f=load('lib/funnel.ts',{'./prisma':{prisma}});process.env.ENABLE_FUNNEL_MEASUREMENT='true'
try{
 await prisma.user.create({data:{id:userId,email:`${userId}@example.invalid`,name:'Fixture',password:'!disabled'}})
 id=await f.consentMeasurement('search',userId)
 const request=new Request('https://example.invalid',{headers:{cookie:`${f.FUNNEL_COOKIE}=${id}`}})
 for(const stage of ['generation','checkout','download'])await Promise.all(Array.from({length:8},()=>f.recordFunnel(request,stage)))
 await prisma.checkoutOrder.create({data:{id:orderId,ownerId:userId,kind:'subscription',priceId:'price_fixture',amount:1900,currency:'usd',status:'paid',disclaimerVersion:'fixture',expiresAt:new Date(),funnelJourneyId:id}})
 await Promise.all([f.reconcilePaidFunnel(),f.reconcilePaidFunnel()]);assert.equal(await prisma.funnelEvent.count({where:{journeyId:id}}),5)
 assert.deepEqual((await prisma.funnelEvent.findMany({where:{journeyId:id},select:{stage:true}})).map(x=>x.stage).sort(),['checkout','download','generation','paid','source'])
 const exported=JSON.parse(await load('lib/privacy-export.ts',{'./prisma':{prisma}}).exportCustomer(userId));assert.equal(exported.measurement.length,1);assert.ok(!JSON.stringify(exported.measurement).includes(id))
 const privacy=load('lib/privacy-lifecycle.ts',{'./prisma':{prisma}});await privacy.requestErasure(userId)
 assert.equal(await prisma.funnelJourney.count({where:{id}}),0);assert.equal(await prisma.funnelEvent.count({where:{journeyId:id}}),0);assert.equal((await prisma.checkoutOrder.findUnique({where:{id:orderId}})).funnelJourneyId,null)
 await f.recordFunnel(request,'download');assert.equal(await prisma.funnelEvent.count({where:{journeyId:id}}),0)
 console.log('Funnel PostgreSQL passed: explicit consent, concurrent dedupe, all five server stages, scoped export, deletion and no recreation')
}finally{
 if(id)await prisma.funnelJourney.deleteMany({where:{id}});await prisma.privacyRequest.deleteMany({where:{userId}});await prisma.checkoutOrder.deleteMany({where:{id:orderId}});await prisma.user.deleteMany({where:{id:userId}});await prisma.$disconnect()
}
