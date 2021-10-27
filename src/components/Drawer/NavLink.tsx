
import {Text, Link as ChakraLink, Icon, LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import { ElementType } from "toasted-notes/node_modules/@types/react";
import ActiveLink from '../../components/ActiveLink'

interface NavLinkProps extends ChakraLinkProps {
    icon: ElementType;
    children: string;
    href: string;
}

export default function NavLink({icon, children,href, ...rest}: NavLinkProps) {
    return (
        <ActiveLink href={href} passHref>
        <ChakraLink display="flex" variant="unstyled" align="center" justify="center" _hover={{}} {...rest}>
        <Text letterSpacing={2} fontSize="6xl" fontWeight="light">{children}</Text>
        </ChakraLink>
        </ActiveLink>
    )
}