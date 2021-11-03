import type {NextApiRequest, NextApiResponse} from 'next';
import {prisma} from '../../../../db'








export default async (req: NextApiRequest, res: NextApiResponse) => {
    
    
    if(req.method !== "GET") {
        return res.status(405).json({ message: 'não ta vindo GET'})
    }

    const {slug} = req.query

    if(slug){
        
        const data = await prisma.anuncio.findUnique({
            where: {
              slug: slug as string
            },
          })
          return res.json(data)
    }

    const data = await prisma.anuncio.findMany({
        orderBy: [
            {
                name: 'asc'
            }
        ]
    })
    
    
    return res.json(data)
}


