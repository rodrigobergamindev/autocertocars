import {Grid, HStack, Box, VStack, Flex, Heading, Button, Icon, Text, useBreakpointValue } from "@chakra-ui/react";
import { RiCloseLine, RiWhatsappLine} from "react-icons/ri";
import  Header  from "../../../components/Header/index"
import  Siderbar  from "../../../components/Sidebar/index";
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import {useState} from 'react'


import { PrismaClient } from '@prisma/client'
import { getSession } from "next-auth/client"
import { motion } from "framer-motion";
import {api} from '../../../services/api'



type Message = {
    name: string;
    email: string;
    whatsapp: string;
    mensagem: string;
    data_de_criacao: Date;
    id: string;
    veiculo?: string;
}





export default function MensagensList({initialValues, session}) {


    const [messagesToShow, setMessagesToShow] = useState<Message[]>(initialValues)
    const MotionGrid = motion(Grid)
    const MotionBox = motion(Box)

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


    async function handleRemoveMessage(message) {

        const response = await fetch('/api/messages/delete', {
            method: "DELETE",
            body: JSON.stringify(message)
        })
        
        
        if(!response.ok) {
            throw new Error(response.statusText)
        }

        if(response.ok) {
            const newMessages = messagesToShow.filter(newMessage => newMessage.id != message.id)
            setMessagesToShow(newMessages)
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
                        
                        <Heading size="lg" fontWeight="normal">Caixa de Mensagens</Heading>

                    </Flex>
                
                <MotionGrid variants={container} initial="hidden"animate="visible" templateColumns="repeat(3, 1fr)" gap={6}>

                {messagesToShow.map((message,index) => {
                    
                    
                    return (
                        <MotionBox 
                        key={index}
                        bg="gray.700"
                        p={6}
                        borderRadius={4}
                        variants={item}
                        display="flex"
                        justifyContent="space-around"
                        flexDirection="column"
                        >
                            <HStack mb={4} justify="flex-end">
                            <Text fontWeight="bold" fontSize="sm">{new Date(message.data_de_criacao).toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric'
                        }).toUpperCase()}</Text>
                        </HStack>
                        <Text fontSize="sm" fontWeight="bold" color="gray.300">REMETENTE:</Text>  <Text fontSize="sm" color="white" mb={2}>{message.name}</Text>
                        <Text fontSize="sm" fontWeight="bold" color="gray.300">E-MAIL:</Text>  <Text fontSize="sm" color="white" mb={2}>{message.email}</Text>
                        <Text fontSize="sm" fontWeight="bold" color="gray.300">WHATSAPP:</Text>  <Text fontSize="sm" color="white" mb={2}>{message.whatsapp}</Text>
                        <Text fontSize="sm" fontWeight="bold" color="gray.300">MENSAGEM:</Text>  <Text fontSize="sm" color="white" mb={2}>{message.mensagem}</Text>
                        {!!message.veiculo  && <Box><Text fontSize="sm" fontWeight="bold" color="gray.300">VEÍCULO:</Text> <Text fontSize="sm" color="white" mb={2}>{message.veiculo}</Text></Box>}
                         <HStack mt={4} justify="flex-end">
                         <Button size="sm" colorScheme="red" onClick={() => handleRemoveMessage(message)}  leftIcon={<Icon as={RiCloseLine} fontSize="20"></Icon>}>Excluir</Button>
                        <a href={`https://api.whatsapp.com/send?phone=55${message.whatsapp}&text=Olá,%20${message.name}!%20 recebi sua proposta através de www.autocertocars.com.br`} target="_blank" rel="noreferrer">
                            <Button size="sm" colorScheme="green"  leftIcon={<Icon as={RiWhatsappLine} fontSize="20"></Icon>}>Responder</Button></a>
                            </HStack>
                        </MotionBox>
                    )
                })}
                </MotionGrid>
                
                </Box>

            </Flex>
        </Box>
    )
}


export const getServerSideProps: GetServerSideProps = async({req}) => {

   
    
    const data_messages = await api.get('/messages/get', {
        method: "GET",
      })

    const initialValues = data_messages.data

   

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