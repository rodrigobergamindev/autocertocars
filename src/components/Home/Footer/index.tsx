import {HStack, VStack, Icon, Box,Text, Stack, Heading, StackDivider, useBreakpointValue} from '@chakra-ui/react'


import { HiLocationMarker } from 'react-icons/hi'
import { RiFacebookBoxFill, RiInstagramFill, RiMailLine, RiTelegramFill, RiTelegramLine, RiWhatsappFill, RiWhatsappLine, RiPhoneFill } from 'react-icons/ri'
import { SiTelegram } from 'react-icons/si'
import Logo from '../Header/Logo'
import Link from 'next/link'


import {MdCopyright} from 'react-icons/md'

export default function Footer() {


    const isWideVersion = useBreakpointValue ({
        base: false,
        lg: true
    })


    return (
        <>
            <HStack align="center" justify="center" spacing={20} p={2} bg="blackAlpha.400" >
            
            <HStack>       
            <Icon as={HiLocationMarker} color="yellow.400" fontSize={["15","20"]}/><a href="https://ul.waze.com/ul?place=ChIJQZ6RW19hzpQR-JEo6pwBfnw&ll=-23.51520590%2C-46.45910690&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location" target="_blank" rel="noreferrer">
            <Text fontSize={["12","15"]}>Av. do Imperador, 4550 - São Miguel Paulista, São Paulo - SP</Text></a>
            </HStack>
            {!!isWideVersion && <HStack alignSelf={["center","flex-end"]} justifySelf="flex-end">
                        <a href="https://www.instagram.com/autocertocars/"rel="noreferrer" target="_blank"><Icon as={RiInstagramFill} color="gray.300" fontSize="20" transition="all 0.3s ease-in-out" _hover={{color:"#B83280", transform:"rotateZ(360deg)"}}/></a>
                        <a href="https://www.facebook.com/autocertocars/"rel="noreferrer" target="_blank"><Icon as={RiFacebookBoxFill} color="gray.300" fontSize="20" transition="all 0.3s ease-in-out" _hover={{color:"#3182CE", transform:"rotateZ(360deg)"}}/></a>
                        <a href="https://api.whatsapp.com/send?phone=5511963290492&text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20um%20ve%C3%ADculo."rel="noreferrer" target="_blank"><Icon as={RiWhatsappFill} color="gray.300" fontSize="20" transition="all 0.3s ease-in-out" _hover={{color:"#48BB78", transform:"rotateZ(360deg)"}}/></a>
                        <a href="https://api.whatsapp.com/send?phone=5511963290492&text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20um%20ve%C3%ADculo."rel="noreferrer" target="_blank"><Icon as={SiTelegram} color="gray.300" fontSize="20" transition="all 0.3s ease-in-out" _hover={{color:"#00B5D8", transform:"rotateZ(360deg)"}}/></a>
            </HStack>}
        </HStack>
            <Box
            as="iframe"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14633.922933544845!2d-46.4591069!3d-23.5152059!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x7c7e019cea2891f8!2sAuto%20Certo%20Cars!5e0!3m2!1spt-BR!2sbr!4v1637586878987!5m2!1spt-BR!2sbr"
            height="400px"
            width="100%"
            flex="1"
            />
           
        <Stack 
            align="center" 
            justify="space-between"
            flexDirection="column"
            backgroundColor="gray.900"
            width="100%"
            alignSelf="center"
            >
            
            {!!isWideVersion && <HStack justify="space-between" align="flex-start" spacing={20} py={10}>
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

            
            </HStack> }
            
            {!isWideVersion && <VStack justify="space-between" align="flex-start" spacing={[10,20]} py={10}>
                <VStack alignItems="flex-start" spacing={["3rem",8]}>
                    <Logo size={300}/>
                   

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


    
            </VStack>}
            
            </Stack>
        <Stack spacing={0}>

        

        <HStack align="center" justify="center" spacing={20} p={2} bg="blackAlpha.400" >
            
            <HStack>       
           
            <Text fontSize={["12","15"]} align="center">Reservamo-nos o direito a corrigir qualquer erro de digitação ou mudar o anúncio sem aviso prévio</Text>
            {!!isWideVersion && <Icon as={MdCopyright} color="yellow.400" fontSize={["15","20"]}/>}
            </HStack>

        </HStack>

        
        </Stack>
            </>
    )
}