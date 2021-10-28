import { Box, Flex, Icon, IconButton} from '@chakra-ui/react'

import {RiMenuLine} from 'react-icons/ri'
import { useSidebarDrawer } from '../contexts/SidebarDrawerContext'
import { GetStaticProps } from 'next'

import Header from '../components/Home/Header/index'
import Drawer from '../components/Drawer/index'
import VehicleSection from '../components/Section/Veiculos'
import About from '../components/Section/About/index'
import Feed from '../components/Section/Feed/index'
import Vender from '../components/Section/Vender/index'
import Footer from '../components/Home/Footer/index'


export default function Home({anuncios, feed}) {

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
            <Feed feed={feed}/>
            <Vender/>

            
            <Box
            as="iframe"
            src="https://embed.waze.com/iframe?zoom=25&lat=-23.515206&lon=-46.459107&pin=1&desc=1&ct=livemap"
            height="400px"
            />

            <Footer/>
        </Box>
    )
}



export const getStaticProps: GetStaticProps = async (context) => {

    
    const response = await fetch('http://localhost:3000/api/anuncios/get', {
        method: "GET"
    })

    const response_feed = await fetch(process.env.URL_ACCESS)

    const data = await response_feed.json()
    const feed = await data.data
    

    const anuncios = await response.json()
    
    return {
      props: {
          anuncios,
          feed
      }
    }
  }

