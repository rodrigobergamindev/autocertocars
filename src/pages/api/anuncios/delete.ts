import type {NextApiRequest, NextApiResponse} from 'next';
import { PrismaClient } from '@prisma/client'
import { getSession } from "next-auth/client";








export default async (req: NextApiRequest, res: NextApiResponse) => {

    const session = await getSession({req})
    const prisma = new PrismaClient()

    
    if(req.method !== "DELETE") {
        return res.status(405).json({ message: 'method not allowed'})
    }

    if(session) {
    
        const slug = JSON.parse(req.body) 

        await prisma.anuncio.delete({
            where: { slug: slug },
          })

    }
    
    res.json({message: "Ok"})
}


