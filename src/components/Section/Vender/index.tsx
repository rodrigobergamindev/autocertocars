import { HStack, VStack, Icon, Grid, Box, Flex, Image as ChakraImage, Divider, Text, Button, Stack, Heading, StackDivider} from '@chakra-ui/react'

import Image from 'next/image'
import Form from './Form'

export default function Vender() {

    return (
        <Stack 
           
            align="center" 
            justify="center"
            w="100%"
            bg="gray.50"
            flexDirection="column"
            spacing={0}
            mb={150}
            >
            <ChakraImage
                src="/img/waves.svg"
                width="100%"
                objectFit="cover"
               
               
            />
            
            <VStack bg="gray.900"  width="100%" flex="1"  alignSelf="center">
                
                <VStack maxWidth="1000px" width="100%">
                <Heading as="i" fontWeight="light" alignSelf="flex-start" letterSpacing={6} fontSize="6xl"  color="gray.50">
                    QUER TROCAR
                </Heading>
                <Heading as="i" letterSpacing={4}  color="yellow.400" alignSelf="center" fontSize="8xl" fontWeight="black">SEU CARRO?</Heading>
                </VStack>
            </VStack>

            <HStack flex="1" width="100%" bg="gray.900" align="center" justify="center">
            <Grid  mt={20} templateColumns="repeat(2,1fr)" flex="1" width="100%" maxWidth="1400px">
                
               
                <Box
                as={VStack}
                width="100%"
                height={650}
                position="relative"
                p={6}
                alignSelf="center"
                >
                    <Heading fontWeight="light" fontSize="3xl">
                Aqui você realiza seu <strong style={{color:"#ECC94B"}}>sonho</strong> de carro novo com a <strong style={{color:"#ECC94B"}}>facilidade</strong> de pagamento e com a melhor avaliação do mercado!
                </Heading>
                <ChakraImage
                as={Image}
                layout="fill"
                src="/img/vender.png"
                objectFit="contain"
                priority
                />
                </Box>
                
                <Box p={6}>
                    <Form/>
                </Box>
            </Grid>
            </HStack>
            </Stack>
            
    )
}