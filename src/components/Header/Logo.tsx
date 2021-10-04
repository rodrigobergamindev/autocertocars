
import {Text} from '@chakra-ui/react'

export default function Logo () {
    return (
        <Text
        fontSize="3xl"
        fontWeight="bold"
        letterSpacing="tight"
        w="64"
        >
            autocerto
            <Text fontWeight="bold" color="yellow.400" ml="1" as="span">.</Text>
            </Text>
    )
}