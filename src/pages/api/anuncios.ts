import type {NextApiRequest, NextApiResponse} from 'next';
import { PrismaClient, Anuncio, Prisma } from '@prisma/client'
import {v4 as uuid} from 'uuid'
import { getSession } from "next-auth/client";
import { ObjectId } from 'bson'








export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({req})
    const prisma = new PrismaClient()

    
    if(req.method !== "POST") {
        return res.status(405).json({ message: 'não ta vindo post'})
    }

    if(session) {
        const slug = uuid()
        const id = new ObjectId().toString()
        const anuncioData = JSON.parse(req.body) 
        
        const anuncio = {...anuncioData, slug}
        const savedAnuncios = await prisma.anuncio.create({
          data: {...anuncio}
         })

         console.log(savedAnuncios)

        
    }
    
    res.json({message: "Ok"})
}


