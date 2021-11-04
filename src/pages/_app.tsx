import {AppProps} from 'next/app'
import { ChakraProvider, Icon } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import SidebarDrawerProvider from '../contexts/SidebarDrawerContext'
import {Provider as NextAuthProvider} from 'next-auth/client'
import Footer from '../components/Home/Footer/index'
import Drawer from '../components/Drawer/index'
import IconDrawer from '../components/Drawer/IconDrawer'
import {useRouter} from 'next/router'


import {RiWhatsappFill} from 'react-icons/ri'
import Link from 'next/link'

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter()


  if(router.asPath.includes('dashboard')) {
    return (
      <NextAuthProvider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <SidebarDrawerProvider>
        <Component {...pageProps} />
        </SidebarDrawerProvider>
      </ChakraProvider>
      </NextAuthProvider>
    )
  }

  return (
    <NextAuthProvider session={pageProps.session}>
    <ChakraProvider theme={theme}>
      <SidebarDrawerProvider>
      <Drawer/>
      <IconDrawer/>
      <Component {...pageProps} />
      <Link 
      href="https://api.whatsapp.com/send?phone=5511976789680&text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20uma%20cota%C3%A7%C3%A3o%20para%20minha%20empresa.">
        <Icon as={RiWhatsappFill}
        position="fixed"
        bottom={7}
        right={10}
        fontSize="8xl"
        cursor= "pointer"
        transition= "all 0.3s ease-out"
        color="gray.50"
        backgroundColor="#38A169"
        borderRadius="20px"
        boxShadow="0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
        p={3}
        zIndex={999999}
        _hover={{
          transform: "translateY(-10%)"
        }}
        /></Link>
      <Footer/>
      </SidebarDrawerProvider>
    </ChakraProvider>
    </NextAuthProvider>
  )
}

export default MyApp
