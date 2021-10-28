import { HStack, VStack, Icon, Grid, Box, Flex, Image as ChakraImage, Divider, Text, Button, Stack, Heading, StackDivider} from '@chakra-ui/react'

import Image from 'next/image'
import {RiInstagramLine} from 'react-icons/ri'

export default function Feed() {

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

            
            <Stack  maxWidth="1480px" width="100%" flex="1" direction="column" spacing="15">

            <Grid borderRadius="5px" gap={10} templateColumns="repeat(2,1fr)" width="100%" h="250px" bg="gray.900" p={10}>
                <VStack spacing="7">
                    <Heading alignSelf="flex-start" fontSize="5xl" fontWeight="normal">Conheça o nosso <strong>Instagram</strong></Heading>
                    
                    <Text alignSelf="flex-start" fontSize="2xl" >Fique sempre por dentro das nossas novidades em primeira mão!</Text>
                </VStack>

                <Flex align="center" justify="center">
                    <Button leftIcon={<Icon as={RiInstagramLine} fontSize="40"/>}  p={10} size="lg" fontSize="2xl" fontWeight="black" color="gray.900" backgroundColor="gray.50">@autocertocars</Button>
                </Flex>
            </Grid>

            <Stack width="100%" height="250px" bg="blue.400">2</Stack>


            </Stack>
              
            </Stack>
    )
}