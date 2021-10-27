import { Box, Stack } from "@chakra-ui/react";
import { RiBookOpenLine, RiCarLine, RiContactsLine, RiDashboardLine, RiGitMergeLine, RiHomeLine, RiInputMethodLine, RiMessageLine, RiPencilLine } from "react-icons/ri";
import NavLink from "./NavLink";



export function SidebarNav() {
    return (
        <Stack spacing="5" flex="1"  align="center" justify="center"  py={40} px={190}>
                    
                <NavLink icon={RiHomeLine} href="/">Home</NavLink>
                <NavLink icon={RiCarLine} href="/veiculos">Veículos</NavLink>
                <NavLink icon={RiBookOpenLine} href="/sobre">Sobre</NavLink>
                <NavLink icon={RiMessageLine} href="/contato">Contato</NavLink>    
            </Stack>
    )
}