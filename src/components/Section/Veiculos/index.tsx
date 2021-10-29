import { Box, Flex, Image as ChakraImage, Divider, Text, Button, Stack, Heading, StackDivider} from '@chakra-ui/react'


import SwiperCore, { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image'
import "swiper/css";



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
            
                <Box as={Flex} width="100%" maxWidth="650px"  flexDirection="column" alignSelf="center">

                
                <Heading as="i" fontWeight="bold" letterSpacing={2} fontSize="8xl"  color="gray.800" zIndex={2}>
                    NOSSOS
                </Heading>
                <Box width="250px" bg="yellow.400" height={10} mt={-5} alignSelf="center"/>
                <Heading as="i" letterSpacing={4} pr={10}  color="gray.800" alignSelf="flex-end" fontSize="5xl" fontWeight="light">VEÍCULOS</Heading>

                </Box>
               <Flex p={6}  height="650px" width="1480px">

               <Swiper
                    spaceBetween={50}
                    slidesPerView={3}
                    navigation
                    
                    scrollbar={{ draggable: true }}
                    autoplay={{delay: 2000,  disableOnInteraction: false}}
                    draggable={true}
                    speed={1200}
                    >
                    {
                        anuncios.map(anuncio =>{
                            return (
                                <SwiperSlide key={anuncio.id}>
                                     {({ isNext }) => (
                                       <Stack height="100%" position="relative" alignItems="center" justifyContent="space-between" overflow="hidden">
                                           
                                           <ChakraImage
                                           as={Image}
                                           src={anuncio.image[0]}
                                           alt={anuncio.name}
                                           layout="fill"
                                           objectFit="cover"
                                           priority
                                           filter={`${isNext? "brightness(1.10)" : "brightness(0.7)"}`}
                                           transition="all 0.3s ease-in-out"
                                           _hover={{
                                            transform: "scale(1.1)"
                                        }}

                                          
                                           
                                           />
                                           <StackDivider/>
                                           
                                           <Stack zIndex={1} backgroundColor="yellow.400" width="100%" direction="column" alignSelf="flex-start" px={6} py={3} >
                                           <Heading fontSize="3xl" color="gray.900" letterSpacing={2}>{anuncio.name.toUpperCase()}</Heading>
                                           <StackDivider/>
                                           <Stack  direction="row" justifyContent="space-between">
                                                <Text fontSize="3xl" alignSelf="flex-end" fontWeight="bold">{anuncio.ano_fabricacao}</Text>
                                                <StackDivider/>
                                                <StackDivider/>
                                               <Text fontSize="3xl" fontWeight="light">{anuncio.valor}</Text>
                                           </Stack>
                                           </Stack>
                                       </Stack>
                                    )}
                                    
                                </SwiperSlide>
                            )
                            
                        })
                    }
                    </Swiper>
               </Flex>
            </Stack>
    )
}