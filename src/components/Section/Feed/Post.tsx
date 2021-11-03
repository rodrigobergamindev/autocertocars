import {Icon, Image as ChakraImage, Stack} from '@chakra-ui/react'

import "swiper/css";
import {useState} from 'react'
import {RiInstagramLine} from 'react-icons/ri'


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
        <Stack overflow="hidden" alignItems="center" justifyContent="center">
                    
                    <ChakraImage
                              
                               src={post.media_url}
                               alt="post"
                            overflow="hidden"
                               objectFit="cover"
                               transition="all 0.3s ease-in-out"
                                position="relative"
                               onMouseOver={() => setVisible(true)}
                               onMouseLeave={() => setVisible(false)}
                               transform={!!iconVisible? "scale(1.1)" : "none"}
                               filter={!!iconVisible? "brightness(0.7)" : "none"}
                               _hover={{
                                transform: "scale(1.1)",
                                filter: "brightness(0.7)"
                                }}
                               
                               />
                              <Icon position="absolute" onMouseOver={() => setVisible(true)} onMouseLeave={() => setVisible(false)} zIndex={2} as={RiInstagramLine} alignSelf="center" justifySelf="center" fontSize="3xl" visibility={!!iconVisible? "visible" : "hidden"}/>
              
        </Stack>
        </a>
    )
}