import { Divider, Button, Grid, List, ListItem, HStack, VStack, Heading, Stack, Box, Flex,Text, Icon, IconButton, Image as ChakraImage} from '@chakra-ui/react'


import {IoMdCloseCircle, IoMdShareAlt} from 'react-icons/io'
import {GiSpeedometer, GiGasPump, GiCarSeat, GiMoneyStack} from 'react-icons/gi'
import {FaCheckCircle, FaRegCalendarAlt} from 'react-icons/fa'
import {BsFillQuestionCircleFill} from 'react-icons/bs'

import { GetStaticProps, GetStaticPaths } from 'next'


import FormContact from '../../components/Contact/index'

import Logo from '../../components/Home/Header/Logo'
import Image from 'next/image'
import {prisma} from '../../../db'
import Link from 'next/link'
import VehicleSection from '../../components/Section/Veiculos';
import Head from 'next/head'

import Slider from "react-slick";
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md'

export default function Anuncio({anuncio, anuncios}) {


    if(!anuncio) return null

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
        <Box as={Flex} w="100%" direction="column">
             
             <Head>
            <title>{`AutoCerto Cars - ${anuncio.name}`}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Flex 
            align="center" 
            justify="center"
            width="100%"
            mt="4.5rem"
            bg="gray.50"
            >
            <Box px={5} width="100%" height="100%">

           <Slider {...settings}>

            {anuncio.image.map(image => (
                <a key={image} href={image} target="_blank" rel="noreferrer">
                <Box px={5}>
                <Stack
               
                position="relative"
                spacing={0} 
                height="50vh"
                alignItems="center" 
                justifyContent="flex-end" 
                overflow="hidden" 
                cursor="pointer"
                transition="all 0.3s ease-in-out"
                width="100%"
                >
                    <ChakraImage
                              as={Image}
                             src={image}
                            layout="fill"
                             objectFit="cover"
                             width="100%"
                             height="100%"
                             priority
                            
                             
                             transition="all 0.2s ease-in-out"
                             _hover={{
                              transform: "scale(1.1)"
                          }}
                             />
                </Stack>
                </Box>
                </a>
            ))}
            </Slider>
            

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
                    
                    
                    <Grid templateColumns="repeat(2,1fr)" gap={16} my={9}>
                    
                    <VStack>

                    
                        <VStack width="100%" bg="white" p={6} borderRadius="5" boxShadow="0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)">
                        <VStack align="flex-start" width="100%">
                            <Heading color="gray.900" fontSize="3xl" fontWeight="black" fontFamily="Roboto, sans-serif">{`${anuncio.name.toUpperCase()}`}</Heading>
                            <Heading color="gray.500" fontSize="xl" fontFamily="Roboto, sans-serif">{`${anuncio.versao} ${anuncio.potencia} ${anuncio.combustivel} ${anuncio.numero_portas}P ${anuncio.transmissao}`}</Heading>
                        </VStack>

                        <List flex="1" width="100%" alignSelf="flex-start" pt={10} pb={10}>
                            <Grid templateColumns="repeat(4,1fr)" width="100%">
                                <ListItem  p={3} width="100%" ><Text fontSize="md" fontWeight="bold" color="gray.900"><Text fontSize="sm" fontWeight="normal" color="gray.500">MARCA</Text> {anuncio.marca_name}</Text></ListItem>
                                <ListItem  p={3} width="100%" ><Text fontSize="md" fontWeight="bold" color="gray.900"><Text fontSize="sm" fontWeight="normal" color="gray.500">MODELO</Text>  {anuncio.modelo}</Text></ListItem>
                                <ListItem  p={3} width="100%" ><Text fontSize="md" fontWeight="bold" color="gray.900"><Text fontSize="sm" fontWeight="normal" color="gray.500">VERSÃO</Text>  {anuncio.versao}</Text></ListItem>
                                <ListItem  p={3} width="100%" ><Text fontSize="md" fontWeight="bold" color="gray.900"><Text fontSize="sm" fontWeight="normal" color="gray.500">ANO</Text>  {anuncio.ano_fabricacao}</Text></ListItem>
                                <ListItem  p={3} width="100%" ><Text fontSize="md" fontWeight="bold" color="gray.900"><Text fontSize="sm" fontWeight="normal" color="gray.500">VALOR</Text>  {`${anuncio.valor},00`}</Text></ListItem>
                                <ListItem  p={3} width="100%" ><Text fontSize="md" fontWeight="bold" color="gray.900"><Text fontSize="sm" fontWeight="normal" color="gray.500">KM</Text>  {anuncio.quilometragem + ' ' + 'Km'}</Text></ListItem>
                                <ListItem  p={3} width="100%" ><Text fontSize="md" fontWeight="bold" color="gray.900"><Text fontSize="sm" fontWeight="normal" color="gray.500">TRANSMISSÃO</Text>  {anuncio.transmissao}</Text></ListItem>
                                <ListItem  p={3} width="100%" ><Text fontSize="md" fontWeight="bold" color="gray.900"><Text fontSize="sm" fontWeight="normal" color="gray.500">PORTAS</Text>  {anuncio.numero_portas}</Text></ListItem>
                                <ListItem  p={3} width="100%" ><Text fontSize="md" fontWeight="bold" color="gray.900"><Text fontSize="sm" fontWeight="normal" color="gray.500">COR</Text>  {anuncio.cor}</Text></ListItem>
                                <ListItem  p={3} width="100%" ><Text fontSize="md" fontWeight="bold" color="gray.900"><Text fontSize="sm" fontWeight="normal" color="gray.500">COR INTERNA</Text>  {anuncio.cores_internas}</Text></ListItem>
                                <ListItem  p={3} width="100%" ><Text fontSize="md" fontWeight="bold" color="gray.900"><Text fontSize="sm" fontWeight="normal" color="gray.500">COMBUSTÍVEL</Text>  {anuncio.combustivel}</Text></ListItem>
                                <ListItem  p={3} width="100%" ><Text fontSize="md" fontWeight="bold" color="gray.900"><Text fontSize="sm" fontWeight="normal" color="gray.500">CARROCERIA</Text>  {anuncio.carroceria}</Text></ListItem>
                                <ListItem  p={3} width="100%" ><Text fontSize="md" fontWeight="bold" color="gray.900"><Text fontSize="sm" fontWeight="normal" color="gray.500">POTÊNCIA</Text>  {anuncio.potencia}</Text></ListItem>
                                <ListItem  p={3} width="100%" ><Text fontSize="md" fontWeight="bold" color="gray.900"><Text fontSize="sm" fontWeight="normal" color="gray.500">CONDIÇÃO</Text>  {anuncio.condicao}</Text></ListItem>
                            </Grid>
                        </List>

                        
                    <Grid templateColumns="repeat(2,1fr)" width="100%" gap={2}  pb={10}>

                    <VStack width="100%">
                    <Heading color="gray.500" fontSize="md" fontFamily="Roboto, sans-serif" alignSelf="flex-start">OUTRAS INFORMAÇÕES</Heading>
                    <Grid templateColumns="repeat(2,1fr)" width="100%" gap={2} pt={5} pb={10}>
                        <Text color="gray.900" fontSize="sm">{anuncio.manual_do_proprietario === "Sim" ? <Icon as={FaCheckCircle} color="blue.500"/> : <Icon as={IoMdCloseCircle} color="red"/>} Manual do Proprietário</Text>
                        <Text color="gray.900" fontSize="sm">{anuncio.laudo_cautelar === "Aprovado" ? <Icon as={FaCheckCircle} color="blue.500"/> : anuncio.laudo_cautelar === "Reprovado" ? <Icon as={IoMdCloseCircle} color="red"/> : <Icon as={BsFillQuestionCircleFill} color="orange"/> } Laudo Cautelar</Text>
                        <Text color="gray.900" fontSize="sm">{anuncio.chave_copia === "Sim" ? <Icon as={FaCheckCircle} color="blue.500"/> : <Icon as={IoMdCloseCircle} color="red"/>} Chave Cópia</Text>
                    </Grid>
                    </VStack>

                    <VStack width="100%">
                    <Heading color="gray.500" fontSize="md" fontFamily="Roboto, sans-serif" alignSelf="flex-start">OPCIONAIS</Heading>
                    <Grid templateColumns="repeat(2,1fr)" width="100%" gap={2} pt={5} pb={10}>
                        {anuncio.opcionais.map(opcional => (
                            <Text key={opcional} color="gray.900" fontSize="sm"><Icon as={FaCheckCircle} color="blue.500"/> {opcional.toUpperCase()}</Text>
                        ))}
                    </Grid>
                    </VStack>
                    </Grid>

                    
                        </VStack>

                    
                        </VStack>
                   

                    <VStack height="100%">
                    <FormContact veiculo={`${anuncio.name} ${anuncio.versao} ${anuncio.ano_fabricacao}`} valor={anuncio.valor}/> 
                    </VStack>
                        
                    </Grid>

                
                </Box>
            </Box>
        
        <VehicleSection anuncios={anuncios}/>
        </Box>
    )
}


export const getStaticPaths: GetStaticPaths = async () => {

    
    const anuncios = await prisma.anuncio.findMany()

    const paths = anuncios.map((anuncio) => ({
        params: { slug: anuncio.slug },
      }))

     
    
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


  
