import { Box, Flex, Image as ChakraImage, Divider, Text, Button, Stack, Heading, StackDivider} from '@chakra-ui/react'



import Image from 'next/image'
import Link from 'next/link'

import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import {useRouter} from 'next/router'


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

    const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
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
                <Heading textAlign="center" fontWeight="bold" letterSpacing={2} px={10} fontSize="3xl"  color="gray.800" zIndex={2}>
                    {asPath.includes('anuncios') ? <Link href="/anuncios" passHref>OUTROS VEÍCULOS</Link> : <Link href="/anuncios" passHref>VEÍCULOS</Link>}
                    
                </Heading>
                <Divider bg="yellow.500" h="3px" width="100%"/>
               

                </Box>
               <Box p={6}  maxWidth="1480px" width="100%">


             
               <AutoPlaySwipeableViews enableMouseEvents>

               {anuncios.map(anuncio => (
                         
                         <Stack position="relative" 
                         key={anuncio.id}
                         spacing={0} 
                         height="650px" 
                         alignItems="center" 
                         justifyContent="flex-end" 
                         overflow="hidden" 
                         cursor="pointer"
                         transition="all 0.3s ease-in-out"
                          borderRadius="10px"
                          
                          _hover={{
                              transform: "scale(1.0)"
                          }}
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
                             
                             
                             <Stack zIndex={1} width="100%" direction="column" px={6} py={3} >
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
                        
                    ))}

            </AutoPlaySwipeableViews>
                    
            
       
               
               </Box>
            </Stack>
    )
}