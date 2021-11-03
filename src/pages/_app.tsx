import {AppProps} from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import SidebarDrawerProvider, {useSidebarDrawer} from '../contexts/SidebarDrawerContext'
import {Provider as NextAuthProvider} from 'next-auth/client'
import Footer from '../components/Home/Footer/index'
import Drawer from '../components/Drawer/index'
import IconDrawer from '../components/Drawer/IconDrawer'
import {useRouter} from 'next/router'

import { Icon, IconButton} from '@chakra-ui/react'
import {RiMenuLine} from 'react-icons/ri'

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
      <Footer/>
      </SidebarDrawerProvider>
    </ChakraProvider>
    </NextAuthProvider>
  )
}

export default MyApp
