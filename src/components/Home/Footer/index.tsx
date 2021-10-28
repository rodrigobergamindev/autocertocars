import { HStack, VStack, Icon, Grid, Box, Flex, Image as ChakraImage, Divider, Text, Button, Stack, Heading, StackDivider} from '@chakra-ui/react'

import Image from 'next/image'
import { HiLocationMarker } from 'react-icons/hi'
import { RiFacebookBoxFill, RiInstagramFill, RiInstagramLine, RiMailLine, RiWhatsappFill, RiWhatsappLine } from 'react-icons/ri'
import Logo from '../Header/Logo'



export default function Footer() {

    return (
        <Stack 
           spacing={10} 
            align="center" 
            justify="center"
            w="100%"
            flexDirection="column"
            backgroundColor="gray.900"
            p={20}
            maxWidth="1400"
            alignItems="center"
            justifyContent="center"
            border="solid"
            alignSelf="center"
            >

            <HStack>
                <VStack alignItems="flex-start">
                    <Logo size={300}/>
                    <StackDivider/>
                    <StackDivider/>
                    <StackDivider/>
                    <StackDivider/>
                    <Box as={VStack}   alignItems="flex-start">
                        <Heading fontWeight="bold" color="gray.50" fontSize="lg" letterSpacing={3} color="yellow.400" >FUNCIONAMENTO</Heading>
                        <Text>Segunda à Sexta - 09:00 às 18:00</Text>
                        <Text>Sábado - 10:00 às 15:00</Text>
                        <HStack>
                        <Icon as={HiLocationMarker} color="yellow.400" fontSize="20"/><Text fontSize="15">Av. do Imperador, 4550 - São Miguel Paulista, São Paulo - SP, 08050-000</Text>
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
                        <Icon as={RiWhatsappLine} color="yellow.400" fontSize="20"/><Text>11 99999-9999</Text>
                        </HStack>
                        <StackDivider/>
                        <StackDivider/>
                        <StackDivider/>
                        <StackDivider/>
                        <StackDivider/>
                        <HStack>
                        <Icon as={RiInstagramFill} color="gray.300" fontSize="20"/>
                        <Icon as={RiFacebookBoxFill} color="gray.300" fontSize="20"/>
                        <Icon as={RiWhatsappFill} color="gray.300" fontSize="20"/>

                        </HStack>
                       
                        <StackDivider/>
                        <StackDivider/>
                        <StackDivider/>
                        <StackDivider/>
                    </Box>
                </VStack>

                
            </HStack>
            </Stack>
    )
}