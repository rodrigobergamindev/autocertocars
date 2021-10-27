import { Box, Flex, Icon, IconButton} from '@chakra-ui/react'
import Header from '../components/Home/Header/index'
import Drawer from '../components/Drawer/index'
import {RiMenuLine} from 'react-icons/ri'
import { useSidebarDrawer } from '../contexts/SidebarDrawerContext'
export default function Home() {

    const { onOpen } = useSidebarDrawer()
    return (
        <Box as={Flex} w="100%" direction="column">
             
            <IconButton
            aria-label="Open navigation"
            icon={<Icon as={RiMenuLine}/>}
            fontSize="40"
            variant="unstyled"
            onClick={onOpen}
            position="fixed"
            right={4}
            top={4}
            _active={{
                borderColor: "none",
              }}
            _focus={{
                borderColor: "none"
            }}
            >
            </IconButton>
            <Drawer/>
            
            <Header/>

            <Box as={Flex} align="center" justify="center" border="solid" w="100%" h="100vh">Veículos</Box>
            <Box as={Flex} align="center" justify="center" border="solid" w="100%" h="100vh">Sobre</Box>
            <Box as={Flex} align="center" justify="center" border="solid" w="100%" h="100vh">Instagram</Box>
            <Box as={Flex} align="center" justify="center" border="solid" w="100%" h="100vh">Venda seu carro</Box> 
            <Box as={Flex} align="center" justify="center" border="solid" w="100%" h="100vh">Nossos serviços</Box> 
            <Box as={Flex} align="center" justify="center" border="solid" w="100%" h="100vh">Contato</Box>
            <Box as={Flex} align="center" justify="center" border="solid" w="100%" h="30vh">Footer</Box> 
        </Box>
    )
}
