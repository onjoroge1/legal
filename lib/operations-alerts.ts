import { prisma } from "./prisma"
import { operationalHealth } from "./operational-health"
export async function monitorOperations(){
 const snapshot=await operationalHealth()
 const hour=new Date().toISOString().slice(0,13)
 for(const[code,count]of Object.entries(snapshot.issues)){
  const id=`${code}:${hour}`
  await prisma.operationsAlert.upsert({where:{id},create:{id,code,payload:{id,code,count,observedAt:snapshot.observedAt,revision:snapshot.revision,runbook:"docs/launch/15-operations-runbook.md"}},update:{}})
 }
 return snapshot
}
export async function dispatchOperationsAlert(){
 if(!process.env.OPERATIONS_ALERT_URL)return {sent:0,configured:false}
 const url=new URL(process.env.OPERATIONS_ALERT_URL);if(url.protocol!=="https:"||url.username||url.password)throw Error("INVALID_ALERT_DESTINATION")
 const leaseUntil=new Date(Date.now()+60000)
 const alert=await prisma.$transaction(async tx=>{
  await tx.$executeRaw`SELECT pg_advisory_xact_lock(710131)`
  const row=await tx.operationsAlert.findFirst({where:{sentAt:null,nextAttemptAt:{lte:new Date()},OR:[{leaseUntil:null},{leaseUntil:{lt:new Date()}}]},orderBy:{createdAt:"asc"}})
  if(!row)return null
  return tx.operationsAlert.update({where:{id:row.id},data:{leaseUntil,attempts:{increment:1}}})
 })
 if(!alert)return {sent:0,configured:true}
 try{
  const response=await fetch(url,{method:"POST",redirect:"error",headers:{"Content-Type":"application/json","Idempotency-Key":alert.id,...(process.env.OPERATIONS_ALERT_TOKEN?{Authorization:`Bearer ${process.env.OPERATIONS_ALERT_TOKEN}`}:{})},body:JSON.stringify(alert.payload),signal:AbortSignal.timeout(10000)})
  if(!response.ok)throw Error("ALERT_RETRY_REQUIRED")
  await prisma.operationsAlert.updateMany({where:{id:alert.id,leaseUntil},data:{sentAt:new Date(),leaseUntil:null}})
  return {sent:1,configured:true}
 }catch{
  await prisma.operationsAlert.updateMany({where:{id:alert.id,leaseUntil},data:{leaseUntil:null,nextAttemptAt:new Date(Date.now()+Math.min(3600000,60000*2**Math.min(alert.attempts,6)))}})
  return {sent:0,configured:true,failed:true}
 }
}
