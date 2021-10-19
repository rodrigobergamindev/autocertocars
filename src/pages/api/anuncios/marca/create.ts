import type {NextApiRequest, NextApiResponse} from 'next';
import { PrismaClient } from '@prisma/client'
import { getSession } from "next-auth/client";








export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({req})
    const prisma = new PrismaClient()

    
    if(req.method !== "POST") {
        return res.status(405).json({ message: 'não ta vindo post'})
    }

    if(session) {
      
        const marca = JSON.parse(req.body) 
        const name = marca.name
        await prisma.marca.create({
          data: {
              name
          }
         })

        
    }
    
    res.json({message: "Ok"})
}


