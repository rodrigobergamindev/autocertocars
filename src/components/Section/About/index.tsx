import { HStack, VStack, Icon, Grid, Box, Flex, Image as ChakraImage, Divider, Text, Button, Stack, Heading, StackDivider} from '@chakra-ui/react'

import Image from 'next/image'
import {FaRegHandshake, FaCar} from 'react-icons/fa'
import {GiBrazil, GiPayMoney, GiReceiveMoney, GiTakeMyMoney} from 'react-icons/gi'
import { RiRefreshLine } from 'react-icons/ri'
import {IoIosCash, IoIosDocument} from 'react-icons/io'

export default function About() {

    return (
        <Stack 
           spacing={10} 
            align="center" 
            justify="center"
            w="100%"
            p={20}
            flexDirection="column"
            backgroundColor="gray.900"
            backgroundImage="/img/bg.png"
            backgroundAttachment="scroll"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundPosition="center"
            
            >
            
                <Box as={Flex}  width="100%" maxWidth="750px"  flexDirection="column" alignSelf="center">
                
                
                <Heading as="i" fontWeight="light" letterSpacing={3} fontSize="6xl"  color="gray.50" zIndex={2}>
                    SOBRE
                </Heading>
                <Heading as="i" letterSpacing={4}  color="yellow.400" alignSelf="flex-end" fontSize="7xl" fontWeight="black">AUTO CERTO CARS</Heading>

                </Box>
               <Flex width="1480px">

               <Grid  placeContent="center" placeItems="center" flex="1" templateColumns="repeat(2, 1fr)">
                   <Stack direction="column" w="100%" h="100%" spacing="16"  p={10}>
                    <Stack w="100%" direction="column" align="flex-start" >

                        <Heading fontWeight="bold" color="yellow.400" fontSize="5xl" letterSpacing={8}>VISÃO</Heading>
                        <Text fontSize="20">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                        <StackDivider/>
                        <StackDivider/>
                      
                        <Box
                        as={Stack}
                        direction="row"
                        align="center"
                        justify="center"
                        spacing="5"
                        >
                        
                        <Icon flex="1" as={FaRegHandshake} fontSize="100"/>
                        
                        <VStack>
                            <Text letterSpacing={7} fontSize="25" fontWeight="light">CLIENTES SATISFEITOS</Text>
                            <Heading alignSelf="flex-start" color="yellow.400" letterSpacing={2}>1259</Heading>
                        </VStack>
                        </Box>
                    </Stack>

                    <Stack w="100%" direction="column" align="flex-start">

                        <Heading fontWeight="bold" color="yellow.400" fontSize="5xl" letterSpacing={8}>MISSÃO</Heading>
                        <Text fontSize="20">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                        <StackDivider/>
                        <StackDivider/>
                      
                        <Box
                        as={Stack}
                        direction="row"
                        align="center"
                        justify="center"
                        spacing="5"
                        >
                        
                        <Icon flex="1" as={FaCar} fontSize="100"/>
                        
                        <VStack>
                            <Text letterSpacing={7} fontSize="25" fontWeight="light">CARROS VENDIDOS</Text>
                            <Heading alignSelf="flex-start" color="yellow.400" letterSpacing={2}>1259</Heading>
                        </VStack>
                        </Box>
                    </Stack>

                    
                    <Stack w="100%" direction="column" align="flex-start">

                        <Heading fontWeight="bold" color="yellow.400" fontSize="5xl" letterSpacing={8}>DESAFIO</Heading>
                        <Text fontSize="20">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                        <StackDivider/>
                        <StackDivider/>
                      
                        <Box
                        as={Stack}
                        direction="row"
                        align="center"
                        justify="center"
                        spacing="5"
                        >
                        
                        <Icon flex="1" as={GiBrazil} fontSize="100"/>
                        
                        <VStack>
                            <Text letterSpacing={7} fontSize="25" fontWeight="light">ESTADOS ALCANÇADOS</Text>
                            <Heading alignSelf="flex-start" color="yellow.400" letterSpacing={2}>15</Heading>
                        </VStack>
                        </Box>
                    </Stack>

                   
                    </Stack>

                <Stack direction="column" w="100%" h="100%" spacing="16"  p={10}>
                    

                <Heading fontWeight="bold" color="yellow.400" fontSize="5xl" letterSpacing={8}>NOSSOS SERVIÇOS</Heading>

                <HStack spacing="12" justify="flex-start" align="center">

                <Icon border="1px solid" borderColor="gray.50" borderRadius="full" p={2} color="yellow.400" as={GiReceiveMoney} fontSize="70"/>
                <Text fontSize="25" fontWeight="bold" letterSpacing={2}>VENDA</Text>

                </HStack>

                <HStack spacing="12" justify="flex-start" align="center">

                <Icon border="1px solid" borderColor="gray.50" borderRadius="full" p={2} color="yellow.400" as={RiRefreshLine} fontSize="70"/>
                <Text fontSize="25" fontWeight="bold" letterSpacing={2}>TROCA</Text>

                </HStack>

                <HStack spacing="12" justify="flex-start" align="center">

                <Icon border="1px solid" borderColor="gray.50" borderRadius="full" p={2} color="yellow.400" as={GiTakeMyMoney} fontSize="70"/>
                <Text fontSize="25" fontWeight="bold" letterSpacing={2}>TROCA COM TROCO</Text>

                </HStack>

                <HStack spacing="12" justify="flex-start" align="center">

                <Icon border="1px solid" borderColor="gray.50" borderRadius="full" p={2} color="yellow.400" as={IoIosDocument} fontSize="70"/>
                <Text fontSize="25" fontWeight="bold" letterSpacing={2}>SERVIÇOS DE DESPACHANTE</Text>

                </HStack>

                <HStack spacing="12" justify="flex-start" align="center">

                <Icon border="1px solid" borderColor="gray.50" borderRadius="full" p={2} color="yellow.400" as={IoIosCash} fontSize="70"/>
                <Text fontSize="25" fontWeight="bold" letterSpacing={2}>FINANCIAMENTO</Text>

                </HStack>
                
                <HStack spacing="12" justify="flex-start" align="center">

                <Icon border="1px solid" borderColor="gray.50" borderRadius="full" p={2} color="yellow.400" as={GiPayMoney} fontSize="70"/>
                <Text fontSize="25" fontWeight="bold" letterSpacing={2}>REFINANCIAMENTO</Text>

                </HStack>

                   
                </Stack>

                
                </Grid>
               </Flex>
            </Stack>
    )
}