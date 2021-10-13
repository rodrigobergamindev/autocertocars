import type {NextApiRequest, NextApiResponse} from 'next';
import { PrismaClient } from '@prisma/client'
import { getSession } from "next-auth/client";








export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({req})
    const prisma = new PrismaClient()
    
    
    if(req.method !== "PUT") {
        return res.status(405).json({ message: 'method not allowed'})
    }

    if(session) {
        const anuncioData = JSON.parse(req.body) 
        
        
        await prisma.anuncio.update({
            where: {
              slug: anuncioData.slug,
            },
            data: {...anuncioData},
          })

        
    }
    
    res.json({message: "Ok"})
}


