import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { readJson, requestError, RequestError } from "@/lib/request-guard"
import { guardAccount } from "@/lib/request-budget"
async function admin(){const session=await getServerSession(authOptions);if(!session?.user?.id || !(await prisma.user.findUnique({where:{id:session.user.id},select:{isAdmin:true}}))?.isAdmin)throw new RequestError(404,"NOT_FOUND")}
export async function GET(){try{await admin();return Response.json(await prisma.privacyRequest.findMany({orderBy:{requestedAt:"asc"},take:100}),{headers:{"Cache-Control":"private, no-store"}})}catch(e){return requestError(e)??Response.json({error:"Unavailable"},{status:503})}}
export async function POST(request:Request){try{
 await admin();const input=z.object({id:z.string().uuid(),action:z.enum(["retry","complete"]),evidence:z.string().trim().min(10).max(500)}).strict().parse(await readJson(request,2048));await guardAccount(request)
 const row=await prisma.privacyRequest.findUnique({where:{id:input.id}});if(!row)throw new RequestError(404,"NOT_FOUND")
 if(input.action==="complete" && await prisma.storedAvatar.count({where:{userId:row.userId}}))throw new RequestError(409,"AVATAR_CLEANUP_PENDING")
 const result=await prisma.privacyRequest.updateMany({where:{id:input.id,status:input.action==="retry"?"needs_review":"local_erased"},data:input.action==="retry"?{status:"requested",lastError:null}:{status:"complete",completedAt:new Date(),externalEvidence:input.evidence}})
 if(result.count!==1)throw new RequestError(409,"INVALID_PRIVACY_TRANSITION")
 return Response.json({updated:true})
 }catch(e){return requestError(e)??Response.json({error:"Unavailable"},{status:503})}}
