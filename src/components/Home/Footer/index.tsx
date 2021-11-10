import { HStack, VStack, Icon, Box,Text, Stack, Heading, StackDivider} from '@chakra-ui/react'


import { HiLocationMarker } from 'react-icons/hi'
import { RiFacebookBoxFill, RiInstagramFill, RiMailLine, RiTelegramFill, RiTelegramLine, RiWhatsappFill, RiWhatsappLine, RiPhoneFill } from 'react-icons/ri'
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

                    <Box as={VStack} alignItems="flex-start">
                        <Heading fontWeight="bold" fontSize="lg" letterSpacing={3} color="yellow.400" >ATENDIMENTO</Heading>
                        <Text>Segunda à Sexta - 09:00 às 18:00</Text>
                        <Text>Sábado - 10:00 às 15:00</Text>

                        
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
                        <Icon as={RiWhatsappLine} color="yellow.400" fontSize="20"/><Text>(11) 96329-0492</Text>
                        </HStack>
                     
                        <HStack>
                        <Icon as={RiPhoneFill} color="yellow.400" fontSize="20"/><Text>(11) 4277-1012</Text>
                        </HStack>
                       

                        
                    </Box>
                </VStack>

                
          
                <VStack alignItems="flex-start" spacing={12}>
                
                       
                    <Box as={VStack}  alignItems="flex-start">
                   
         
                        <Heading fontWeight="bold" color="yellow.400" fontSize="lg" letterSpacing={3}>MAPA DO SITE</Heading>
                        <StackDivider/>
                        <StackDivider/>

                        <Link href="/" passHref>
                        <HStack cursor="pointer" transition="all 0.3s ease-in-out" _hover={{color:"yellow.400"}}>
                        <Text>Home</Text>
                        </HStack>
                        </Link>

                        <Link href="/anuncios" passHref>
                        <HStack cursor="pointer" transition="all 0.3s ease-in-out" _hover={{color:"yellow.400"}}>
                        <Text>Veículos</Text>
                        </HStack>
                        </Link>

                        <Link href="/dashboard" passHref>
                        <HStack cursor="pointer" transition="all 0.3s ease-in-out" _hover={{color:"yellow.400"}}>
                        <Text>Dashboard</Text>
                        </HStack>
                        </Link>
                        
                        
                    </Box>
                
                </VStack>

            
            </HStack>
            </Stack>
        <Stack>
        <HStack align="center" justify="center" spacing={20} p={2} bg="blackAlpha.400" >
            
            <HStack>       
            <Icon as={HiLocationMarker} color="yellow.400" fontSize="20"/><a href="https://ul.waze.com/ul?place=ChIJQZ6RW19hzpQR-JEo6pwBfnw&ll=-23.51520590%2C-46.45910690&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location" target="_blank" rel="noreferrer">
            <Text fontSize="15">Av. do Imperador, 4550 - São Miguel Paulista, São Paulo - SP, 08050-000</Text></a>
            </HStack>
            <HStack alignSelf="flex-end" justifySelf="flex-end">
                        <a href="https://www.instagram.com/autocertocars/"rel="noreferrer" target="_blank"><Icon as={RiInstagramFill} color="gray.300" fontSize="20" transition="all 0.3s ease-in-out" _hover={{color:"#B83280", transform:"rotateZ(360deg)"}}/></a>
                        <a href="https://www.facebook.com/autocertocars/"rel="noreferrer" target="_blank"><Icon as={RiFacebookBoxFill} color="gray.300" fontSize="20" transition="all 0.3s ease-in-out" _hover={{color:"#3182CE", transform:"rotateZ(360deg)"}}/></a>
                        <a href="https://api.whatsapp.com/send?phone=5511963290492&text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20um%20ve%C3%ADculo."rel="noreferrer" target="_blank"><Icon as={RiWhatsappFill} color="gray.300" fontSize="20" transition="all 0.3s ease-in-out" _hover={{color:"#48BB78", transform:"rotateZ(360deg)"}}/></a>
                        <a href="https://api.whatsapp.com/send?phone=5511963290492&text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20um%20ve%C3%ADculo."rel="noreferrer" target="_blank"><Icon as={SiTelegram} color="gray.300" fontSize="20" transition="all 0.3s ease-in-out" _hover={{color:"#00B5D8", transform:"rotateZ(360deg)"}}/></a>
            </HStack>
             
        </HStack>
        </Stack>
            </>
    )
}