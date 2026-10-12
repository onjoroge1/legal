import assert from 'node:assert/strict'
import {randomUUID} from 'node:crypto'
import {PrismaClient} from '@prisma/client'
import {load} from '../tests/route-loader.cjs'
const url=new URL(process.env.DATABASE_URL||'http://invalid');if(!['127.0.0.1','localhost'].includes(url.hostname)||url.pathname!=='/legal_test')throw Error('Disposable local legal_test database required')
const prisma=new PrismaClient(),kind=`fixture-${randomUUID()}`,id=`fixture-${randomUUID()}`;const calls=[];let fail=true;const nativeFetch=globalThis.fetch
process.env.OPERATIONS_ALERT_URL='https://example.invalid/alerts';globalThis.fetch=async(url,options)=>{assert.equal(url.href,'https://example.invalid/alerts');calls.push({body:options.body,key:options.headers['Idempotency-Key']});return new Response(null,{status:fail?503:204})}
const {trackedOperation}=load('lib/operations-telemetry.ts',{'./prisma':{prisma}});const {dispatchOperationsAlert}=load('lib/operations-alerts.ts',{'./prisma':{prisma},'./operational-health':{}})
try{
 let release;const gate=new Promise(r=>release=r);let blocked=0,ran=0
 const results=await Promise.all(Array.from({length:8},()=>trackedOperation(kind,async()=>{ran++;await gate;return Response.json({ok:true})}).then(r=>{if(r.status===202&&++blocked===7)release();return r})))
 assert.equal(ran,1);assert.equal(results.filter(r=>r.status===202).length,7);assert.equal((await prisma.operationRun.findFirst({where:{kind}})).status,'success')
 await prisma.operationsAlert.create({data:{id,code:'FIXTURE',payload:{code:'FIXTURE',count:1}}})
 assert.equal((await dispatchOperationsAlert()).failed,true);let row=await prisma.operationsAlert.findUnique({where:{id}});assert.equal(row.sentAt,null);assert.ok(row.nextAttemptAt>new Date());assert.equal(calls.length,1)
 await prisma.operationsAlert.update({where:{id},data:{nextAttemptAt:new Date(0)}});fail=false;assert.equal((await dispatchOperationsAlert()).sent,1)
 assert.equal(calls[0].body,calls[1].body);assert.equal(calls[0].key,calls[1].key);assert.ok((await prisma.operationsAlert.findUnique({where:{id}})).sentAt)
 console.log('Operations PostgreSQL passed: concurrent lease exclusion, heartbeat result, durable failed-alert retry and stable receiver deduplication key')
}finally{globalThis.fetch=nativeFetch;await prisma.operationsAlert.deleteMany({where:{id}});await prisma.operationRun.deleteMany({where:{kind}});await prisma.operationLease.deleteMany({where:{kind}});await prisma.$disconnect()}
