import { Box, Flex, Icon, IconButton} from '@chakra-ui/react'
import {RiMenuLine} from 'react-icons/ri'
import { useSidebarDrawer } from '../contexts/SidebarDrawerContext'
import { GetStaticProps } from 'next'

import Header from '../components/Home/Header/index'
import Drawer from '../components/Drawer/index'
import VehicleSection from '../components/Section/Veiculos'
import About from '../components/Section/About/index'
import Feed from '../components/Section/Feed/index'




export default function Home({anuncios}) {

    const { onOpen } = useSidebarDrawer()
    return (
        <Box as={Flex} w="100%" direction="column">
             
            <IconButton
            aria-label="Open navigation"
            icon={<Icon as={RiMenuLine}/>}
            color="yellow.400"
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
            <VehicleSection anuncios={anuncios}/>
            <About/>
            <Feed/>
            
            <Box as={Flex} align="center" justify="center" border="solid" w="100%" h="100vh">Venda seu carro</Box> 
            <Box as={Flex} align="center" justify="center" border="solid" w="100%" h="100vh">Nossos serviços</Box> 
            <Box as={Flex} align="center" justify="center" border="solid" w="100%" h="100vh">Contato</Box>
            <Box as={Flex} align="center" justify="center" border="solid" w="100%" h="30vh">Footer</Box> 
        </Box>
    )
}



export const getStaticProps: GetStaticProps = async (context) => {

    
    const response = await fetch('http://localhost:3000/api/anuncios/get', {
        method: "GET"
    })
    const anuncios = await response.json()
    
    return {
      props: {
          anuncios
      }
    }
  }

