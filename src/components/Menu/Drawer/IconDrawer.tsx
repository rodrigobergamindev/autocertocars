
import {IconButton, Icon} from "@chakra-ui/react";
import { ElementType } from "toasted-notes/node_modules/@types/react";
import {useState} from 'react'
import { RiArrowRightLine, RiArrowRightUpLine, RiMenuLine } from "react-icons/ri";
import {useSidebarDrawer} from '../../../contexts/SidebarDrawerContext'



export default function IconDrawer() {


    const { onOpen } = useSidebarDrawer()

    

    return (
        <IconButton
            aria-label="Open navigation"
            icon={<Icon as={RiMenuLine}/>}
            color="yellow.400"
            fontSize="40"
            variant="ghost"
            onClick={onOpen}
            mr={5}
            _active={{
                borderColor: "none",
              }}
            _focus={{
                borderColor: "none"
            }}
           _hover={{
               background: "none"
           }}
            >
            </IconButton>
    )
}