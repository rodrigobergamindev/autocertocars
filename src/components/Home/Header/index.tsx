import { Box, Flex, Button, Stack, Heading} from '@chakra-ui/react'
import Logo from './Logo'
import SearchBox from './SearchBox'




export default function Header() {

    return (
        <Box 
            as={Flex} 
            align="center" 
            justify="center"
            w="100%"
            h="90vh"
            >
               
                <video
                autoPlay
                muted 
                loop
                style={{
                    minWidth:"100%",
                    height:"90vh",
                    filter: "brightness(20%)",
                    position:"absolute",
                    objectFit:"cover",
                    zIndex: -1,
                }}
                >
                    <source src="/video/bg.mp4" type="video/mp4"/>
                   
                </video>
                
                <Stack
                
                flexDirection="column"
                justify="center"
                align="center"
                spacing={20}
                
                >
                   
                    <Logo size={600}/>
                    <SearchBox/>

                    <Stack
                    direction="row"
                    spacing="5"
                    >
                    <Button colorScheme="yellow" height={50} w={250} fontSize="xl" borderRadius="10px">Carros Novos</Button>

                    <Button colorScheme="yellow" height={50}  w={250} fontSize="xl" borderRadius="10px">Seminovos</Button>

                    </Stack>
                </Stack>
                </Box>
    )
}