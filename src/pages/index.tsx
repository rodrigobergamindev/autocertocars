import { Box, Flex, Icon, IconButton} from '@chakra-ui/react'


import { GetStaticProps } from 'next'

import Header from '../components/Home/Header/index'
import VehicleSection from '../components/Section/Veiculos'
import About from '../components/Section/About/index'
import Feed from '../components/Section/Feed/index'
import Vender from '../components/Section/Vender/index'
import {prisma} from '../../db'



export default function Home({anuncios, feed}) {

    
    return (
        <Box as={Flex} w="100%" direction="column">
           
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
  const url_feed = 'https://graph.instagram.com/me/media?fields=media_count,media_type,permalink,media_url&&access_token=IGQVJYak9SYi1ESjZA3NUNMMEUwNjIxdGozMExORXFER1dzTHEtZAVoxX05zLWVRR0lSZA0k4MldUc3BWbHdpUmE0VU8tRjZA6YXl6R21KbTM2aG5CdjloaHFab1hjaEtmR0V4ZAzZAET2EyLW9KY0liN1cwcgZDZD'
  const response_feed = await fetch(url_feed)

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

