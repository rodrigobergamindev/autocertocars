import type {NextApiRequest, NextApiResponse} from 'next';
import { PrismaClient } from '@prisma/client'
import {v4 as uuid} from 'uuid'
import { getSession } from "next-auth/client";








export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({req})
    const prisma = new PrismaClient()

    
    if(req.method !== "POST") {
        return res.status(405).json({ message: 'não ta vindo post'})
    }

    if(session) {
        const slug = uuid()
        const anuncioData = JSON.parse(req.body) 
        const name = `${anuncioData.marca} ${anuncioData.modelo}`
        const anuncio = {...anuncioData, slug, name}
        await prisma.anuncio.create({
          data: {...anuncio}
         })

        
    }
    
    res.json({message: "Ok"})
}


