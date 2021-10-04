import {Flex, Text, Box, Avatar} from '@chakra-ui/react'

interface ProfileProps {
    showProfileData?: boolean;
}


export default function Profile ({showProfileData = true} : ProfileProps) {
    return (
        <Flex align="center">
               {showProfileData && (
                    <Box mr="4" textAlign="right">
                        <Text>Luiz F. Bergamin Junior</Text>
                        <Text color="gray.300" fontSize="small">Administrador</Text>
                        <Text color="gray.300" fontSize="small">rb.bergamin@gmail.com</Text>
                    </Box>
               )}

            <Avatar
                size="lg"
                name="Administrador"
                src="/img/avatar.jpg"
            >

            </Avatar>
            </Flex>
    )
}