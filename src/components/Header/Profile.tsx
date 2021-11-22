import {Flex, Text, Box, Avatar} from '@chakra-ui/react'
import { useSession, signIn, signOut } from 'next-auth/client'




export default function Profile () {
    const [session] = useSession()
   
    return (
        <Flex align="center">
            

                    <Box mr="4" textAlign="right">
                        <Text>{session.user.name}</Text>
                        <Text color="gray.300" fontSize="small">Administrador</Text>
                        <Text color="gray.300" fontSize="small">{session.user.email}</Text>
                        <Text as="button" color="yellow.400" fontSize="small" onClick={(): Promise<void> => signOut({ callbackUrl: 'https://www.autocertocars.com.br/'})}>Sair</Text>
                    </Box>
         

            <Avatar
                size="lg"
                name="Administrador"
                src={session.user.image}
            >

            </Avatar>
            </Flex>
    )
}