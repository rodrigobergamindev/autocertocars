import { HStack, Box, Flex, Heading, Button, Icon, Table, Thead, Tr, Th, Td, Checkbox, Tbody, Text, useBreakpointValue, SimpleGrid } from "@chakra-ui/react";
import { RiWhatsappLine} from "react-icons/ri";
import  Header  from "../../../components/Header/index"
import  Siderbar  from "../../../components/Sidebar/index";
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import {useState} from 'react'


import { PrismaClient } from '@prisma/client'
import { getSession } from "next-auth/client"





type Anuncio = {
    name: string;
    email: string;
    whatsapp: string;
    proposta: string;
    data_de_criacao: Date;
    id: string;
}





export default function MensagensList({initialValues, session}) {


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
            const newAnuncios = anunciosToShow.filter(newAnuncio => newAnuncio.id != anuncio.id)
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
                        
                        <Heading size="lg" fontWeight="normal">Mensagens</Heading>

                    </Flex>
                
                <Flex
                justify="space-between"
                >
                {anunciosToShow.map((message,index) => {
                    console.log(message)
                    return (
                        <Box 
                        key={index}
                        bg="gray.700"
                        p={6}
                        borderRadius={4}
                        >
                         <Text fontSize="sm" mb={2}><Text fontWeight="bold" color="gray.300">REMETENTE:</Text> {message.name}</Text>
                         <Text fontSize="sm" mb={2}><Text fontWeight="bold" color="gray.300">E-MAIL:</Text> {message.email}</Text>
                         <Text fontSize="sm" mb={2}><Text fontWeight="bold" color="gray.300">WHATSAPP:</Text> {message.whatsapp}</Text>
                         <Text fontSize="sm" mb={2}><Text fontWeight="bold" color="gray.300">PROPOSTA:</Text> {message.proposta}</Text>

                         <HStack mt={6} justify="space-between">
                            <Text fontWeight="bold" fontSize="sm">{new Date(message.data_de_criacao).toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric'
                        }).toUpperCase()}</Text>
                        <a href={`https://api.whatsapp.com/send?phone=55${message.whatsapp}&text=Olá,%20${message.name}!%20 recebi sua proposta através de www.autocertocars.com.br`} target="_blank">
                            <Button size="sm" colorScheme="green"  leftIcon={<Icon as={RiWhatsappLine} fontSize="20"></Icon>}>Responder</Button></a>
                         </HStack>
                         
                        </Box>
                    )
                })}
                </Flex>
                
                </Box>

            </Flex>
        </Box>
    )
}


export const getServerSideProps: GetServerSideProps = async({req}) => {

   
    const prisma = new PrismaClient();
    const messages = await prisma.message.findMany()
    const initialValues = JSON.parse(JSON.stringify(messages))

   

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