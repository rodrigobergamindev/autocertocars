import { HStack, VStack, Icon, Grid, Box, Flex, Image as ChakraImage, Divider, Text, Button, Stack, Heading, StackDivider} from '@chakra-ui/react'

import Image from 'next/image'
import {FaRegHandshake, FaCar} from 'react-icons/fa'
import {GiBrazil, GiPayMoney, GiReceiveMoney, GiTakeMyMoney} from 'react-icons/gi'
import { RiRefreshLine } from 'react-icons/ri'
import {IoIosCash, IoIosDocument} from 'react-icons/io'
import CountUp from 'react-countup';


export default function About() {

    return (
        <Stack bg="gray.50" spacing={0}>
              <ChakraImage
                src="/img/wavetwo.svg"
                width="100%"
                objectFit="cover"
               
            />
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
                        <Text fontSize="20">Nossa visão é de sempre proporcionar um bom negócio</Text>
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
                            <Heading alignSelf="flex-start" color="yellow.400" letterSpacing={2}><CountUp end={3600} duration={400/60}/></Heading>
                        </VStack>
                        </Box>
                    </Stack>

                    <Stack w="100%" direction="column" align="flex-start">

                        <Heading fontWeight="bold" color="yellow.400" fontSize="5xl" letterSpacing={8}>MISSÃO</Heading>
                        <Text fontSize="20">Bom negócio já é garantido, excelente negócio é nossa obrigação</Text>
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
                            <Heading alignSelf="flex-start" color="yellow.400" letterSpacing={2}>+<CountUp end={3000} duration={400/60}/></Heading>
                        </VStack>
                        </Box>
                    </Stack>

                    
                    <Stack w="100%" direction="column" align="flex-start">

                        <Heading fontWeight="bold" color="yellow.400" fontSize="5xl" letterSpacing={8}>DESAFIO</Heading>
                        <Text fontSize="20">Nosso maior desafio e satisfação é a realização do seu sonho e a sua conquista</Text>
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
                            <Heading alignSelf="flex-start" color="yellow.400" letterSpacing={2}><CountUp end={15} duration={400/60}/></Heading>
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


               <Grid 
            templateColumns="repeat(1,1fr)"
            w="100%"
            maxW="1400px"
            mb={150}
            p={6}
            gap={10}
            
            >  

           
                <HStack width="100%">

               <Divider orientation="horizontal"  />
               <VStack align="center" >
                    <Text fontSize="7xl" as="i" fontWeight="black">TRADIÇÃO</Text>
                    
                    <Text fontSize="7xl" color="#48BB78" fontWeight="light">CONFIABILIDADE</Text>
                   
                </VStack>
                <Divider  orientation="horizontal" />
                </HStack>
           

            <VStack >
                
                <Box p={5} as={Flex} direction="row" width="100%" flex="1" alignItems="center">
                    <Box position="relative" width="100%" height="450px">
                    <ChakraImage as={Image} src="/img/historia1.jpg" 
                    objectFit="cover" 
                    transition="all 0.3s ease-in-out" 
                    layout="fill" 
                    filter="grayscale(100%) contrast(95%) brightness(30%)"
                    _hover={{
                        filter:"grayscale(0%) contrast(110%) brightness(100%)"
                    }}
                    />
                    </Box>
                    <Box p={3} maxWidth="450px">
                        
                        <Text mx={10} fontSize="2xl" textAlign="justify">
                        Nossa história se mistura com o pioneirismo do comércio de automóveis na zona leste de São Paulo inspirando <strong style={{color:"#ECC94B"}}>confiança e qualidade</strong> aos nossos clientes, 
                        iniciamos com nossa sede própria no ano de 1986 que se mantém até hoje.
                        </Text>

                    </Box>
                </Box>

                <Box p={5} as={Flex} direction="row" width="100%" flex="1"  alignItems="center">
                    
                    <Box  p={3}  maxWidth="450px">
                        <Text mx={10} fontSize="2xl" textAlign="justify">
                        Fundamentamos nossa fé em Deus e colocamos nossa expectativa no trabalho árduo que desenvolvemos ao longo desses mais de 30 anos no mercado automobilístico, 
                        somos referência em nossa região tanto para nossos clientes quanto para os nossos parceiros.
                        </Text>
                    </Box>

                    <Box position="relative" width="100%" height="450px" >
                        <ChakraImage as={Image} src="/img/historia2.jpg" 
                        objectFit="cover" 
                        transition="all 0.3s ease-in-out" 
                        layout="fill" 
                        filter="grayscale(100%) contrast(95%) brightness(30%)"
                        _hover={{
                        filter:"grayscale(0%) contrast(110%) brightness(100%)"
                        }}
                        />
                    </Box>
                </Box>

                <Box p={5} as={Flex} direction="row" width="100%" flex="1" alignItems="center">
                    <Box position="relative" width="100%" height="650px" >
                    <ChakraImage as={Image} 
                    src="/img/historia3.jpg"
                    objectFit="cover" 
                    transition="all 0.3s ease-in-out" 
                    layout="fill" 
                    filter="grayscale(100%) contrast(95%) brightness(30%)"
                    _hover={{
                        filter:"grayscale(0%) contrast(110%) brightness(100%)"
                    }}
                    />
                    </Box>
                    <Box  p={3}  maxWidth="450px">
                        <Text mx={10} fontSize="2xl" textAlign="justify">
                        Aqui na Auto Certo Cars, você encontra, além das melhores ofertas e veículos, o melhor atendimento que sempre estará alinhado com as suas necessidades e expectativas. 
                        Quer trocar seu carro? Ou realizar o sonho de um carro novo? Vem para a <strong style={{color:"#ECC94B"}}>Auto Certo!</strong>
                        </Text>
                    </Box>
                </Box>

            </VStack>
            
            </Grid>

            </Stack>
            

            
            </Stack>
    )
}