import { Flex, Button, Stack, Box, Text, Avatar} from '@chakra-ui/react'
import Logo from '../../components/Header/Logo'
import { useSession, signIn, signOut } from 'next-auth/client'
import { useRouter } from "next/router";
import {GetServerSideProps} from 'next'
import {getSession} from 'next-auth/client'


export default function SignIn() {

  const [session] = useSession()
  const {asPath} = useRouter()
  const URL_ERROR = '/login?error=AccessDenied#'

 

  return (
    <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center" direction="column">
      <Logo/>
      <Flex
        width="100%"
        maxWidth={360}
        p="8"
        borderRadius={8}
        flexDirection="column"
      >
        
        {asPath === URL_ERROR && (
          <Text fontSize="sm" align="center" mb="4">Acesso negado, credenciais incorretas</Text>
        )}
       <Button colorScheme="yellow" size="lg" onClick={(): Promise<void> => signIn('google', { callbackUrl: 'http://localhost:3000/dashboard' })}> Login </Button>
       {!!session && (
         <Box flex="1" p="6">  
          <Button colorScheme="yellow" size="lg" onClick={() => signOut({ callbackUrl: 'http://localhost:3000/' })}> Sair </Button>
         </Box>
    )}
      </Flex>
    </Flex>
  )
}


export const getServerSideProps: GetServerSideProps = async ({req}) => {

  const session = await getSession({req})
  
  if(session) {
      return {
          redirect: {
              destination: `/dashboard`,
              permanent: false
          }
      }
  }

  return {
    props: {}
  }
}