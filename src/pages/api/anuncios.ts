import type {NextApiRequest, NextApiResponse} from 'next';
import {fauna} from '../../services/fauna'
import { query } from 'faunadb'
import {v4 as uuid} from 'uuid'
import { getSession } from "next-auth/client";

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
        const data_de_criacao = new Date()
        const anuncioData = JSON.parse(req.body)
        const anuncio = {...anuncioData,data_de_criacao, slug} as Anuncio
        

        try {
            await fauna.query(
              query.If(
                query.Not(
                  query.Exists(
                    query.Match(
                      query.Index('anuncio_by_slug'),
                      query.Casefold(anuncio.slug)
                    )
                  )
                ),
                query.Create(
                  query.Collection('anuncio'),
                  {data: {...anuncio} }
                ),
                query.Get(
                  query.Match(
                    query.Index('anuncio_by_slug'),
                    query.Casefold(anuncio.slug)
                  )
                )
              )
            )
            res.json({message: "Anúncio Criado"})
            return true
            
          } catch (error) {
            return false
          }









    }
    
    res.json({message: "Ok"})
}


