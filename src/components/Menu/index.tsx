import {HStack, Box, useBreakpointValue, Text} from "@chakra-ui/react"

import Drawer from './Drawer/index'
import IconDrawer from "./Drawer/IconDrawer"
import Logo from '../Home/Header/Logo'

export default function MenuBar() {



    const isWideVersion = useBreakpointValue ({
        base: false,
        lg: true
    })
    
    return (
        <HStack  align="center" bg="gray.50" justify="flex-end" width="100%" p={[2,4]} zIndex={10}  position="fixed" borderBottom="1px solid" borderBottomColor="gray.100">
            <Box flex="1" px={[0,20]}>
                {!!isWideVersion && <Logo size={200} logo="/img/logo2.png"/>}
                {!isWideVersion && <Logo size={120} logo="/img/logo2.png"/>}
            </Box>
                
            <IconDrawer/>
           
        </HStack>
    )
    

}