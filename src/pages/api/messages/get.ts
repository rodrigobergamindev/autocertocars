import type {NextApiRequest, NextApiResponse} from 'next';

import {v4 as uuid} from 'uuid'
import { getSession } from "next-auth/client";
import prisma from '../../../services/prisma'







export default async (req: NextApiRequest, res: NextApiResponse) => {
    


    
    if(req.method !== "GET") {
        return res.status(405).json({ message: 'não ta vindo GET'})
    }

    const data = await prisma.message.findMany({
        orderBy: [
            {
                name: 'asc'
            }
        ]
    })
    
    
    return res.json(data)
}


