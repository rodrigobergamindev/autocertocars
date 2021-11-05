import { Box, Flex, Button, Stack, Heading, List, ListItem, HStack, Text, VStack} from '@chakra-ui/react'
import Logo from './Logo'
import SearchBox from './SearchBox'
import {useState} from 'react'



export default function Header({anuncios}) {

    const [anunciosToShow, setAnuncios] = useState(anuncios)

    const filterBySearch = valueToSearch => {
       
    
        const search = valueToSearch.toUpperCase()
        
        if(search !== ''){
            
            const carrosSearched = anuncios.filter(anuncio => anuncio.name.toUpperCase().includes(search))
            setAnuncios(carrosSearched)
        }

        if(search === '') {
            setAnuncios([])
        }
      }

     

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
                    <VStack width="100%">
                    <SearchBox filter={filterBySearch}/>
                    <Box as={Flex} bg="gray.50" width="100%" height="100%">
                        <List>
                            {anunciosToShow.map(anuncio => (
                                <ListItem>
                                    <HStack>
                                        <Text fontWeight="bold" color="gray.500" fontSize="lg">{`${anuncio.name} ${anuncio.versao} ${anuncio.potencia} ${anuncio.ano_fabricacao}`}</Text>
                                    </HStack>
                                </ListItem>
                            ))}
                        </List>
                    
                    </Box>
                    </VStack>
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