import {Divider, Button, Grid, List, ListItem, HStack, VStack, Heading, Stack, Box, Flex,Text, Icon, IconButton, Image as ChakraImage, useBreakpointValue} from '@chakra-ui/react'






import Logo from '../../components/Home/Header/Logo'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'


import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md'
import Share from '../../components/Share'
import {useRouter} from 'next/router'
import { GetStaticProps } from 'next'

import FormAvaliacao from './Form'
import {prisma} from '../../../db'

export default function Avaliacao({anuncios}) {


   
    
    const {asPath} = useRouter()
    
    const isWideVersion = useBreakpointValue ({
      base: false,
      lg: true
    })

      
    return (
        <Box as={Flex} w="100%" direction="column" bg="gray.50" zIndex={-4}>
             
             <Head>
            <title>Auto Certo - Avaliação Veicular</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>


            <Flex 
            align="center" 
            justify="center"
            width="100%"
            height="25rem"
            position="relative"
            direction="column"
            mt={["3.5rem","4.5rem"]}
            >
            
            <ChakraImage
                   as={Image}
                   src="https://images.unsplash.com/photo-1626100585171-e73444ee0e50?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1364&q=80"
                    alt="header"
                     layout="fill"
                     objectFit="cover"
                     width="100%"
                    height="100%"
                      priority
                     transition="all 0.3s ease-in-out"
                     border="solid"
                     filter="brightness(0.6)"
                     zIndex={0}
                     />

            <Box zIndex={333}>
                {!!isWideVersion && <Logo size={450}/>}
                {!isWideVersion && <Logo size={300}/>}
            </Box>

            </Flex>
                  
            <Box mb={20} flex="1" as={Flex} direction="column" width="100%" maxWidth="1000px" alignSelf="center" alignItems="center" justifyContent="center" mt={-10} zIndex={1}>

            <FormAvaliacao anuncios={anuncios}/>

            </Box>
                
            </Box>
       
        
       
        
    )
}




  
export const getStaticProps: GetStaticProps = async () => {



    const data_anuncios = await prisma.anuncio.findMany()

    const anuncios = await JSON.parse(JSON.stringify(data_anuncios))
    
    
    return {
      props: {
         anuncios
      },
      revalidate: 5
    }
  }