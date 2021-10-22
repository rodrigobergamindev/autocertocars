import { Box, Stack } from "@chakra-ui/react";
import { RiCarLine, RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine, RiPencilLine } from "react-icons/ri";
import NavLink from "./NavLink";
import NavSection from "./NavSection";


export function SidebarNav() {
    return (
        <Stack spacing="12" align="flex-start">
                <Box>
                    <NavSection title="MENU">
                        <NavLink icon={RiDashboardLine} href="/dashboard">Dashboard</NavLink>
                        <NavLink icon={RiCarLine} href="/dashboard/anuncios">Estoque</NavLink>
                        <NavLink icon={RiPencilLine} href="/dashboard/mensagens">Mensagens</NavLink>
                    </NavSection>
                </Box>



            </Stack>
    )
}