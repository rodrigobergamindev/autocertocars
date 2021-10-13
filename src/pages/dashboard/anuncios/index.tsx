import { Box, Flex, Heading, Button, Icon, Table, Thead, Tr, Th, Td, Checkbox, Tbody, Text, useBreakpointValue } from "@chakra-ui/react";
import { RiAddLine, RiCloseLine, RiPencilLine } from "react-icons/ri";
import  Header  from "../../../components/Header/index"
import  Siderbar  from "../../../components/Sidebar/index";
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import {useState, useEffect} from 'react'


import { PrismaClient } from '@prisma/client'
import { getSession } from "next-auth/client"





type Anuncio = {
    name: string;
    ano_fabricacao: string;
    marca: string;
    modelo: string;
    versao?: string;
    numero_portas?: string;
    cor?: string;
    cores_internas?: string;
    combustivel?: string;
    carroceria?: string;
    potencia?: string;
    transmissao?: string;
    quilometragem?: string;
    valor: string;
    chave_copia?: string;
    laudo_cautelar?: string;
    manual_do_proprietario?: string;
    observacoes?: string;

    data_de_criacao: Date;
    image: Array<string>;
    slug: string;
}





export default function AnuncioList({initialValues, session}) {


    const [anunciosToShow, setAnunciosToShow] = useState<Anuncio[]>(initialValues)


    async function handleRemoveAnuncio(anuncio) {

        const response = await fetch('/api/anuncios/delete', {
            method: "DELETE",
            body: JSON.stringify(anuncio)
        })
        
        
        if(!response.ok) {
            throw new Error(response.statusText)
        }

        if(response.ok) {
            const newAnuncios = anunciosToShow.filter(newAnuncio => newAnuncio.slug != anuncio.slug)
            setAnunciosToShow(newAnuncios)
        }
        
    }

      
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
                        
                        <Heading size="lg" fontWeight="normal">Anúncios</Heading>

                        <Link href="anuncios/create" passHref><Button as="a" size="sm" fontSize="sm" colorScheme="blue" leftIcon={<Icon as={RiAddLine} fontSize="20"></Icon>}>Criar novo</Button></Link>
                    </Flex>
                
                <Table
                colorScheme="whiteAlpha"
                >
                    <Thead>
                        <Tr>
                            <Th px={["4","4","6"]} width="8">
                               ANO
                            </Th>

                            <Th>
                                VEÍCULO
                            </Th>

                            {!!isWideVersion && <Th> Data de Criação</Th>}

                            <Th width="8">
                                
                            </Th>

                            <Th width="8">
                                
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                {anunciosToShow.map((anuncio, index) => {
                    return (
                        
                    <Tr key={index}>
                        <Td px={["4","4","6"]}>
                        <Text fontWeight="bold" fontSize="sm" color="gray.300">{anuncio.ano_fabricacao}</Text>
                        </Td>

                        <Td>
                            <Link href={`anuncios/edit/${anuncio.slug}`} passHref>
                            <Box  cursor="pointer">
                                <Text fontWeight="bold" fontSize="sm">{anuncio.name}</Text>
                                {!!isWideVersion && <Text fontWeight="bold" fontSize="sm" color="gray.300">{anuncio.valor}</Text>}
                            </Box>
                            </Link>
                        </Td>

                        {!!isWideVersion && <Td> {new Date(anuncio.data_de_criacao).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })}</Td>}

                        <Td>
                        {!!isWideVersion && <Link href={`anuncios/edit/${anuncio.slug}`} passHref><Button as="a" size="sm" fontSize="sm" colorScheme="blue" leftIcon={<Icon as={RiPencilLine} fontSize="20"></Icon>}>Editar</Button></Link>}
                        
                        </Td>
                        <Td>
                        {!!isWideVersion && <Button onClick={() => handleRemoveAnuncio(anuncio)} size="sm" fontSize="sm" colorScheme="red" leftIcon={<Icon as={RiCloseLine} fontSize="20"></Icon>}>Remover</Button>}
                        </Td>
                        
                    </Tr>
                
                    )
                })}
                </Tbody>
                </Table>

                
                </Box>

            </Flex>
        </Box>
    )
}


export const getServerSideProps: GetServerSideProps = async({req}) => {

   
    const prisma = new PrismaClient();
    const anuncios = await prisma.anuncio.findMany()
    const initialValues = JSON.parse(JSON.stringify(anuncios))

   

    const session = await getSession({req})
   
 
    if(!session) {
        return {
            redirect: {
                destination: `/login`,
                permanent: false
            }
        }
    }

    
    return {
      props: {
          session,
          initialValues
        },
    }
  }