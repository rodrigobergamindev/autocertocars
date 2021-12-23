import type {NextApiRequest, NextApiResponse} from 'next';
import {prisma} from '../../../../db'
import { sendMail } from '../../../services/sendmail';









export default async (req: NextApiRequest, res: NextApiResponse) => {
   

    
    
    if(req.method !== "POST") {
        return res.status(405).json({ message: 'não ta vindo post'})
    }

    
    const message = JSON.parse(req.body) 
    const {name, whatsapp, email} = message
    console.log(message)
        
       await prisma.avaliacao.create({
          data: {...message}
         })
    
    try {
        sendMail({name,whatsapp, email})
    } catch (error) {
        console.log(error)
    }
        
   
    
    res.json({message: "Ok"})
}


