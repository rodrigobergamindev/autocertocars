
import { Image, Stack } from "@chakra-ui/react"

interface LogoProps {
    size: number;
    logo?: string;
}

export default function Logo ({size, logo}: LogoProps) {
    return (
        <Stack direction="row">
            <Image
                maxWidth={size}
                w="100%"
                objectFit="contain"
                src={!logo ? '/img/logo.png' : logo}
                alt="logo"
                 
            />
        </Stack>
    )
}