import { Flex, Button, Stack, Box, Text, Avatar} from '@chakra-ui/react'
import Logo from '../../components/Header/Logo'

import { useSession, signIn, signOut } from 'next-auth/client'

export default function SignIn() {

  const [session] = useSession()


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
        

       <Button colorScheme="yellow" size="lg" onClick={(): Promise<void> => signIn('google')}> Login </Button>
       {!!session && (
         <Box flex="1" p="6">  
        <Avatar size="2xl" name={session.user.name} src={session.user.image}/>
           <Text fontWeight="normal">{session.user.email}</Text>
           <Text fontWeight="normal">{session.user.name}</Text>
          <Button colorScheme="yellow" size="lg" onClick={(): Promise<void> => signOut()}> Sair </Button>
         </Box>
    )}
      </Flex>
    </Flex>
  )
}
