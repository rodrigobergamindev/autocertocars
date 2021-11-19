import { HStack, VStack, Grid, Box, Image as ChakraImage, Stack, Heading, useBreakpointValue} from '@chakra-ui/react'

import Image from 'next/image'
import Form from './Form'

export default function Vender() {

    const isWideVersion = useBreakpointValue ({
        base: false,
        lg: true
    })

    return (
        <Stack 
           
            align="center" 
            justify="center"
            w="100%"
            bg="gray.50"
            flexDirection="column"
            spacing={-1}
            mb={150}
            mt={-2}
            >
            <svg xmlns="http://www.w3.org/2000/svg" style={{lineHeight:0, marginTop:"-2px"}} viewBox="0 0 1440 320"><path fill="#181B23" fillOpacity="1" d="M0,160L60,181.3C120,203,240,245,360,266.7C480,288,600,288,720,240C840,192,960,96,1080,85.3C1200,75,1320,149,1380,186.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
            
            <VStack bg="gray.900"  width="100%" flex="1" mt={[-2,0]}  alignSelf="center">
                
                <VStack maxWidth="1000px" width="100%" mt={[0,"2rem"]}>
                <Heading as="i" fontWeight="light" alignSelf={["center","flex-start"]} mt={["5rem","0"]} letterSpacing={6} fontSize={["3xl","6xl"]}  color="gray.50">
                    QUER TROCAR
                </Heading>
                <Heading as="i" letterSpacing={4}  color="yellow.400" alignSelf="center" fontSize={["5xl","8xl"]} fontWeight="black">SEU CARRO?</Heading>
                </VStack>
            </VStack>

            <HStack flex="1" width="100%" bg="gray.900" align="center" justify="center">
            <Grid  mt={["2rem",20]} templateColumns={["repeat(1,1fr)","repeat(2, 1fr)"]} flex="1" width="100%" maxWidth="1400px">
                
               
                <Box
                as={VStack}
                width="100%"
                height={["100%",650]}
                position="relative"
                p={[3,6]}
                alignSelf="center"
                
                >
                    <Heading fontWeight="light" fontSize={["xl","3xl"]}>
                Aqui você realiza seu <strong style={{color:"#ECC94B"}}>sonho</strong> de carro novo com a <strong style={{color:"#ECC94B"}}>facilidade</strong> de pagamento e com a melhor avaliação do mercado!
                </Heading>
                {!!isWideVersion && <ChakraImage
                as={Image}
                layout="fill"
                src="/img/vender.png"
                objectFit="contain"
                priority
                />}
                </Box>
                
                <Box width="100%" mt={["2rem",0]} p={[2,6]}>
                    <Form/>
                </Box>  
            </Grid>
            </HStack>
            </Stack>
            
    )
}