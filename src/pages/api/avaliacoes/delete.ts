import type {NextApiRequest, NextApiResponse} from 'next';
import {prisma} from '../../../../db'








export default async (req: NextApiRequest, res: NextApiResponse) => {

  


    
    if(req.method !== "DELETE") {
        return res.status(405).json({ message: 'method not allowed'})
    }

    
    
        const avaliacao = JSON.parse(req.body) 
        

        await prisma.avaliacao.delete({
            where: { id: avaliacao.id },
          })
        
  
    
    res.json({message: "Ok"})
}


