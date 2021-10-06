import type {NextApiRequest, NextApiResponse} from 'next';
import {PrismaClient} from '@prisma/client'


const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed'})
    }

    const anuncioData = JSON.parse(req.body)

    const savedAnuncios = await prisma.anuncio.create({
        data: anuncioData
    })

    res.json(savedAnuncios)
}