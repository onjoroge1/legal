import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { operationalHealth } from "@/lib/operational-health"
export async function GET(){
 const session=await getServerSession(authOptions)
 if(!session?.user?.id||!(await prisma.user.findUnique({where:{id:session.user.id},select:{isAdmin:true}}))?.isAdmin)return Response.json({error:"Not found"},{status:404})
 try{return Response.json(await operationalHealth(),{headers:{"Cache-Control":"private, no-store"}})}catch{return Response.json({error:"Operational data unavailable"},{status:503})}
}
