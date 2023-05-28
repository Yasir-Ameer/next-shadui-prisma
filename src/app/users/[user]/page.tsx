import { prisma } from "@/db"
import { redirect } from "next/navigation"

export default async function DeleteUser({params} : {params:{user: string}}){

const user = await prisma.user.findFirst({where:{id: params.user}})

if(user){
  await prisma.user.delete({where: {id: user.id}})
}

  redirect('/users')
}