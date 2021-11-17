import {HStack, Box} from "@chakra-ui/react"
import {useState} from 'react'
import Drawer from './Drawer/index'
import IconDrawer from "./Drawer/IconDrawer"
import Logo from '../Home/Header/Logo'

export default function MenuBar() {

    const[active,setActive] = useState(false)
    
    return (
        <HStack  align="center" bg="gray.50" justify="flex-end" width="100%" p={4} zIndex={999}  position="fixed" borderBottom="1px solid" borderBottomColor="gray.100">
            <Box flex="1" px={20}>
            <Logo size={200} logo="/img/logo2.png"/>
            </Box>
            <IconDrawer/>
        </HStack>
    )
    

}