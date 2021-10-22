import { Box, Flex, Heading, Button, Icon, Table, Thead, Tr, Th, Td, Tbody, Text, useBreakpointValue } from "@chakra-ui/react";
import { RiAddLine, RiCloseLine, RiPencilLine } from "react-icons/ri";
import  Header  from "../../../components/Header/index"
import  Siderbar  from "../../../components/Sidebar/index";
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import {useState} from 'react'


import { PrismaClient } from '@prisma/client'
import { getSession } from "next-auth/client"
import { motion } from "framer-motion";
import { useRouter } from "next/router";



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

    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2
          }
        }
      };
      
      const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1
        }
      };

      const MotionTable = motion(Table)
      const MotionTr = motion(Tr)


    
    const router = useRouter()
    


    async function handleRemoveAnuncio(anuncio) {

        const response = await fetch('/api/anuncios/delete', {
            method: "DELETE",
            body: JSON.stringify(anuncio)
        })
        
        
        if(!response.ok) {
            throw new Error(response.statusText)
        }

        if(response.ok) {
            router.push('/dashboard/anuncios')
        }
        
    }

    
   


        const carValues = initialValues.map(anuncio => (
            parseFloat(anuncio.valor)
          ))

       
        const totalStock = carValues.reduce((total, valorAtual) => {
            return total + valorAtual
            }, 0)
    
        
     

      
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
                        
                        <Heading size="lg" fontWeight="normal">Estoque</Heading>

                        <Flex  justify="flex-end" align="center" alignSelf="flex-end" justifySelf="flex-end" >

                        <Text color="yellow.400" fontWeight="bold" fontSize="20px">Total: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalStock)}</Text>
                        <Link href="/dashboard/anuncios/create" passHref><Button as="a" ml={10} size="sm" fontSize="sm" colorScheme="blue" leftIcon={<Icon as={RiAddLine} fontSize="20"></Icon>}>Criar novo</Button></Link>

                        </Flex>
                    </Flex>
                
                <MotionTable
                colorScheme="whiteAlpha"
                initial="hidden"
                animate="visible"
                variants={container}
                >
                    <Thead>
                        <MotionTr variants={item}>
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
                        </MotionTr>
                    </Thead>
                    <Tbody>
                {initialValues.map((anuncio, index) => {
                    return (
                        
                    <MotionTr key={index} variants={item}>
                        <Td px={["4","4","6"]}>
                        <Text fontWeight="bold" fontSize="sm" color="gray.300">{anuncio.ano_fabricacao}</Text>
                        </Td>

                        <Td>
                            <Link href={`/dashboard/anuncios/edit/${anuncio.slug}`} passHref>
                            <Box  cursor="pointer">
                                <Text fontWeight="bold" fontSize="sm">{anuncio.name}</Text>
                                {!!isWideVersion && <Text fontWeight="bold" fontSize="sm" color="gray.300">{(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(parseFloat(anuncio.valor)))}</Text>}
                            </Box>
                            </Link>
                        </Td>

                        {!!isWideVersion && <Td> {new Date(anuncio.data_de_criacao).toLocaleDateString('pt-BR', {
                                     day: '2-digit',
                                        month: 'long',
                                        year: 'numeric'
                    })}</Td>}

                        <Td>
                        {!!isWideVersion && <Link href={`/dashboard/anuncios/edit/${anuncio.slug}`} passHref><Button as="a" size="sm" fontSize="sm" colorScheme="blue" leftIcon={<Icon as={RiPencilLine} fontSize="20"></Icon>}>Editar</Button></Link>}
                        
                        </Td>
                        <Td>
                        {!!isWideVersion && <Button onClick={() => handleRemoveAnuncio(anuncio)} size="sm" fontSize="sm" colorScheme="red" leftIcon={<Icon as={RiCloseLine} fontSize="20"></Icon>}>Remover</Button>}
                        </Td>
                        
                    </MotionTr>
                
                    )
                })}
                </Tbody>
                </MotionTable>

                
                </Box>

            </Flex>
        </Box>
    )
}


export const getServerSideProps: GetServerSideProps = async({req}) => {

   
    const prisma = new PrismaClient();
    const anuncios = await prisma.anuncio.findMany({
        orderBy: [
            {
                name: 'asc'
            }
        ]
    })
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