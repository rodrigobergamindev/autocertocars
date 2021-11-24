import type {NextApiRequest, NextApiResponse} from 'next';
import {prisma} from '../../../../db'








export default async (req: NextApiRequest, res: NextApiResponse) => {

 


    
    if(req.method !== "DELETE") {
        return res.status(405).json({ message: 'method not allowed'})
    }

   
    
        const anuncio = JSON.parse(req.body) 
        

        await prisma.message.delete({
            where: { id: anuncio.id },
          })
        
    
    
    res.json({message: "Ok"})
}


