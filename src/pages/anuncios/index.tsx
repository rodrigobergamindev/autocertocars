import { Box, Flex, Heading, Button, Icon, Table, Thead, Tr, Th, Td, Checkbox, Tbody, Text, useBreakpointValue } from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import  Header  from "../../components/Header/index"
import Pagination from '../../components/Pagination/index'
import  Siderbar  from "../../components/Sidebar/index";
import Link from 'next/link'

export default function UserList() {

    const isWideVersion = useBreakpointValue ({
        base: false,
        lg: true
    })

    return (
        <Box>
            <Header/>
            
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">

                <Siderbar/>

                <Box flex="1" borderRadius={8} bg="gray.800" p="8">

                    <Flex mb="8" justify="space-between" align="center">
                        
                        <Heading size="lg" fontWeight="normal">Usuários</Heading>

                        <Link href="/anuncios/create" passHref><Button as="a" size="sm" fontSize="sm" colorScheme="blue" leftIcon={<Icon as={RiAddLine} fontSize="20"></Icon>}>Criar novo</Button></Link>
                    </Flex>
                
                <Table
                colorScheme="whiteAlpha"
                >
                    <Thead>
                        <Tr>
                            <Th px={["4","4","6"]} color="gray.300" width="8">
                                <Checkbox colorScheme="yellow"/>
                            </Th>

                            <Th>
                                Usuário
                            </Th>

                            {isWideVersion && <Th> Data de Cadastro</Th>}

                            <Th width="8">
                                
                            </Th>
                        </Tr>
                    </Thead>

                <Tbody>
                    <Tr>
                        <Td px={["4","4","6"]}>
                            <Checkbox colorScheme="yellow"/>
                        </Td>

                        <Td>
                            <Box>
                                <Text fontWeight="bold">Rodrigo Bergamin</Text>
                                <Text fontWeight="bold" fontSize="sm" color="gray.300">rb.bergamin@gmail.com</Text>
                            </Box>
                        </Td>

                        {isWideVersion && <Td> 12 de setembro de 2021</Td>}

                        <Td>
                            {isWideVersion && <Button as="a" size="sm" fontSize="sm" colorScheme="blue" leftIcon={<Icon as={RiPencilLine} fontSize="20"></Icon>}>Editar</Button>}
                        </Td>
                        
                    </Tr>
                </Tbody>
                </Table>

                <Pagination/>
                
                </Box>

            </Flex>
        </Box>
    )
}