import { HStack, VStack, Icon, Box,Text, Stack, Heading, StackDivider} from '@chakra-ui/react'


import { HiLocationMarker } from 'react-icons/hi'
import { RiFacebookBoxFill, RiInstagramFill, RiMailLine, RiTelegramFill, RiTelegramLine, RiWhatsappFill, RiWhatsappLine } from 'react-icons/ri'
import { SiTelegram } from 'react-icons/si'
import Logo from '../Header/Logo'
import Link from 'next/link'


export default function Footer() {

    return (
        <>
                    
            <Link href="https://ul.waze.com/ul?place=ChIJQZ6RW19hzpQR-JEo6pwBfnw&ll=-23.51520590%2C-46.45910690&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location">
            
            <Box
            as="iframe"
            src="https://embed.waze.com/iframe?zoom=15&lat=-23.515206&lon=-46.459107&pin=1&desc=1&ct=livemap"
            height="400px"
            width="100%"
            flex="1"
           
            />
            </Link>
        <Stack 
            align="center" 
            justify="space-between"
            flexDirection="column"
            backgroundColor="gray.900"
            width="100%"
            alignSelf="center"
            >

            <HStack justify="space-between" align="flex-start" spacing={20} py={10}>
                <VStack alignItems="flex-start">
                    <Logo size={300}/>
                    <StackDivider/>
                    <StackDivider/>

                    <Box as={VStack}   alignItems="flex-start">
                        <Heading fontWeight="bold" fontSize="lg" letterSpacing={3} color="yellow.400" >ATENDIMENTO</Heading>
                        <Text>Segunda à Sexta - 09:00 às 18:00</Text>
                        <Text>Sábado - 10:00 às 15:00</Text>
                        <HStack>
                        
                        <Icon as={HiLocationMarker} color="yellow.400" fontSize="20"/><a href="https://ul.waze.com/ul?place=ChIJQZ6RW19hzpQR-JEo6pwBfnw&ll=-23.51520590%2C-46.45910690&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location" target="_blank" rel="noreferrer">
                            <Text fontSize="15">Av. do Imperador, 4550 - São Miguel Paulista, São Paulo - SP, 08050-000</Text></a>
                     
                        </HStack>
                    </Box>
                </VStack>

                <VStack alignItems="flex-start">
                    <Box as={VStack}  alignItems="flex-start">
                        <Heading fontWeight="bold" color="yellow.400" fontSize="lg" letterSpacing={3}>CONTATO</Heading>
                        <StackDivider/>
                        <StackDivider/>
                        <HStack>
                        <Icon as={RiMailLine} color="yellow.400" fontSize="20"/><Text>autocertocars@gmail.com</Text>
                        </HStack>

                        <HStack>
                        <Icon as={RiWhatsappLine} color="yellow.400" fontSize="20"/><Text>11 96329-0492</Text>
                        </HStack>
                     
                        
                       

                        
                    </Box>
                </VStack>

                
          
                <VStack alignItems="flex-start" spacing={5}>
                
                       
                    <Box as={VStack}  alignItems="flex-start">
                   
         
                        <Heading fontWeight="bold" color="yellow.400" fontSize="lg" letterSpacing={3}>MAPA DO SITE</Heading>
                        <StackDivider/>
                        <StackDivider/>
                        <HStack>
                        <Text>Home</Text>
                        </HStack>

                        <HStack>
                        <Text>Veículos</Text>
                        </HStack>

                        <HStack>
                        <Text>Sobre</Text>
                        </HStack>

                        <HStack>
                        <Text>Contato</Text>
                        </HStack>

                        
                        
                    </Box>

                    <HStack>
                        <Icon as={RiInstagramFill} color="gray.300" fontSize="25" transition="all 0.3s ease-in-out" _hover={{color:"#B83280", transform:"rotateZ(360deg)"}}/>
                        <Icon as={RiFacebookBoxFill} color="gray.300" fontSize="25" transition="all 0.3s ease-in-out" _hover={{color:"#3182CE", transform:"rotateZ(360deg)"}}/>
                        <Icon as={RiWhatsappFill} color="gray.300" fontSize="25" transition="all 0.3s ease-in-out" _hover={{color:"#48BB78", transform:"rotateZ(360deg)"}}/>
                        <Icon as={SiTelegram} color="gray.300" fontSize="25" transition="all 0.3s ease-in-out" _hover={{color:"#00B5D8", transform:"rotateZ(360deg)"}}/>
                        </HStack>
                
                </VStack>

            
            </HStack>
            </Stack>
            </>
    )
}