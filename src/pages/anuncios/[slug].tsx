import { Button, Grid, List, ListItem, HStack, VStack, Heading, Stack, Box, Flex,Text, Icon, IconButton, Image as ChakraImage} from '@chakra-ui/react'
import "swiper/css";

import {IoMdCloseCircle, IoMdShareAlt} from 'react-icons/io'
import {GiSpeedometer, GiGasPump, GiCarSeat, GiMoneyStack} from 'react-icons/gi'
import {FaCheckCircle, FaRegCalendarAlt} from 'react-icons/fa'

import { GetStaticProps, GetStaticPaths } from 'next'


import FormContact from '../../components/Contact/index'

import Logo from '../../components/Home/Header/Logo'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper';
import {prisma} from '../../../db'



SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);


export default function Anuncio({anuncio}) {


  
   
    if(!anuncio) return null
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
                                           quality={100}
                                           transition="all 0.3s ease-in-out"
                                           _hover={{
                                            transform: "scale(1.1)"
                                        }}/>
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

                    <Grid templateColumns="repeat(5,1fr)" gap={10}>
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

                        <Box as={VStack} align="center" justify="center">
                            <Icon as={GiMoneyStack} color="gray.900" fontSize="5xl"/>
                            <Text color="gray.900" fontSize="2xl" >{`${anuncio.valor},00`}</Text>
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
                            <ListItem  p={1} width="100%" borderBottom="1px solid" borderColor="gray.100"><Text fontSize="xl" color="gray.900">Quilometragem: {anuncio.quilometragem + ' ' + 'Km'}</Text></ListItem>
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
                    <FormContact veiculo={`${anuncio.name} ${anuncio.versao} ${anuncio.ano_fabricacao}`}/> 
                    </VStack>
                        
                    </Grid>

                    <Grid templateColumns="repeat(2,1fr)" width="100%" gap={2} pt={10} pb={10}>

                        <VStack width="100%">
                        <Heading color="gray.500" fontSize="3xl" fontFamily="Roboto, sans-serif" alignSelf="flex-start">OUTRAS INFORMAÇÕES</Heading>
                        <Grid templateColumns="repeat(2,1fr)" width="100%" gap={2} pt={10} pb={10}>
                            <Text color="gray.900" fontSize="xl">{anuncio.manual_do_proprietario === "Sim" ? <Icon as={FaCheckCircle} color="blue.500"/> : <Icon as={IoMdCloseCircle} color="red"/>} Manual do Proprietário</Text>
                            <Text color="gray.900" fontSize="xl">{anuncio.laudo_cautelar === "Sim" ? <Icon as={FaCheckCircle} color="blue.500"/> : <Icon as={IoMdCloseCircle} color="red"/>} Laudo Cautelar</Text>
                            <Text color="gray.900" fontSize="xl">{anuncio.chave_copia === "Sim" ? <Icon as={FaCheckCircle} color="blue.500"/> : <Icon as={IoMdCloseCircle} color="red"/>} Chave Cópia</Text>
                        </Grid>
                        </VStack>

                        <VStack width="100%">
                        <Heading color="gray.500" fontSize="3xl" fontFamily="Roboto, sans-serif" alignSelf="flex-start">OPCIONAIS</Heading>
                        <Grid templateColumns="repeat(2,1fr)" width="100%" pt={10} pb={10}>
                            {anuncio.opcionais.map(opcional => (
                                <Text my={1} key={opcional} color="gray.900" fontSize="xl"><Icon as={FaCheckCircle} color="blue.500"/> {opcional}</Text>
                            ))}
                        </Grid>
                        </VStack>
                        </Grid>

                    
                </Box>
            </Box>

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

    const data = await prisma.anuncio.findUnique({
        where: {
          slug: slug as string
        },
      })

    const anuncio = await JSON.parse(JSON.stringify(data))
    
    return {
      props: {
         anuncio
      },
      revalidate: 3600
    }
  }


  
