import { Box, Flex, Button, Stack, Heading, List, ListItem, HStack, Text, VStack, useBreakpointValue} from '@chakra-ui/react'
import Logo from './Logo'
import SearchBox from './SearchBox'
import {useState} from 'react'
import Link from 'next/link'




export default function Header({anuncios}) {


   
    const [anunciosToShow, setAnuncios] = useState([])

    const isWideVersion = useBreakpointValue ({
        base: false,
        lg: true
    })

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
            mt={["3.5rem","4.5rem"]}
            py={100}
            >
               
                <video
                autoPlay
                muted 
                loop
                style={{
                    height: "65rem",
                    width:"100%",
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
                p={["6","0"]}
                >
                  
                    {!!isWideVersion && <Logo size={500}/>}
                    {!isWideVersion && <Logo size={250}/>}

                    <VStack width="100%" borderRadius="10" background="white" spacing={0}>
                    <SearchBox filter={filterBySearch}/>
                    <Box as={Flex} alignSelf="flex-start" px={10}>
                        <List transition="all 0.5s ease-in-out" transformOrigin="top" transform={anunciosToShow.length !== 0 ? "scaleY(1)" : "scaleY(0)"}>
                            {anunciosToShow.map(anuncio => (
                                <ListItem key={anuncio.id} cursor="pointer" my={3} >
                                    <Link href={`/anuncios/${anuncio.slug}`}>
                                    <HStack>
                                        <Text fontWeight="bold" color="gray.900" transition="all 0.2s ease-in-out" _hover={{color:"yellow.400"}} fontSize="sm">{`${anuncio.name} ${anuncio.versao} ${anuncio.potencia} ${anuncio.ano_fabricacao}`}</Text>
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
                    <Button colorScheme="yellow" height={[30,50]} w={250} fontSize={["sm","lg"]} p={[5,3]} borderRadius="10px">VER ESTOQUE</Button>
                    </Link>
                    </Stack>
                </Stack>
                </Box>
    )
}