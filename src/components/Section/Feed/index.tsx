import { HStack, VStack, Icon, Grid, Box, Flex, Image as ChakraImage, Divider, Text, Button, Stack, Heading, StackDivider, useBreakpointValue} from '@chakra-ui/react'

import Image from 'next/image'
import {RiInstagramLine} from 'react-icons/ri'
import {useState, useEffect} from 'react'

import Post from './Post'
import Slider from "react-slick";
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md'

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

    const isWideVersion = useBreakpointValue ({
        base: false,
        lg: true
    })

    const settings = {
        infinite: true,
        slidesToShow: !!isWideVersion? 4 : 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 2500,
        cssEase: "ease",
        arrows: !!isWideVersion && true,
        nextArrow: <Icon as={MdKeyboardArrowRight} fontSize="40" color="gray.500" _hover={{color:'gray.500'}}/>,
        prevArrow: <Icon as={MdKeyboardArrowLeft} fontSize="40" color="gray.500"  _hover={{color:'gray.500'}}/>
    }

      

    useEffect(() => { 
        setwinReady(true)
    }, [])


    if(!feed) return null
   
    return (
        <Stack 
           spacing={10} 
            align="center" 
            justify="center"
            w="100%"
            p={[5,20]}
            flexDirection="column"
            backgroundColor="gray.50"
            >

            
           {!!winReady &&  <Stack  maxWidth="1480px" width="100%" flex="1" direction="column" spacing="15">

        <Grid borderRadius="5px" gap={10} templateColumns={["repeat(1,1fr)","repeat(2, 1fr)"]} width="100%"  bg="gray.900" p={10}>
            <VStack spacing="7">
        <Heading alignSelf="flex-start" fontSize={["2xl","4xl"]} fontWeight="normal">Conheça o nosso <strong>Instagram</strong></Heading>
        
            <Text alignSelf="flex-start" fontSize={["lg","2xl"]} >Fique sempre por dentro das nossas novidades em primeira mão!</Text>
        </VStack>

        <Flex align="center" justify="center">
            <a href="https://www.instagram.com/autocertocars/" target="_blank" rel="noreferrer"><Button leftIcon={<Icon as={RiInstagramLine} fontSize={["30","40"]}/>}  p={[5,10]} size="lg" fontSize="2xl" fontWeight="black" color="gray.900" backgroundColor="gray.50">@autocertocars</Button></a>
        </Flex>
        </Grid>

        <Box width="100%">
        <Slider {...settings}>
        {
            feed.map(post => {
                
                return (
                <Box p={3} width="100%" key={post.id}>
                   <Post post={post}/>
                </Box>
                )
                
            })
        }
        </Slider>
        </Box>


        </Stack> }
              
            </Stack>
    )
}