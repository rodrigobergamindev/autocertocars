import type {NextApiRequest, NextApiResponse} from 'next';
import {prisma} from '../../../../db'
import { getSession } from "next-auth/client";







export default async (req: NextApiRequest, res: NextApiResponse) => {

    const session = await getSession({req})


    
    if(req.method !== "DELETE") {
        return res.status(405).json({ message: 'method not allowed'})
    }

    if(session) {
    
        const anuncio = JSON.parse(req.body) 
        

        await prisma.message.delete({
            where: { id: anuncio.id },
          })
        
    }
    
    res.json({message: "Ok"})
}


