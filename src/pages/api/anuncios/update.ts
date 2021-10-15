import type {NextApiRequest, NextApiResponse} from 'next';
import { PrismaClient } from '@prisma/client'
import { getSession } from "next-auth/client";
import { deletePhoto } from '../../api/photos'







export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({req})
    const prisma = new PrismaClient()
    
    
    if(req.method !== "PUT") {
        return res.status(405).json({ message: 'method not allowed'})
    }

    if(session) {

        const anuncioData = JSON.parse(req.body)
        const anuncioToUpdate = anuncioData.anuncio 
        const name = `${anuncioToUpdate.marca} ${anuncioToUpdate.modelo}`
        const newAnuncio = {...anuncioToUpdate, name}

        const update = await prisma.anuncio.update({
          where: {
            slug: anuncioToUpdate.slug,
          },
          data: newAnuncio,
        })

        if(update){
          anuncioData.imagesDeleted.map(async(image) => await deletePhoto(image))
        }
    }
    
    res.json({message: "Ok"})
}


