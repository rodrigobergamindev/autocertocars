import { Box, Flex, Image as ChakraImage, Divider, Text, Button, Stack, Heading, StackDivider} from '@chakra-ui/react'


import SwiperCore, { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image'
import "swiper/css";
import Link from 'next/link'



SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);




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

                
                <Heading fontWeight="bold" letterSpacing={2} mr={15} fontSize="3xl"  color="gray.800" zIndex={2}>
                    VEÍCULOS
                </Heading>
                <Divider bg="yellow.400" h="3px" width="100%"/>
               

                </Box>
               <Flex p={6}  height="550px" maxWidth="1480px" width="100%">

                {anuncios.map(anuncio => <Text color="black">{anuncio.name}</Text>)}
               </Flex>
            </Stack>
    )
}