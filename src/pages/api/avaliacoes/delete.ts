import type {NextApiRequest, NextApiResponse} from 'next';
import {prisma} from '../../../../db'
import { getSession } from "next-auth/client";







export default async (req: NextApiRequest, res: NextApiResponse) => {

    const session = await getSession({req})


    
    if(req.method !== "DELETE") {
        return res.status(405).json({ message: 'method not allowed'})
    }

    if(session) {
    
        const avaliacao = JSON.parse(req.body) 
        

        await prisma.avaliacao.delete({
            where: { id: avaliacao.id },
          })
        
    }
    
    res.json({message: "Ok"})
}


