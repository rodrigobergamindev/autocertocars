import { HStack, VStack, Icon, Grid, Box, Flex, Image as ChakraImage, Divider, Text, Button, Stack, Heading, StackDivider} from '@chakra-ui/react'

import Image from 'next/image'
import {FaRegHandshake, FaCar} from 'react-icons/fa'
import {GiBrazil, GiPayMoney, GiReceiveMoney, GiTakeMyMoney} from 'react-icons/gi'
import { RiRefreshLine } from 'react-icons/ri'
import {IoIosCash, IoIosDocument} from 'react-icons/io'
import CountUp from 'react-countup';


export default function About() {

    return (
        <Stack bg="gray.50" spacing={-1} border="none" outline="none" mt={[-3,-2]}>
              <svg xmlns="http://www.w3.org/2000/svg" style={{lineHeight:0, marginTop:"-2px"}} viewBox="0 0 1440 320"><path fill="#181B23" fillOpacity="1" d="M0,96L60,133.3C120,171,240,245,360,266.7C480,288,600,256,720,218.7C840,181,960,139,1080,106.7C1200,75,1320,53,1380,42.7L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
        <Stack 
           spacing={10} 
            align="center" 
            justify="center"
            w="100%"
            mt={[-2,0]}
            p={[0,20]}
            flexDirection="column"
            backgroundColor="gray.900"
            backgroundImage="/img/bg.png"
            backgroundAttachment="scroll"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundPosition="center"
            
            >
          
            
                <Box as={Flex} py={[10,0]} px={[5,0]} width="100%" maxWidth="750px"  flexDirection="column" align="center" justify="center" alignSelf="center">
                
                
                <Heading as="i" fontWeight="light" letterSpacing={3} fontSize={["3xl","5xl"]}  color="gray.50" zIndex={2}>
                    SOBRE
                </Heading>
                <Heading as="i" letterSpacing={4}  color="yellow.400" alignSelf="center" fontSize={["3xl","6xl"]} fontWeight="black">AUTO CERTO CARS</Heading>

                </Box>
               <Flex width="100%" direction="column" p={[5,0]} maxWidth="1480px">

               <Grid placeContent="center" placeItems="center" flex="1" gap={[100,0]} templateColumns={["repeat(1,1fr)","repeat(2, 1fr)"]}>
                   <Stack direction="column" w="100%" h="100%" spacing="16"  p={[0,10]}>

                   <Heading fontWeight="bold" color="yellow.400" fontSize={["2xl","3xl"]} letterSpacing={8}>VALORES</Heading>
                    <Stack w="100%" direction="column" align="flex-start" >

                        <Heading fontWeight="bold" color="yellow.400" fontSize={["xl","3xl"]} letterSpacing={8}>VISÃO</Heading>
                        <Text fontSize="17">Nossa visão é de sempre proporcionar um bom negócio</Text>
                        <StackDivider/>
                        <StackDivider/>
                      
                        <Box
                        as={Stack}
                        direction="row"
                        align="center"
                        justify="center"
                        spacing="5"
                        flex="1"
                        >
                        
                        <Icon as={FaRegHandshake} fontSize="60"/>
                        
                        <VStack>
                            <Text letterSpacing={7} fontSize={["md","xl"]} fontWeight="light">CLIENTES SATISFEITOS</Text>
                            <Heading alignSelf="flex-start" fontSize={["xl","2xl"]} color="yellow.400" letterSpacing={2}><CountUp end={3600} duration={400/60}/></Heading>
                        </VStack>
                        </Box>
                    </Stack>

                    <Stack w="100%" direction="column" align="flex-start">

                        <Heading fontWeight="bold" color="yellow.400" fontSize={["xl","3xl"]} letterSpacing={8}>MISSÃO</Heading>
                        <Text fontSize="17">Bom negócio já é garantido, excelente negócio é nossa obrigação</Text>
                        <StackDivider/>
                        <StackDivider/>
                      
                        <Box
                        as={Stack}
                        direction="row"
                        align="center"
                        justify="center"
                        spacing="5"
                        >
                        
                        <Icon  as={FaCar} fontSize="60"/>
                        
                        <VStack>
                            <Text letterSpacing={7} fontSize={["md","xl"]} fontWeight="light">CARROS VENDIDOS</Text>
                            <Heading alignSelf="flex-start" fontSize={["xl","2xl"]} color="yellow.400" letterSpacing={2}>+<CountUp end={3000} duration={400/60}/></Heading>
                        </VStack>
                        </Box>
                    </Stack>

                    
                    <Stack w="100%" direction="column" align="flex-start">

                        <Heading fontWeight="bold" color="yellow.400" fontSize={["xl","3xl"]} letterSpacing={8}>DESAFIO</Heading>
                        <Text fontSize="17">Nosso maior desafio e satisfação é a realização do seu sonho e a sua conquista</Text>
                        <StackDivider/>
                        <StackDivider/>
                      
                        <Box
                        as={Stack}
                        direction="row"
                        align="center"
                        justify="center"
                        spacing="5"
                        >
                        
                        <Icon as={GiBrazil} fontSize="60"/>
                        
                        <VStack>
                            <Text letterSpacing={7} fontSize={["md","xl"]} fontWeight="light">ESTADOS ALCANÇADOS</Text>
                            <Heading alignSelf="flex-start" fontSize={["xl","2xl"]} color="yellow.400" letterSpacing={2}><CountUp end={15} duration={400/60}/></Heading>
                        </VStack>
                        </Box>
                    </Stack>

                   
                    </Stack>

                <Stack direction="column" w="100%" h="100%" spacing="16"  p={[0,10]}>
                    

                <Heading fontWeight="bold" color="yellow.400" fontSize={["2xl","3xl"]} letterSpacing={8}>NOSSOS SERVIÇOS</Heading>

                <HStack spacing={["5","12"]} justify="flex-start" align="center">

                <Icon border="1px solid" borderColor="gray.50" borderRadius="full" p={2} color="yellow.400" as={GiReceiveMoney} fontSize="50"/>
                <Text fontSize={["lg","2xl"]} fontWeight="bold" letterSpacing={2}>VENDA</Text>

                </HStack>

                <HStack spacing={["5","12"]} justify="flex-start" align="center">

                <Icon border="1px solid" borderColor="gray.50" borderRadius="full" p={2} color="yellow.400" as={RiRefreshLine} fontSize="50"/>
                <Text fontSize={["lg","2xl"]} fontWeight="bold" letterSpacing={2}>TROCA</Text>

                </HStack>

                <HStack spacing={["5","12"]} justify="flex-start" align="center">

                <Icon border="1px solid" borderColor="gray.50" borderRadius="full" p={2} color="yellow.400" as={GiTakeMyMoney} fontSize="50"/>
                <Text fontSize={["lg","2xl"]} fontWeight="bold" letterSpacing={2}>TROCA COM TROCO</Text>

                </HStack>

                <HStack spacing={["5","12"]} justify="flex-start" align="center">

                <Icon border="1px solid" borderColor="gray.50" borderRadius="full" p={2} color="yellow.400" as={IoIosDocument} fontSize="50"/>
                <Text fontSize={["lg","2xl"]} fontWeight="bold" letterSpacing={2}>SERVIÇOS DE DESPACHANTE</Text>

                </HStack>

                <HStack spacing={["5","12"]} justify="flex-start" align="center">

                <Icon border="1px solid" borderColor="gray.50" borderRadius="full" p={2} color="yellow.400" as={IoIosCash} fontSize="50"/>
                <Text fontSize={["lg","2xl"]} fontWeight="bold" letterSpacing={2}>FINANCIAMENTO</Text>

                </HStack>
                
                <HStack spacing={["5","12"]} justify="flex-start" align="center">

                <Icon border="1px solid" borderColor="gray.50" borderRadius="full" p={2} color="yellow.400" as={GiPayMoney} fontSize="50"/>
                <Text fontSize={["lg","2xl"]} fontWeight="bold" letterSpacing={2}>REFINANCIAMENTO</Text>

                </HStack>

                   
                </Stack>

                
                </Grid>

                <Grid 
            templateColumns="repeat(1,1fr)"
            w="100%"
            maxW="1400px"
            mb={["2rem",150]}
            p={[0,6]}
            gap={10}
            mt={["5rem","0"]}
            >  

           
                <HStack width="100%">

               <Divider orientation="horizontal"  />
               <VStack align="center">
                    <Text fontSize={["4xl","7xl"]} as="i" fontWeight="black">TRADIÇÃO</Text>
                    
                    <Text fontSize={["4xl","7xl"]} color="#48BB78" fontWeight="light">CONFIANÇA</Text>
                   
                </VStack>
                <Divider  orientation="horizontal" />
                </HStack>
           

                <VStack align="center" justify="center">
                
                <Box p={5} as={Flex} direction={["column","row"]} justifyContent="center" width="100%" flex="1" alignItems="center">
                    <Box position="relative"  width={["100%","650px"]} height={["250px","450px"]}>
                    <ChakraImage as={Image} src="/img/historia1.jpg" 
                    objectFit="cover" 
                    transition="all 0.3s ease-in-out" 
                    layout="fill" 
                    filter={["grayscale(0%) contrast(110%) brightness(100%)","grayscale(100%) contrast(95%) brightness(30%)"]}
                    _hover={{
                        filter:"grayscale(0%) contrast(110%) brightness(100%)"
                    }}
                    priority
                    />
                    </Box>
                    <Box mx={[0,10]} p={[0,3]} py={[3,0]} as={VStack} alignItems="flex-start" spacing={[7,10]} maxWidth="450px">
                        <Heading fontWeight="black" fontSize={["3xl","5xl"]}>1986</Heading>
                        <Text fontSize={["md","2xl"]} textAlign="justify">
                        Nossa história se mistura com o pioneirismo do comércio de automóveis na zona leste de São Paulo inspirando <strong style={{color:"#ECC94B"}}>confiança e qualidade</strong> aos nossos clientes, 
                        iniciamos com nossa sede própria no ano de 1986 que se mantém até hoje.
                        </Text>

                    </Box>
                </Box>

                <Box p={5} as={Flex} direction={["column-reverse","row"]} justifyContent="center"  width="100%" flex="1"  alignItems="center">
                    
                    <Box  p={[0,3]} py={[5,0]}  maxWidth="450px">
                        <Text mx={[0,10]} fontSize={["md","2xl"]} textAlign="justify">
                        Fundamentamos nossa fé em Deus e colocamos nossa expectativa no trabalho árduo que desenvolvemos ao longo desses mais de 30 anos no mercado automobilístico, 
                        somos referência em nossa região tanto para nossos clientes quanto para os nossos parceiros.
                        </Text>
                    </Box>

                    <Box position="relative"  width={["100%","650px"]} height={["250px","450px"]}>
                        <ChakraImage as={Image} src="/img/historia2.jpg" 
                        objectFit="cover" 
                        transition="all 0.3s ease-in-out" 
                        layout="fill" 
                        filter={["grayscale(0%) contrast(110%) brightness(100%)","grayscale(100%) contrast(95%) brightness(30%)"]}
                        _hover={{
                        filter:"grayscale(0%) contrast(110%) brightness(100%)"
                        }}
                        priority
                        />
                    </Box>
                </Box>

                <Box p={5} as={Flex} direction={["column","row"]} justifyContent="center"  width="100%" flex="1" alignItems="center">
                    <Box position="relative" width={["100%","650px"]} height={["250px","450px"]}>
                    <ChakraImage as={Image} 
                    src="/img/historia3.jpg"
                    objectFit="cover" 
                    transition="all 0.3s ease-in-out" 
                    layout="fill" 
                    filter={["grayscale(0%) contrast(110%) brightness(100%)","grayscale(100%) contrast(95%) brightness(30%)"]}
                    _hover={{
                        filter:"grayscale(0%) contrast(110%) brightness(100%)"
                    }}
                    priority
                    />
                    </Box>
                    <Box mx={[0,10]} p={[0,3]} py={[3,0]} as={VStack} alignItems="flex-start" spacing={[7,10]} maxWidth="450px">
                        <Heading fontWeight="black" fontSize={["3xl","5xl"]}>2021</Heading>
                        <Text fontSize={["md","2xl"]} textAlign="justify">
                        Aqui na Auto Certo Cars, você encontra, além das melhores ofertas e veículos, o melhor atendimento que sempre estará alinhado com as suas necessidades e expectativas. 
                        Quer trocar seu carro? Ou realizar o sonho de um carro novo? Vem para a <strong style={{color:"#ECC94B"}}>Auto Certo!</strong>
                        </Text>
                    </Box>
                </Box>

            </VStack>
            
            </Grid>
               </Flex>

        

            </Stack>
            

            
            </Stack>
    )
}