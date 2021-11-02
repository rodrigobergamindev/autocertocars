import { Button, Grid, List, ListItem, HStack, VStack, Heading, Stack, Box, Flex,Text, Icon, IconButton, Image as ChakraImage} from '@chakra-ui/react'

import {RiCheckFill, RiCloseFill, RiMenuLine, RiWhatsappFill} from 'react-icons/ri'
import {IoMdCloseCircle, IoMdShareAlt} from 'react-icons/io'
import {GiSpeedometer, GiGasPump, GiGearHammer, GiCarWheel, GiGears, GiCarSeat, GiTakeMyMoney} from 'react-icons/gi'
import {FaCheckCircle, FaRegCalendarAlt} from 'react-icons/fa'
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext'
import { GetStaticProps, GetStaticPaths } from 'next'

import Drawer from '../../components/Drawer/index'

import Footer from '../../components/Home/Footer/index'
import {api} from '../../services/api'
import Logo from '../../components/Home/Header/Logo'
import Image from 'next/image'
import {useState} from 'react'

export default function Anuncio({anuncio}) {

    
    const { onOpen } = useSidebarDrawer()
    const [imagePreview, setImage] = useState(anuncio.image[0])
   

    return (
        <Box as={Flex} w="100%" direction="column">
             
            <IconButton
            aria-label="Open navigation"
            icon={<Icon as={RiMenuLine}/>}
            color="yellow.400"
            fontSize="40"
            variant="unstyled"
            onClick={onOpen}
            position="fixed"
            right={4}
            top={4}
            _active={{
                borderColor: "none",
              }}
            _focus={{
                borderColor: "none"
            }}
            zIndex={999}
            >
            </IconButton>

            <Drawer/>

            <Box 
            as={Flex} 
            align="center" 
            justify="center"
            w="100%"
            h="90vh"
            position="relative"
            boxShadow="inset 0px 0px 1190px rgba(0,0,20,1)"
            >
               
                <ChakraImage
                as={Image}
                src={imagePreview}
                layout="fill"
                objectFit="cover"
                priority
                zIndex={-1}
                
                >

                </ChakraImage>
                
                <Stack
                flex="1"
                flexDirection="column"
                justify="flex-start"
                align="flex-start"
                p={15}
                alignSelf="flex-start"
              
               
                height="100%"
                >
                    <Logo size={300}/>
                    

                    <HStack width="100%"  flex="1" align="flex-end" justify="space-between">
                        <Heading p={6} fontFamily="Roboto, sans-serif"  letterSpacing={1.5} fontSize="5xl">{anuncio.name.toUpperCase() + " - " + anuncio.valor + ',00'}</Heading>
                        <HStack align="center" justify="center">
                            <Heading p={6}   fontSize="5xl"><Button leftIcon={<Icon as={IoMdShareAlt} fontSize="30"/>} size="lg" fontSize="2xl" colorScheme="whiteAlpha">Tenho Interesse</Button></Heading>
                            <Heading p={6}   fontSize="5xl"><Button leftIcon={<Icon as={GiTakeMyMoney} fontSize="30"/>} size="lg" fontSize="2xl" colorScheme="whiteAlpha">Quero trocar</Button></Heading>
                        </HStack>
                        
                    </HStack>
                </Stack>

                
            </Box>
            

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

                <Grid mt={100} border="solid" templateColumns="repeat(4,1fr)" height="600px" width="100%" maxWidth="1280px">
                    {anuncio.image.map(image => (
                        <Box position="relative" key={image}>
                            <ChakraImage
                                as={Image}
                                src={image}
                                layout="fill"
                                objectFit="cover"
                                priority
                                transition="all 0.3s ease-in-out"
                                cursor="pointer"
                                onClick={() => setImage(image)}
                                _hover={{
                                 transform: "scale(1.1)",
                                 filter: "brightness(0.7)"
                                
                             }}
                            >

                </ChakraImage>
                        </Box>
                    ))}
                </Grid>


                <Box mt={150} as={Flex} direction="column" maxWidth="1280px" width="100%">
                    <Heading color="gray.900" fontSize="5xl" letterSpacing={2}>ESPECIFICAÇÕES</Heading>
                    <HStack mt={20} justify="space-between">
                        <Heading color="gray.500" fontSize="3xl" fontFamily="Roboto, sans-serif">INFORMAÇÕES DO VEÍCULO</Heading>
                        <Heading color="gray.900" fontSize="3xl" fontFamily="Roboto, sans-serif">{anuncio.valor + ',00'}</Heading>
                    </HStack>

                    <VStack width="100%">
                        <List flex="1" width="100%" alignSelf="flex-start" pt={10} pb={10}>
                            <ListItem  p={1} width="100%" borderBottom="1px solid" borderColor="gray.100"><Text fontSize="xl" color="gray.900">Marca: {anuncio.marca_name}</Text></ListItem>
                            <ListItem  p={1} width="100%" borderBottom="1px solid" borderColor="gray.100"><Text fontSize="xl" color="gray.900">Modelo: {anuncio.modelo}</Text></ListItem>
                            <ListItem  p={1} width="100%" borderBottom="1px solid" borderColor="gray.100"><Text fontSize="xl" color="gray.900">Versão: {anuncio.versao}</Text></ListItem>
                            <ListItem  p={1} width="100%" borderBottom="1px solid" borderColor="gray.100"><Text fontSize="xl" color="gray.900">Ano: {anuncio.ano_fabricacao}</Text></ListItem>
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
                </Box>
            </Box>

                



            <a href="https://ul.waze.com/ul?place=ChIJQZ6RW19hzpQR-JEo6pwBfnw&ll=-23.51520590%2C-46.45910690&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location" target="_blank">
            
            <Box
            as="iframe"
            src="https://embed.waze.com/iframe?zoom=15&lat=-23.515206&lon=-46.459107&pin=1&desc=1&ct=livemap"
            height="400px"
            width="100%"
            />
            </a>
            <Footer/>
            
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
      }))
    
      return { 
          paths, 
          fallback: false 
        }
  }


export const getStaticProps: GetStaticProps = async ({params}) => {

    
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
          anuncio
      }
    }
  }


  
