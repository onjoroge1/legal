import { randomUUID } from "crypto"
import { prisma } from "./prisma"
export async function beginOperation(kind:string){return prisma.operationRun.create({data:{id:randomUUID(),kind}})}
export async function finishOperation(id:string,startedAt:Date,success:boolean){
 try{await prisma.operationRun.update({where:{id},data:{status:success?"success":"failed",finishedAt:new Date(),durationMs:Math.min(2147483647,Date.now()-startedAt.getTime())}})}catch{console.warn("OPERATION_TELEMETRY_UNAVAILABLE")}
}
export async function trackedOperation(kind:string,run:()=>Promise<Response>){
 const lease=await prisma.$transaction(async tx=>{
  await tx.$executeRaw`SELECT pg_advisory_xact_lock(710130)`
  const now=new Date();const old=await tx.operationLease.findUnique({where:{kind}});if(old&&old.until>now)return null
  const until=new Date(Date.now()+10*60000);await tx.operationLease.upsert({where:{kind},create:{kind,until},update:{until}});return until
 })
 if(!lease)return Response.json({status:"already_running"},{status:202})
 const metric=await beginOperation(kind);let success=false
 try{const response=await run();success=response.ok;return response}
 finally{await finishOperation(metric.id,metric.startedAt,success);await prisma.operationLease.deleteMany({where:{kind,until:lease}})}
}
