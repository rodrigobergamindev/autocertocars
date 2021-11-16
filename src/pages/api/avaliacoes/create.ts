import type {NextApiRequest, NextApiResponse} from 'next';
import {prisma} from '../../../../db'









export default async (req: NextApiRequest, res: NextApiResponse) => {
   

    
    
    if(req.method !== "POST") {
        return res.status(405).json({ message: 'não ta vindo post'})
    }

    
    const message = JSON.parse(req.body) 
    
        
        await prisma.avaliacao.create({
          data: {...message}
         })
         
        
  
    
    res.json({message: "Ok"})
}


