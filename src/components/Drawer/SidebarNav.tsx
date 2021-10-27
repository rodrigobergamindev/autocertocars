import { Box, Stack, Icon, Divider, Text } from "@chakra-ui/react";
import { RiBookOpenLine,RiFacebookBoxFill, RiWhatsappLine, RiCarLine, RiContactsLine, RiDashboardLine, RiGitMergeLine, RiHomeLine, RiInputMethodLine, RiInstagramLine, RiMessageLine, RiPencilLine, RiMapLine, RiGpsLine } from "react-icons/ri";
import NavLink from "./NavLink";



export function SidebarNav() {


    return (
        <Stack spacing="5" flex="1" align="flex-start" justify="center"  py={40} px={190}>
                <NavLink icon={RiHomeLine} href="/">Home</NavLink>
                <NavLink icon={RiCarLine} href="/veiculos">Veículos</NavLink>
                <NavLink icon={RiBookOpenLine} href="/sobre">Sobre</NavLink>
                <NavLink icon={RiMessageLine} href="/contato">Contato</NavLink>
        
        <Divider borderColor="transparent"/>
        <Divider borderColor="transparent"/>
        <Divider borderColor="transparent"/>
        <Divider borderColor="transparent"/>
        <Divider borderColor="transparent"/>

            <Stack direction="row" alignItems="center" flex="1" width="100%">
            <a>
                <Icon 
                fontSize="2xl" 
                color="gray.300"
                as={RiInstagramLine}
                transition="all 0.3s ease-in-out"
                cursor="pointer"
                _hover={{
                    color:"#D53F8C"
                }} 
                />
            </a>

            <a>
                <Icon 
                fontSize="2xl" 
                color="gray.300" 
                as={RiFacebookBoxFill}
                transition="all 0.3s ease-in-out"
                cursor="pointer"
                _hover={{
                    color:"#3182CE"
                }}
                />
            </a>

            <a>
                <Icon fontSize="2xl" 
                color="gray.300" 
                as={RiWhatsappLine}
                transition="all 0.3s ease-in-out"
                cursor="pointer"
                _hover={{
                    color:"#38A169"
                }} 
                />
            </a>

            <Box flex="1" width="100px" height="1px" backgroundColor="gray.50"/>
            
            <Icon as={RiGpsLine}/><Text color="yellow.400" fontWeight="light">Av. do Imperador, 4550 - São Miguel Paulista, São Paulo - SP, 08050-000</Text>
            </Stack>
            </Stack>
    )
}