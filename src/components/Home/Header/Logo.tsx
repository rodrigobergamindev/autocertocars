
import { Image, Stack } from "@chakra-ui/react"

interface LogoProps {
    size: number;
}

export default function Logo ({size}: LogoProps) {
    return (
        <Stack direction="row">
            <Image
                maxWidth={size}
                w="100%"
                objectFit="contain"
                src="/img/logo.png"
                alt="logo"
                 
            />
        </Stack>
    )
}