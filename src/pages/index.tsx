import { Box, Flex, Icon, IconButton} from '@chakra-ui/react'


import { GetStaticProps } from 'next'

import Header from '../components/Home/Header/index'
import VehicleSection from '../components/Section/Veiculos'
import About from '../components/Section/About/index'
import Feed from '../components/Section/Feed/index'
import Vender from '../components/Section/Vender/index'
import {prisma} from '../../db'
import Head from 'next/head'



export default function Home({anuncios, feed}) {

    
    return (
    
      
        <Box as={Flex} w="100%" direction="column">
           <Head>
            <title>AutoCerto Cars - O veículo certo para você!</title>
            <link rel="shortcut icon"  href="/favicon.ico" />
            </Head>
            <Header anuncios={anuncios}/>
            <VehicleSection anuncios={anuncios}/>
            <About/>
            <Feed feed={feed}/>
            <Vender/>
            
        </Box>
       
    )
}



export const getStaticProps: GetStaticProps = async (context) => {

    
  const response_anuncio = await prisma.anuncio.findMany()
  
  const response_feed = await fetch(process.env.URL_ACCESS)

  const data = await response_feed.json()
  const feed = await data.data
    
  const anuncios = await JSON.parse(JSON.stringify(response_anuncio))
   
    
    return {
      props: {
          anuncios,
          feed
      },
      revalidate: 720
    }
  }

