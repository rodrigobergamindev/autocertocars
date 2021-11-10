import { Divider, Button, Grid, List, ListItem, HStack, VStack, Heading, Stack, Box, Flex,Text, Icon, IconButton, Image as ChakraImage} from '@chakra-ui/react'
import "swiper/css";

import {IoMdCloseCircle, IoMdShareAlt} from 'react-icons/io'
import {GiSpeedometer, GiGasPump, GiCarSeat, GiMoneyStack} from 'react-icons/gi'
import {FaCheckCircle, FaRegCalendarAlt} from 'react-icons/fa'
import {BsFillQuestionCircleFill} from 'react-icons/bs'

import { GetStaticProps, GetStaticPaths } from 'next'


import FormContact from '../../components/Contact/index'

import Logo from '../../components/Home/Header/Logo'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper';
import {prisma} from '../../../db'
import Link from 'next/link'
import VehicleSection from '../../components/Section/Veiculos';
import Head from 'next/head'
import { useRouter } from 'next/router'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);


export default function Anuncio({anuncio, anuncios}) {

    const router = useRouter()

  
   
    if (router.isFallback) {
        return <Box>Loading...</Box>
      }

    return (
        <Box as={Flex} w="100%" direction="column">
             
             <Head>
            <title>{`AutoCerto Cars - ${anuncio.name}`}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Box>{anuncio.name}</Box>

        </Box>
    )
}


export const getStaticPaths: GetStaticPaths = async () => {

    
    const anuncios = await prisma.anuncio.findMany()

    const paths = anuncios.map((anuncio) => ({
        params: { slug: anuncio.slug },
      })) || []

     
    
      return { 
          paths,
          fallback: true
        }
  }


export const getStaticProps: GetStaticProps = async ({params}) => {

    
    const {slug} = params

    const data_anuncios = await prisma.anuncio.findMany()

    const data = await prisma.anuncio.findUnique({
        where: {
          slug: slug as string
        },
      })

    const anuncio = await JSON.parse(JSON.stringify(data))
    const anuncios = await JSON.parse(JSON.stringify(data_anuncios))
    
    return {
      props: {
         anuncio,
         anuncios
      },
      revalidate: 5
    }
  }


  
