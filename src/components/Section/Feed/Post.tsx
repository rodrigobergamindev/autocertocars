import {Icon, Image as ChakraImage, Stack} from '@chakra-ui/react'

import "swiper/css";
import {useState} from 'react'
import {RiInstagramLine} from 'react-icons/ri'
import Image from 'next/image'

interface PostProps {
    post: {
        media_type: string;
        permalink: string;
        media_url: string;
        id: string;
    }
    
}



export default function Post({post}: PostProps) {

  
    const[iconVisible, setVisible] = useState(false)


   
    return (
        <a href={post.permalink} target="_blank">
        <Stack position="relative"alignItems="center" width="100%" height="100%"justifyContent="center">
                    
                    <ChakraImage
                              as={Image}
                               src={post.media_url}
                               layout="fill"
                               alt="post"
                               priority
                               objectFit="cover"
                               transition="all 0.3s ease-in-out"
                               width="100%"
                               height="100%"
                               onMouseOver={() => setVisible(true)}
                               onMouseLeave={() => setVisible(false)}
                               transform={!!iconVisible? "scale(1.1)" : "none"}
                               filter={!!iconVisible? "brightness(0.7)" : "none"}
                               _hover={{
                                transform: "scale(1.1)",
                                filter: "brightness(0.7)"
                                }}
                               
                               />
                              <Icon onMouseOver={() => setVisible(true)} onMouseLeave={() => setVisible(false)} zIndex={2} as={RiInstagramLine} alignSelf="center" justifySelf="center" fontSize="3xl" visibility={!!iconVisible? "visible" : "hidden"}/>
              
        </Stack>
        </a>
    )
}