import { Box, Flex, Button, Stack, Heading, List, ListItem, HStack, Text, VStack} from '@chakra-ui/react'
import Logo from './Logo'
import SearchBox from './SearchBox'
import {useState} from 'react'
import Link from 'next/link'




export default function Header({anuncios}) {
    
   
   
    const [anunciosToShow, setAnuncios] = useState([])

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
            mt="4rem"
            height="90vh"
            >
               
                <video
                autoPlay
                muted 
                loop
                style={{
                    minWidth:"100%",
                    height:"90vh",
                    filter: "brightness(20%)",
                    objectFit:"cover",
                    position: "absolute",
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

                    <VStack width="100%" background="white" borderRadius="10" spacing={0}>
                    <SearchBox filter={filterBySearch}/>
                    <Box zIndex={333} as={Flex} flex="1" alignSelf="flex-start" px={10}>
                        <List>
                            {anunciosToShow.map(anuncio => (
                                <ListItem key={anuncio.id} cursor="pointer" my={3} >
                                    <Link href={`/anuncios/${anuncio.slug}`}>
                                    <HStack>
                                        <Text fontWeight="bold" color="gray.900" transition="all 0.3s ease-in-out" _hover={{color:"gray.500"}} fontSize="lg">{`${anuncio.name} ${anuncio.versao} ${anuncio.potencia} ${anuncio.ano_fabricacao}`}</Text>
                                    </HStack>
                                    </Link>
                                </ListItem>
                            ))}
                        </List>
                    
                    </Box>
                    </VStack>
                    <Stack
                    direction="row"
                    spacing="5"
                    >
                    <Link href="/anuncios" passHref>
                    <Button colorScheme="yellow" height={50} w={250} fontSize="lg" size="lg" p={3} borderRadius="10px">VER ESTOQUE</Button>
                    </Link>
                    </Stack>
                </Stack>
                </Box>
    )
}