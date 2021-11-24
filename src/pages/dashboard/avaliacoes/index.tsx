import {Grid, HStack, Box, VStack, Flex, Heading, Button, Icon, Text, useBreakpointValue } from "@chakra-ui/react";
import { RiCloseLine, RiWhatsappLine} from "react-icons/ri";
import  Header  from "../../../components/Header/index"
import  Siderbar  from "../../../components/Sidebar/index";
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import {useState} from 'react'




import { motion } from "framer-motion";

import {prisma} from '../../../../db'
import Head from 'next/head'








export default function MensagensList({initialValues}) {


    const [messagesToShow, setMessagesToShow] = useState(initialValues)
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

        const response = await fetch('/api/avaliacoes/delete', {
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
            <Head>
            <title>Avaliação Veicular</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header/>
            
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">

                <Siderbar/>

                <Box flex="1" borderRadius={8} bg="gray.800" p="8">

                    <Flex mb="8" justify="space-between" align="center">
                        
                        <Heading size="lg" fontWeight="normal">Avaliação Veicular</Heading>

                    </Flex>
                
                <MotionGrid variants={container} initial="hidden" animate="visible" templateColumns="repeat(2, 1fr)" gap={6}>

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
                        width="100%"
                        >
                            <HStack mb={4} justify="flex-end">
                            
                            <Text fontWeight="bold" fontSize="sm">{new Date(message.data_de_criacao).toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric'
                        }).toUpperCase()}</Text>

                        
                        </HStack>
                        <Grid templateColumns="repeat(2,1fr)" gap={5}>
                        <VStack align="flex-start" width="100%">
                        <Heading fontSize="sm" fontWeight="bold" color="gray.300" >INFORMAÇÕES DO CLIENTE</Heading>
                            <Box><Text fontSize="sm" fontWeight="bold"  color="gray.300">NOME:</Text>  <Text fontSize="sm" color="white" mb={2}>{message.name}</Text></Box>
                            <Box><Text fontSize="sm" fontWeight="bold"  color="gray.300">E-MAIL:</Text>  <Text fontSize="sm" color="white" mb={2}>{message.email}</Text></Box>
                            <Box><Text fontSize="sm" fontWeight="bold"  color="gray.300">WHATSAPP:</Text>  <Text fontSize="sm" color="white" mb={2}>{message.whatsapp}</Text></Box>
                            <Box><Text fontSize="sm" fontWeight="bold"  color="gray.300">VEÍCULO DE INTERESSE:</Text> <Text fontSize="sm" color="white" mb={2}>{message.veiculo}</Text></Box>
                        </VStack>

                        <VStack align="flex-start" width="100%">
                        <Heading fontSize="sm" fontWeight="bold" color="gray.300">VEÍCULO A SER AVALIADO</Heading>
                            <Box><Text fontSize="sm" fontWeight="bold" color="gray.300">MARCA:</Text>  <Text fontSize="sm" color="white" mb={2}>{message.marca}</Text></Box>
                            <Box><Text fontSize="sm" fontWeight="bold" color="gray.300">MODELO:</Text>  <Text fontSize="sm" color="white" mb={2}>{message.modelo}</Text></Box>
                            <Box><Text fontSize="sm" fontWeight="bold" color="gray.300">VERSÃO:</Text>  <Text fontSize="sm" color="white" mb={2}>{message.versao}</Text></Box>
                            <Box><Text fontSize="sm" fontWeight="bold" color="gray.300">ANO:</Text> <Text fontSize="sm" color="white" mb={2}>{message.ano}</Text></Box>
                            <Box><Text fontSize="sm" fontWeight="bold" color="gray.300">PLACA:</Text> <Text fontSize="sm" color="white" mb={2}>{message.placa}</Text></Box>
                            <Box><Text fontSize="sm" fontWeight="bold" color="gray.300">QUILOMETRAGEM:</Text> <Text fontSize="sm" color="white" mb={2}>{message.quilometragem} Km</Text></Box>
                        </VStack>
                        </Grid>
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


export const getServerSideProps: GetServerSideProps = async() => {

   
    
    const data_messages = await prisma.avaliacao.findMany()

    const initialValues =  await JSON.parse(JSON.stringify(data_messages))



    
    return {
      props: {
          initialValues
        }
    }
  }