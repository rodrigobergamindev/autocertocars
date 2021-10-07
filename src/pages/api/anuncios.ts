import type {NextApiRequest, NextApiResponse} from 'next';
import {PrismaClient} from '@prisma/client'
import {v4 as uuid} from 'uuid'
import { getSession } from "next-auth/client";
import { ObjectId } from 'bson'



const prisma = new PrismaClient()

type Anuncio = {
    name: string;
    ano_fabricacao: string;
    marca: string;
    modelo: string;
    versao?: string;
    numero_portas?: string;
    cor?: string;
    cores_internas?: string;
    combustivel?: string;
    carroceria?: string;
    potencia?: string;
    transmissao?: string;
    quilometragem?: string;
    valor: string;
    chave_copia?: string;
    laudo_cautelar?: string;
    manual_do_proprietario?: string;
    observacoes?: string;

    data_de_criacao: Date;
    image: Array<string>;
    slug: string;
}


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({req})

    
    if(req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed'})
    }

    if(session) {
        const slug = uuid()
        const id = new ObjectId()
        const anuncioData = JSON.parse(req.body)
        const anuncio = {...anuncioData, slug, id}

        const savedAnuncios = await prisma.anuncio.create({
          data: anuncio
         })

          console.log(savedAnuncios)
    }
    
    res.json({message: "Ok"})
}


