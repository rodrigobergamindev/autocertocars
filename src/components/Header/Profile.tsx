import {Flex, Text, Box, Avatar} from '@chakra-ui/react'
import { useSession } from 'next-auth/client'

interface ProfileProps {
    showProfileData?: boolean;
}


export default function Profile ({showProfileData = true} : ProfileProps) {
    const [session] = useSession()
    return (
        <Flex align="center">
               {showProfileData && !!session && (

                    <Box mr="4" textAlign="right">
                        <Text>{session.user.name}</Text>
                        <Text color="gray.300" fontSize="small">Administrador</Text>
                        <Text color="gray.300" fontSize="small">{session.user.email}</Text>
                    </Box>
               )}

            <Avatar
                size="lg"
                name="Administrador"
                src={session.user.image}
            >

            </Avatar>
            </Flex>
    )
}