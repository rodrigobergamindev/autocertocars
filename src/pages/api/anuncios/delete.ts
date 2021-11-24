import type {NextApiRequest, NextApiResponse} from 'next';

import { deletePhoto } from '../../api/photos'
import {prisma} from '../../../../db'






export default async (req: NextApiRequest, res: NextApiResponse) => {


    
    if(req.method !== "DELETE") {
        return res.status(405).json({ message: 'method not allowed'})
    }

   
    
        const anuncio = JSON.parse(req.body) 
        

        const anuncioToDelete = await prisma.anuncio.delete({
            where: { id: anuncio.id },
          })
        
          if(anuncioToDelete){
            anuncio.image.map(async(image) => await deletePhoto(image))
          }
  
    
    res.json({message: "Ok"})
}


