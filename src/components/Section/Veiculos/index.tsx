import { Box, Flex, Image as ChakraImage, Divider, Text, Button, Stack, HStack,VStack, Heading, StackDivider} from '@chakra-ui/react'



import Image from 'next/image'
import Link from 'next/link'

import {useRouter} from 'next/router'
import Slider from "react-slick";


type Anuncio = {
    id: string;
    name: string;
    ano_fabricacao: string;
    marca_name: string;
    modelo: string;
    versao: string;
    numero_portas: string;
    cor: string;
    cores_internas: string;
    combustivel: string;
    carroceria: string;
    potencia: string;
    transmissao: string;
    quilometragem: string;
    condicao: string;
    valor: string;
    chave_copia: string;
    laudo_cautelar: string;
    manual_do_proprietario: string;
    opcionais: string[];
    data_de_criacao: Date;
    image: string[];
    slug: string;
}

interface AnuncioProps {
    anuncios: Anuncio[]
}

export default function VehicleSection({anuncios}: AnuncioProps) {

    const {asPath} = useRouter()

    if(!anuncios) return null

    const settings = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 1500,
        cssEase: "ease",
        arrows: false
    }
      

    return (
        <Stack 
           spacing={10} 
            align="center" 
            justify="center"
            w="100%"
            h="100vh"
            flexDirection="column"
            backgroundColor="gray.50"
            
            >
            
                <Box width="100%" maxW="1480px" p={6}  as={Flex}  align="center" flexDirection="row" alignSelf="center">

                <Divider bg="yellow.500" h="3px" width="100%"/>
                <Heading textAlign="center" fontWeight="light" letterSpacing={2} px={10} fontSize="5xl"  color="gray.800" zIndex={2}>
                    {asPath.includes('anuncios') ? <Link href="/anuncios" passHref>OUTROS VEÍCULOS</Link> : <Link href="/anuncios" passHref>VEÍCULOS</Link>}
                    
                </Heading>
                <Divider bg="yellow.500" h="3px" width="100%"/>
               

                </Box>
               <Box p={6}  maxWidth="1480px" width="100%">


                <Slider {...settings}>

                {anuncios.map(anuncio => (
                         
                         <Link key={anuncio.id} href={`anuncios/${anuncio.slug}`}>
                        <Box p={6} key={anuncio.id}>
                         <Stack 
                        position="relative"
                        borderRadius="10px"
                         
                         spacing={0} 
                         height="650px" 
                         overflow="hidden" 
                         cursor="pointer"
                         transition="all 0.3s ease-in-out"
                        direction="column"  
                        justify="flex-end"

                         >

                            <ChakraImage
                              as={Image}
                             src={anuncio.image[0]}
                             alt={anuncio.name}
                            layout="fill"
                             objectFit="cover"
                             width="100%"
                             height="100%"
                             priority
                            
                             
                             transition="all 0.3s ease-in-out"
                             _hover={{
                              transform: "scale(1.1)",
                              filter:"brightness(1.1)"
                          }}
                             />
                        
                             <Stack zIndex={2} width="100%" direction="column" px={6} py={3} >
                             <Heading fontSize="2xl" fontWeight="bold" letterSpacing={2}>{anuncio.name.toUpperCase()}</Heading>
                             <Text fontSize="2xl">{anuncio.versao}</Text>
                             <StackDivider/>
                             <Stack  direction="row" justifyContent="space-between">
                                  <Text fontSize="2xl" alignSelf="flex-end" fontWeight="light" >{anuncio.ano_fabricacao}</Text>
                                  <StackDivider/>
                                  <StackDivider/>
                                 <Text fontSize="2xl" fontWeight="bold">{`${anuncio.valor},00`}</Text>
                             </Stack>
                             </Stack>
                         </Stack>
                         </Box>
                        </Link>
                    ))}
                
                </Slider>
                    
            
       
               
               </Box>
            </Stack>
    )
}