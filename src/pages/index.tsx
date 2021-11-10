import { Box, Flex,Text, Icon, IconButton} from '@chakra-ui/react'


import { GetServerSideProps } from 'next'

import Header from '../components/Home/Header/index'
import VehicleSection from '../components/Section/Veiculos'
import About from '../components/Section/About/index'
import Feed from '../components/Section/Feed/index'
import Vender from '../components/Section/Vender/index'
import {prisma} from '../../db'
import Head from 'next/head'



export default function Home({anuncios, feed}) {

 

    
    if(!anuncios) {
      return (
        <Box>Sem anúncios por aqui</Box>
      )
    }

    if(!!anuncios) {
      return (
    
        <Box>
          {anuncios.map(anuncio => (
            <Text>{anuncio.name}</Text>
          ))}
        </Box>
       
    )
    }
}



export const getServerSideProps: GetServerSideProps = async () => {

    
  const response_anuncio = await prisma.anuncio.findMany()
  
  const response_feed = await fetch(process.env.URL_ACCESS)

  const data = await response_feed.json()
  const feed = await data.data
    
  const anuncios = await JSON.parse(JSON.stringify(response_anuncio))
   
    
    return {
      props: {
          anuncios,
          feed
      }
    }
  }

