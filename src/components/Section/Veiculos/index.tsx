import { Icon, Box, Flex, Image as ChakraImage, Divider, Text, Button, Stack, HStack,VStack, Heading, StackDivider} from '@chakra-ui/react'

import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md'

import Image from 'next/image'
import Link from 'next/link'

import {useRouter} from 'next/router'
import Slider from "react-slick";
import { RiCarFill } from 'react-icons/ri'


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
        arrows: true,
        nextArrow: <Icon as={MdKeyboardArrowRight} fontSize="40" color="gray.500" _hover={{color:'gray.500'}}/>,
        prevArrow: <Icon as={MdKeyboardArrowLeft} fontSize="40" color="gray.500"  _hover={{color:'gray.500'}}/>
    }
      

    return (
        <Stack 
           spacing={10} 
            align="center" 
            justify="center"
            w="100%"
            py={20}
            flexDirection="column"
            backgroundColor="gray.50"
            
            >
            
            <Box as={Flex}  width="100%" maxWidth="750px"  flexDirection="column" alignSelf="center">
                
                <Divider/>
                <Heading  fontWeight="light" letterSpacing={3} alignSelf="center" fontSize="4xl"  color="gray.900" zIndex={2}>
                    NOSSOS
                </Heading>
                <Heading as="i" letterSpacing={4} fontFamily="Roboto, sans-serif" color="yellow.400" alignSelf="center" fontSize="6xl" fontWeight="black">VEÍCULOS</Heading>
                <Divider/>
                </Box>

               <Box p={6}  maxWidth="1480px" width="100%">


                <Slider {...settings}>

                {anuncios.map(anuncio => (
                         
                         <Link key={anuncio.id} href={`/anuncios/${anuncio.slug}`}>
                        <Box p={6} key={anuncio.id}>
                         <Stack 
                        position="relative"
                        borderRadius="5px"
                         
                         spacing={0} 
                         height="450px" 
                         overflow="hidden" 
                         cursor="pointer"
                         transition="all 0.3s ease-in-out"
                        direction="column"  
                        justify="flex-end"
                        boxShadow="0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
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
                             <Heading fontSize="xl" fontWeight="bold" letterSpacing={2}>{anuncio.name.toUpperCase()}</Heading>
                             <Text fontSize="xl">{anuncio.versao}</Text>
                             <StackDivider/>
                             <Stack  direction="row" justifyContent="space-between">
                                  <Text fontSize="xl" alignSelf="flex-end" fontWeight="light" >{anuncio.ano_fabricacao}</Text>
                                  <StackDivider/>
                                  <StackDivider/>
                                 <Text fontSize="xl" fontWeight="bold">{`${anuncio.valor},00`}</Text>
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