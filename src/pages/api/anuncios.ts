import type {NextApiRequest, NextApiResponse} from 'next';
import {PrismaClient} from '@prisma/client'
import {insert} from '../api/photos'

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed'})
    }

    const anuncioData = req.body
    console.log(req.body)
    //const savedAnuncios = await prisma.anuncio.create({
    //    data: anuncioData
    //})

    res.json({message: "Ok"})
}


const handleUpload = async (images) => {
        
    if(images.length > 0) {
        
    
    const result = await insert(images)
                    
    if(result instanceof Error) {
        console.log(`${result.name} - ${result.message}`)
    }
    
    return result
        
    }


}