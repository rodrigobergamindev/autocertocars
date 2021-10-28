import { HStack, VStack, Icon, Grid, Box, Flex, Image as ChakraImage, Divider, Text, Button, Stack, Heading, StackDivider} from '@chakra-ui/react'

import Image from 'next/image'
import {FaRegHandshake, FaCar} from 'react-icons/fa'
import {GiBrazil, GiPayMoney, GiReceiveMoney, GiTakeMyMoney} from 'react-icons/gi'
import { RiRefreshLine } from 'react-icons/ri'
import {IoIosCash, IoIosDocument} from 'react-icons/io'

export default function Vender() {

    return (
        <Stack 
           
            align="center" 
            justify="center"
            w="100%"
            bg="gray.50"
            flexDirection="column"
            spacing={0}
            >
            <ChakraImage
                src="/img/waves.svg"
                width="100%"
                objectFit="cover"
                priority
                
            />
            <Stack  flex="1" width="100%" bg="gray.900">
                <Text fontSize="9xl">test</Text>
                <Box
                width="450px"
                height="850px"
                border="solid"
                borderColor="blue"
                >
                <ChakraImage
                as={Image}
                src="/img/vender.png"
                width={350}
                height={350}
                layout="responsive"
                objectFit="contain"
                priority
                />
            </Box>
            </Stack>
            </Stack>
    )
}