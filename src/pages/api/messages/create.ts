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
        const message = JSON.parse(req.body) 
        
        
        await prisma.message.create({
          data: {...message}
         })
         
        
    }
    
    res.json({message: "Ok"})
}


