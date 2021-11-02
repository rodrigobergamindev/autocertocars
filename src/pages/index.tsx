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
import {api} from '../services/api'



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

            <a href="https://ul.waze.com/ul?place=ChIJQZ6RW19hzpQR-JEo6pwBfnw&ll=-23.51520590%2C-46.45910690&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location" target="_blank">
            
            <Box
            as="iframe"
            src="https://embed.waze.com/iframe?zoom=15&lat=-23.515206&lon=-46.459107&pin=1&desc=1&ct=livemap"
            height="400px"
            width="100%"
            />
            </a>
            <Footer/>
            
        </Box>
    )
}



export const getStaticProps: GetStaticProps = async (context) => {

    
    const response = await api.get('/anuncios/get', {
        method: "GET",
      })

    const response_feed = await fetch(process.env.URL_ACCESS)

    const data = await response_feed.json()
    const feed = await data.data
    

    const anuncios = await response.data
    
    return {
      props: {
          anuncios,
          feed
      }
    }
  }

