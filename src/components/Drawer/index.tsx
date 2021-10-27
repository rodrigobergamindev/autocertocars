import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerCloseButton, DrawerBody } from "@chakra-ui/react";
import { SidebarNav } from "./SidebarNav";

import {useSidebarDrawer} from '../../contexts/SidebarDrawerContext'
import Logo from "../Home/Header/Logo";

export default function Siderbar() {

    const {isOpen, onClose, onOpen} = useSidebarDrawer()

    
   
        return (
            <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="full">
            <DrawerOverlay>
                <DrawerContent bg="gray.800" p="4">
                    <DrawerCloseButton mt={6} mr={4} fontSize="30"  variant="unstyled" _focus={{borderColor: "none"}}/>
                    <DrawerHeader><Logo size={250}/></DrawerHeader>
                    <DrawerBody display="flex">
                        <SidebarNav/>
                    </DrawerBody>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
        
        )

    
  
}