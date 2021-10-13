import type {NextApiRequest, NextApiResponse} from 'next';
import { PrismaClient } from '@prisma/client'
import { getSession } from "next-auth/client";








export default async (req: NextApiRequest, res: NextApiResponse) => {

    const session = await getSession({req})
    const prisma = new PrismaClient()

    
    if(req.method !== "GET") {
        return res.status(405).json({ message: 'não ta vindo get'})
    }

    if(session) {
    
        

        const anunciosToShow = await prisma.anuncio.findMany()
        console.log(anunciosToShow)
    }
    
    res.json({message: "Ok"})
}


