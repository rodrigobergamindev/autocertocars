
import { Image, Stack } from "@chakra-ui/react"

export default function Logo () {
    return (
        <Stack direction="row">
            <Image
                boxSize="250px"
                objectFit="contain"
                src="/img/logo.png"
                alt="logo"
                
            />
        </Stack>
    )
}