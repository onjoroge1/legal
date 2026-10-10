import assert from 'node:assert/strict'
import { PrismaClient } from '@prisma/client'
import { load } from '../tests/route-loader.cjs'
const url=new URL(process.env.DATABASE_URL || 'http://invalid');
if(!['127.0.0.1','localhost'].includes(url.hostname)||url.pathname!=='/legal_test')throw Error('Disposable local legal_test database required');
const prisma=new PrismaClient();
(async()=>{
 const {reserveRequest}=load('lib/request-budget.ts',{'@/lib/prisma':{prisma}});
 await prisma.requestLease.deleteMany();await prisma.requestBudget.deleteMany();
 const first=await Promise.allSettled(Array.from({length:8},()=>reserveRequest('ai','fixture-subject')));
 assert.equal(first.filter(r=>r.status==='fulfilled').length,2,JSON.stringify(first.map(r=>r.status==='rejected'?r.reason.code:'ok')));
 assert.equal((await prisma.requestBudget.findUnique({where:{key:'ai:global:daily'}})).used,200);
 await prisma.requestLease.deleteMany();await prisma.requestBudget.deleteMany();
 const many=await Promise.allSettled(Array.from({length:12},(_,i)=>reserveRequest('ai',`fixture-${i}`)));
 assert.equal(many.filter(r=>r.status==='fulfilled').length,8);
 assert.equal(await prisma.requestLease.count(),8);
 assert.equal((await prisma.requestBudget.findUnique({where:{key:'ai:global:daily'}})).used,800);
 await prisma.requestLease.deleteMany();await prisma.requestBudget.deleteMany();
 console.log('PostgreSQL concurrent limits passed: subject=2, global=8, denied reservations roll back');
})().finally(()=>prisma.$disconnect()).catch(()=>{console.error('PostgreSQL concurrency verification failed');process.exitCode=1});
