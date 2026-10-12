import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { readJson, requestError, RequestError } from "@/lib/request-guard"
import { guardAccount } from "@/lib/request-budget"
import { requestErasure } from "@/lib/privacy-lifecycle"
import { exportCustomer } from "@/lib/privacy-export"
export async function POST(request: Request) {
 try {
  const session=await getServerSession(authOptions)
  if(!session?.user?.id) throw new RequestError(401,"SIGN_IN_REQUIRED")
  const input=z.object({action:z.enum(["export","delete"]),password:z.string().min(1).max(200),confirmation:z.literal("DELETE MY ACCOUNT").optional()}).strict().parse(await readJson(request,2048))
  await guardAccount(request)
  const user=await prisma.user.findUnique({where:{id:session.user.id},select:{password:true,privacyState:true}})
  if(!user || user.privacyState!=="active" || !await bcrypt.compare(input.password,user.password)) throw new RequestError(403,"PASSWORD_REQUIRED")
  if(input.action==="export") return new Response(await exportCustomer(session.user.id),{headers:{"Content-Type":"application/json","Content-Disposition":"attachment; filename=account-export.json","Cache-Control":"private, no-store"}})
  if(input.confirmation!=="DELETE MY ACCOUNT") throw new RequestError(400,"CONFIRM_DELETION")
  const row=await requestErasure(session.user.id)
  return Response.json({id:row.id,status:row.status,message:"Deletion requested. Your account is frozen and sessions revoked. Local erasure waits at least 24 hours and requires an approved policy. Provider and backup completion are tracked separately."},{status:202,headers:{"Cache-Control":"no-store","Clear-Site-Data":'"cache", "cookies", "storage"'}})
 } catch(error) { return requestError(error) ?? Response.json({error:"Privacy service temporarily unavailable"},{status:503}) }
}
