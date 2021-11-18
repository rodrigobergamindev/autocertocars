import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerCloseButton, DrawerBody, useBreakpointValue } from "@chakra-ui/react";
import { SidebarNav } from "./SidebarNav";

import {useSidebarDrawer} from '../../../contexts/SidebarDrawerContext'
import Logo from "../../Home/Header/Logo";

export default function Siderbar() {

    const {isOpen, onClose, onOpen} = useSidebarDrawer()

    const isWideVersion = useBreakpointValue ({
        base: false,
        lg: true
    })
   
        return (
            <Drawer isOpen={isOpen}  onClose={onClose} placement="right" size="full">
            <DrawerOverlay>
                <DrawerContent bg="gray.800" p="4">
                    <DrawerCloseButton mt={6} mr={4} fontSize={["20","20"]} color="yellow.400"  variant="unstyled" _focus={{borderColor: "none"}}/>
                    <DrawerHeader><Logo size={!!isWideVersion ? 250 : 120}/></DrawerHeader>
                    <DrawerBody display="flex">
                        <SidebarNav/>
                    </DrawerBody>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
        
        )

    
  
}