import type {NextApiRequest, NextApiResponse} from 'next';
import { PrismaClient } from '@prisma/client'
import {v4 as uuid} from 'uuid'
import { getSession } from "next-auth/client";








export default async (req: NextApiRequest, res: NextApiResponse) => {
    
    const prisma = new PrismaClient()

    
    if(req.method !== "GET") {
        return res.status(405).json({ message: 'não ta vindo GET'})
    }

    const data = await prisma.anuncio.findMany()
  
    
    return res.json(data)
}


