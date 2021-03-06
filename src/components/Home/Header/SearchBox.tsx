

import {Flex, Input, Icon} from '@chakra-ui/react'
import { RiSearchLine } from 'react-icons/ri'
import {useRef} from 'react'



export default function SearchBox ({filter}) {

    const searchInputRef = useRef<HTMLInputElement>(null)

   

    return (
        <Flex 
        as="label"
        py="4"
        px="8"
        
        maxWidth={600}
        width="100%"
        alignSelf="center"
        color="gray.700"
        bg="white"
        borderRadius="10px"
        zIndex={333}
        >

    <Input 
    color="gray.700"
    variant="unstyled"
    px="4"
    mr="4"
    placeholder="Buscar um veículo..."
    _placeholder={{color:'gray.400'}}
    ref={searchInputRef}
    
    onChange={(e) => filter(e.target.value)}
    />
    <Icon as={RiSearchLine} fontSize="25"/>
    </Flex>
    )
}