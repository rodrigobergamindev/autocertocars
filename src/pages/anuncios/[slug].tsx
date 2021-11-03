import { Button, Grid, List, ListItem, HStack, VStack, Heading, Stack, Box, Flex,Text, Icon, IconButton, Image as ChakraImage} from '@chakra-ui/react'
import "swiper/css";

import {IoMdCloseCircle, IoMdShareAlt} from 'react-icons/io'
import {GiSpeedometer, GiGasPump, GiCarSeat} from 'react-icons/gi'
import {FaCheckCircle, FaRegCalendarAlt} from 'react-icons/fa'

import { GetStaticProps, GetStaticPaths } from 'next'


import FormContact from '../../components/Contact/index'
import {api} from '../../services/api'
import Logo from '../../components/Home/Header/Logo'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper';


SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);


export default function Anuncio({anuncio}) {


  
   

    return (
        <Box as={Flex} w="100%" direction="column">
             

            <Flex 
            align="center" 
            justify="center"
            width="100%"
            h="90vh"
            boxShadow="inset 0px 0px 1190px rgba(0,0,20,1)"
            
            >
            <Box zIndex={333} position="absolute" top="3" left="5">
                <Logo size={300}/>
            </Box>
            <Box as={Flex} flex="1" position="relative" width="100%">
            <Swiper
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation
                    scrollbar={{ draggable: true }}
                    autoplay={{delay: 2000,  disableOnInteraction: false}}
                    draggable={true}
                    speed={1200}
                    style={{width:'100%'}}
                    >
                    {
                        anuncio.image.map(image =>{
                            return (
                                
                                <SwiperSlide key={image}>
                                    
                                       <Stack position="relative" spacing={0} height="90vh" alignItems="center">
                                           
                                           <ChakraImage
                                            as={Image}
                                           src={image}
                                           alt={anuncio.name}
                                            layout="fill"
                                           objectFit="cover"
                                           width="100%"
                                           height="100%"
                                           priority
                                           transition="all 0.3s ease-in-out"
                                           _hover={{
                                            transform: "scale(1.1)"
                                        }}
                                           />

                                       </Stack>
                              
                                   
                                   
                                </SwiperSlide>
                                
                            )
                            
                        })
                    }
                    </Swiper>
                </Box>
                

                
            </Flex>

          
            

            <Box flex="1" as={Flex} direction="column" width="100%" backgroundColor="gray.50" alignItems="center" justifyContent="center" p={25}>


                <VStack maxWidth="1280px" width="100%" border="solid" spacing={20}  mt={15}>
                    <Heading as="i" mx="auto" color="gray.900" fontSize="7xl">{anuncio.name.toUpperCase() + ' ' + anuncio.versao.toUpperCase()}</Heading>

                    <Grid templateColumns="repeat(4,1fr)" gap={20}>
                        <Box as={VStack} align="center" justify="center">
                            <Icon as={GiSpeedometer} color="gray.900" fontSize="5xl"/>
                            <Text color="gray.900" fontSize="2xl" >{anuncio.quilometragem + " " + "Km"}</Text>
                        </Box>

                        <Box as={VStack} align="center" justify="center">
                            <Icon as={FaRegCalendarAlt} color="gray.900" fontSize="5xl"/>
                            <Text color="gray.900" fontSize="2xl" >{anuncio.ano_fabricacao}</Text>
                        </Box>

                        <Box as={VStack} align="center" justify="center">
                            <Icon as={GiGasPump} color="gray.900" fontSize="5xl"/>
                            <Text color="gray.900" fontSize="2xl" >{anuncio.combustivel}</Text>
                        </Box>

                        <Box as={VStack} align="center" justify="center">
                            <Icon as={GiCarSeat} color="gray.900" fontSize="5xl"/>
                            <Text color="gray.900" fontSize="2xl" >{anuncio.transmissao}</Text>
                        </Box>
                    </Grid>

                </VStack>

                


                <Box mt={120} as={Flex} direction="column" maxWidth="1280px" width="100%">
                    
                    
                    <Grid templateColumns="repeat(2,1fr)" gap={16}>
                    
                    <VStack>

                    <HStack alignSelf="flex-start" justify="space-between" width="100%">
                        <Heading color="gray.500" fontSize="3xl" fontFamily="Roboto, sans-serif">INFORMAÇÕES DO VEÍCULO</Heading>
                        
                    </HStack>

                        <VStack width="100%">
                        <List flex="1" width="100%" alignSelf="flex-start" pt={10} pb={10}>
                            <ListItem  p={1} width="100%" borderBottom="1px solid" borderColor="gray.100"><Text fontSize="xl" color="gray.900">Marca: {anuncio.marca_name}</Text></ListItem>
                            <ListItem  p={1} width="100%" borderBottom="1px solid" borderColor="gray.100"><Text fontSize="xl" color="gray.900">Modelo: {anuncio.modelo}</Text></ListItem>
                            <ListItem  p={1} width="100%" borderBottom="1px solid" borderColor="gray.100"><Text fontSize="xl" color="gray.900">Versão: {anuncio.versao}</Text></ListItem>
                            <ListItem  p={1} width="100%" borderBottom="1px solid" borderColor="gray.100"><Text fontSize="xl" color="gray.900">Ano: {anuncio.ano_fabricacao}</Text></ListItem>
                            <ListItem  p={1} width="100%" borderBottom="1px solid" borderColor="gray.100"><Text fontSize="xl" color="gray.900">Valor: {`${anuncio.valor},00`}</Text></ListItem>
                            <ListItem  p={1} width="100%" borderBottom="1px solid" borderColor="gray.100"><Text fontSize="xl" color="gray.900">Quilometragem: {anuncio.quilometragem + '' + 'Km'}</Text></ListItem>
                            <ListItem  p={1} width="100%" borderBottom="1px solid" borderColor="gray.100"><Text fontSize="xl" color="gray.900">Transmissão: {anuncio.transmissao}</Text></ListItem>
                            <ListItem  p={1} width="100%" borderBottom="1px solid" borderColor="gray.100"><Text fontSize="xl" color="gray.900">Portas: {anuncio.numero_portas}</Text></ListItem>
                            <ListItem  p={1} width="100%" borderBottom="1px solid" borderColor="gray.100"><Text fontSize="xl" color="gray.900">Cor: {anuncio.cor}</Text></ListItem>
                            <ListItem  p={1} width="100%" borderBottom="1px solid" borderColor="gray.100"><Text fontSize="xl" color="gray.900">Cor Interna: {anuncio.cores_internas}</Text></ListItem>
                            <ListItem  p={1} width="100%" borderBottom="1px solid" borderColor="gray.100"><Text fontSize="xl" color="gray.900">Combustível: {anuncio.combustivel}</Text></ListItem>
                            <ListItem  p={1} width="100%" borderBottom="1px solid" borderColor="gray.100"><Text fontSize="xl" color="gray.900">Carroceria: {anuncio.carroceria}</Text></ListItem>
                            <ListItem  p={1} width="100%" borderBottom="1px solid" borderColor="gray.100"><Text fontSize="xl" color="gray.900">Potência: {anuncio.potencia}</Text></ListItem>
                            <ListItem  p={1} width="100%" borderBottom="1px solid" borderColor="gray.100"><Text fontSize="xl" color="gray.900">Condição: {anuncio.condicao}</Text></ListItem>
                        </List>
                    
                        </VStack>
                    </VStack>

                    <VStack>
                        <Heading color="gray.500" fontSize="3xl" fontFamily="Roboto, sans-serif" alignSelf="flex-start">OUTRAS INFORMAÇÕES</Heading>
                        <Grid templateColumns="repeat(2,1fr)" width="100%" gap={2} pt={10} pb={10}>
                            <Text color="gray.900" fontSize="xl">{anuncio.manual_do_proprietario === "Sim" ? <Icon as={FaCheckCircle} color="blue.500"/> : <Icon as={IoMdCloseCircle} color="red"/>} Manual do Proprietário</Text>
                            <Text color="gray.900" fontSize="xl">{anuncio.laudo_cautelar === "Sim" ? <Icon as={FaCheckCircle} color="blue.500"/> : <Icon as={IoMdCloseCircle} color="red"/>} Laudo Cautelar</Text>
                            <Text color="gray.900" fontSize="xl">{anuncio.chave_copia === "Sim" ? <Icon as={FaCheckCircle} color="blue.500"/> : <Icon as={IoMdCloseCircle} color="red"/>} Chave Cópia</Text>
                        </Grid>


                        <Heading color="gray.500" fontSize="3xl" fontFamily="Roboto, sans-serif" alignSelf="flex-start">OPCIONAIS</Heading>
                        <Grid templateColumns="repeat(2,1fr)" width="100%" pt={10} pb={10}>
                            {anuncio.opcionais.map(opcional => (
                                <Text key={opcional} color="gray.900" fontSize="xl"><Icon as={FaCheckCircle} color="blue.500"/> {opcional}</Text>
                            ))}
                        </Grid>

                       
                        </VStack>
                    
                    </Grid>

                    <FormContact veiculo={anuncio.name}/>
                </Box>
            </Box>
            
        </Box>
    )
}


export const getStaticPaths: GetStaticPaths = async () => {

    
    const response = await api.get('/anuncios/get', {
        method: "GET",
      })
    

    const anuncios = await response.data

    const paths = anuncios.map((anuncio) => ({
        params: { slug: anuncio.slug },
      })) || []

     
    
      return { 
          paths, 
          fallback: true
        }
  }


export const getStaticProps: GetStaticProps = async ({params, preview = false}) => {

    
    const {slug} = params

    const response = await  api.get('/anuncios/get', {
        method: "GET",
        params: {
          slug: slug as string
        }
      })

    const anuncio = await response.data
    
    return {
      props: {
          preview,
          anuncio
      },
      revalidate: 3600
    }
  }


  
