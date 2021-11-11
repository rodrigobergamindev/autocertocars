import { HStack, VStack, Icon, Grid, Box, Flex, Image as ChakraImage, Divider, Text, Button, Stack, Heading, StackDivider} from '@chakra-ui/react'

import Image from 'next/image'
import {RiInstagramLine} from 'react-icons/ri'
import {useState, useEffect} from 'react'

import Post from './Post'


type Post = {
    media_type: string;
    permalink: string;
    media_url: string;
    id: string;
}

interface Feed {
    feed: Post[]
}


export default function Feed({feed}: Feed) {

    const[winReady, setwinReady] = useState(false)


    useEffect(() => { 
        setwinReady(true)
    }, [])

   
    return (
        <Stack 
           spacing={10} 
            align="center" 
            justify="center"
            w="100%"
            p={20}
            flexDirection="column"
            backgroundColor="gray.50"
            >

            
           {!!winReady &&  <Stack  maxWidth="1480px" width="100%" flex="1" direction="column" spacing="15">

<Grid borderRadius="5px" gap={10} templateColumns="repeat(2,1fr)" width="100%" h="250px" bg="gray.900" p={10}>
    <VStack spacing="7">
        <Heading alignSelf="flex-start" fontSize="5xl" fontWeight="normal">Conheça o nosso <strong>Instagram</strong></Heading>
        
        <Text alignSelf="flex-start" fontSize="2xl" >Fique sempre por dentro das nossas novidades em primeira mão!</Text>
    </VStack>

    <Flex align="center" justify="center">
        <a href="https://www.instagram.com/autocertocars/" target="_blank" rel="noreferrer"><Button leftIcon={<Icon as={RiInstagramLine} fontSize="40"/>}  p={10} size="lg" fontSize="2xl" fontWeight="black" color="gray.900" backgroundColor="gray.50">@autocertocars</Button></a>
    </Flex>
</Grid>

<Flex height="350px" width="100%">

</Flex>


</Stack> }
              
            </Stack>
    )
}