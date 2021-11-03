import type {NextApiRequest, NextApiResponse} from 'next';
import { getSession } from "next-auth/client";
import { deletePhoto } from '../../api/photos'
import {prisma} from '../../../../db'






export default async (req: NextApiRequest, res: NextApiResponse) => {

    const session = await getSession({req})


    
    if(req.method !== "DELETE") {
        return res.status(405).json({ message: 'method not allowed'})
    }

    if(session) {
    
        const anuncio = JSON.parse(req.body) 
        

        const anuncioToDelete = await prisma.anuncio.delete({
            where: { slug: anuncio.slug },
          })
        
          if(anuncioToDelete){
            anuncio.image.map(async(image) => await deletePhoto(image))
          }
    }
    
    res.json({message: "Ok"})
}


