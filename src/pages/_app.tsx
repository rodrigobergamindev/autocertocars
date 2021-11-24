import {AppProps} from 'next/app'
import { ChakraProvider, Icon, Spinner, Box, Text } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import SidebarDrawerProvider from '../contexts/SidebarDrawerContext'
import {Provider as NextAuthProvider} from 'next-auth/client'
import Footer from '../components/Home/Footer/index'
import MenuBar from '../components/Menu/index'

import {useRouter} from 'next/router'
import Head from 'next/head'

import {RiWhatsappFill} from 'react-icons/ri'

import Drawer from '../components/Menu/Drawer/index'
import {useState, useEffect} from 'react'
import {useSession} from 'next-auth/client'

  
function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter()
  const [session] = useSession()
  const [loading, setLoading] = useState(false)

 

  useEffect(() => {
    const handleRouteChange = () => {
      
      setLoading(true)
    
      }
  
  const handleRouteOff = () => {
    
      setLoading(false)
     
  }
  
  router.events.on('routeChangeStart', handleRouteChange)
  router.events.on('routeChangeComplete', handleRouteOff)
  
  if(router.asPath.includes('dashboard') && !session) {
      router.push('/login')
  }
   
  },[])
  


  if(router.asPath.includes('dashboard')) {
    
    return (
      <NextAuthProvider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <SidebarDrawerProvider>
        <Head>
      <link rel="icon"  href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </Head>

      {!!loading ? (
       <Box display="flex" justifyContent="center" alignItems="center" zIndex={99999} position="absolute" background="gray.900" height="100vh" width="100vw">
       <Text fontSize="2xl" color="gray.50">Carregando...</Text>
       <Spinner
        thickness="2px"
        speed="0.65s"
        emptyColor="gray.900"
        color="blue.400"
        size="lg"
        ml="1rem"
        />
       
     </Box>
     ) : 
     
     (
       <Component {...pageProps} />
      )}
        </SidebarDrawerProvider>
      </ChakraProvider>
      </NextAuthProvider>
    )
  }

  return (
    

    <ChakraProvider theme={theme}>
      <SidebarDrawerProvider>
      <MenuBar/>
      <Drawer/>
      <Head>
      <link rel="icon"  href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </Head>
     
     
     {!!loading ? (
       <Box display="flex" justifyContent="center" alignItems="center" zIndex={99999} position="absolute" background="gray.50" height="100vh" width="100vw">
       <Text fontSize="2xl" color="gray.900">Carregando...</Text>
       <Spinner
        thickness="2px"
        speed="0.65s"
        emptyColor="gray.50"
        color="yellow.500"
        size="lg"
        ml="1rem"
        />
       
     </Box>
     ) : 
     
     (
       <Component {...pageProps} />
      )}

          <a 
      href="https://api.whatsapp.com/send?phone=5511963290492&text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20um%20ve%C3%ADculo."
      target="_blank"
      rel="noreferrer"
      >
        <Icon as={RiWhatsappFill}
        position="fixed"
        bottom={7}
        right={[3,10]}
        fontSize={["5xl","7xl"]}
        cursor= "pointer"
        transition= "all 0.3s ease-out"
        color="gray.50"
        backgroundColor="#38A169"
        borderRadius={["10px","20px"]}
        boxShadow="0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
        p={[2,3]}
        zIndex={20}
        _hover={{
          transform: "translateY(-10%)"
        }}
        /></a>
        
      <Footer/>
      </SidebarDrawerProvider>
    </ChakraProvider>
    
  )
}

export default MyApp
