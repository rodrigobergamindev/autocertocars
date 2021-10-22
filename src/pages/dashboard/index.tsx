import {SimpleGrid, Flex, HStack, Box, Text, Grid, useBreakpointValue, Icon, Button } from "@chakra-ui/react";
import  Header from "../../components/Header";
import Siderbar  from "../../components/Sidebar/index"
import {theme} from '../../styles/theme'
import { getSession } from "next-auth/client"
import {SiGoogleanalytics, SiMonkeytie} from 'react-icons/si'
import { RiCarLine,  RiFacebookBoxFill, RiInstagramLine, RiMessageLine,  RiMoneyDollarCircleLine, RiUserLine} from 'react-icons/ri'
import { PrismaClient } from '@prisma/client'
import CountUp from 'react-countup';
import { motion } from "framer-motion";
import  Link  from 'next/link';





export default function Dashboard({session, messagesReceived, anunciosAtivos, totalStock}) {

    const isWideVersion = useBreakpointValue ({
        base: false,
        lg: true
    })

    const MotionGrid = motion(SimpleGrid)
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
        },
      };
  
    return (
      <Flex direction="column" h="100vh">
      <Header/>

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Siderbar/>

          <MotionGrid variants={container} initial="hidden" animate="visible" flex="1" templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]} gap={6} align="flex-start">
              <MotionBox
                  p={["6","8"]}
                  bg="gray.800"
                  borderRadius={8}
                  pb="4"
                  variants={item}
                  transition="all 0.2s ease-in-out"
                  border="solid"
                  borderColor="transparent"
                  _hover={{
                    border:"solid",
                    borderColor: "yellow.400",
                    transform: "scale(1.02)"
                  }}
              >
                  <HStack  spacing={4} align="flex-start" justify="space-between">
                  <Text fontSize="lg" mb="4">Total de acessos</Text>
                  <Icon as={RiUserLine} w={9} h={9}/>
                  </HStack>
                  <Text fontSize="6xl">{!!messagesReceived && <CountUp end={400} duration={400/60}/>}</Text>

              </MotionBox>
              
              <Link href="/dashboard/mensagens">
              <MotionBox
                  cursor="pointer"
                  p={["6","8"]}
                  bg="gray.800"
                  borderRadius={8}
                  pb="4"
                  variants={item}
                  transition="all 0.2s ease-in-out"
                  border="solid"
                  borderColor="transparent"
                  _hover={{
                    border:"solid",
                    borderColor: "yellow.400",
                    transform: "scale(1.02)"
                  }}
              >
                  <HStack  spacing={4} align="flex-start" justify="space-between">
                  <Text fontSize="lg" mb="4">Mensagens recebidas</Text>
                  <Icon as={RiMessageLine} w={9} h={9}/>
                  </HStack>
                  <Text fontSize="6xl">{!!messagesReceived && <CountUp end={messagesReceived} duration={(messagesReceived/60)}/>}</Text>

              </MotionBox>
              </Link>

              <MotionBox
                  p={["6","8"]}
                  bg="gray.800"
                  borderRadius={8}
                  pb="4"
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  variants={item}
                  transition="all 0.2s ease-in-out"
                  border="solid"
                  borderColor="transparent"
                  _hover={{
                    border:"solid",
                    borderColor: "yellow.400",
                    transform: "scale(1.02)"
                  }}
              >
                  <HStack  spacing={4} align="flex-start" justify="space-between">
                  <Text fontSize="lg" mb="4">Mídias Sociais</Text>
                  <Icon as={SiGoogleanalytics} w={9} h={9}/>
                  </HStack>

                  <HStack  spacing={4} align="flex-start" justify="flex-start">
                      <a href="https://www.instagram.com/autocertocars/?hl=pt-br" target="_blank">
                      <Icon background="whiteAlpha" fontSize="lg" as={RiInstagramLine} w={7} h={7}/>
                      </a>

                      <a href="https://www.facebook.com/autocertocars/" target="_blank">
                      <Icon background="whiteAlpha" fontSize="lg" as={RiFacebookBoxFill} w={7} h={7}/>
                      </a>

                      <a href="https://analytics.google.com/analytics/web/?authuser=3#/report-home/a210212301w289959142p253245639" target="_blank">
                      <Icon background="whiteAlpha" fontSize="lg" as={SiGoogleanalytics} w={6} h={6}/>
                      </a>
                      </HStack>

              </MotionBox>

              <Link href="/dashboard/anuncios">
              <MotionBox
                  cursor="pointer"
                  p={["6","8"]}
                  bg="gray.800"
                  borderRadius={8}
                  pb="4"
                  variants={item}
                  transition="all 0.2s ease-in-out"
                  border="solid"
                  borderColor="transparent"
                  _hover={{
                    border:"solid",
                    borderColor: "yellow.400",
                    transform: "scale(1.02)"
                  }}
              >
                  <HStack  spacing={4} align="flex-start" justify="space-between">
                  <Text fontSize="lg" mb="4">Anúncios ativos</Text>
                  <Icon as={RiCarLine} w={9} h={9}/>
                  </HStack>
                  <Text fontSize="6xl">{!!anunciosAtivos && anunciosAtivos > 1 ? <CountUp end={anunciosAtivos} duration={(60*5)/120}/> : anunciosAtivos}</Text>

              </MotionBox>
                </Link>

                <MotionBox
                  cursor="pointer"
                  p={["6","8"]}
                  bg="gray.800"
                  borderRadius={8}
                  pb="4"
                  variants={item}
                  transition="all 0.2s ease-in-out"
                  border="solid"
                  borderColor="transparent"
                  _hover={{
                    border:"solid",
                    borderColor: "yellow.400",
                    transform: "scale(1.02)"
                  }}
              >
                  <HStack  spacing={4} align="flex-start" justify="space-between">
                  <Text fontSize="lg" mb="4">Total em Estoque</Text>
                  <Icon as={RiMoneyDollarCircleLine} w={9} h={9}/>
                  </HStack>
                  <Text fontSize="6xl">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(parseFloat(totalStock))}</Text>

              </MotionBox>
          </MotionGrid>
      </Flex>
  </Flex>
        
    )
}


export const getServerSideProps = async ({req}) => {

  const session = await getSession({req})


  const prisma = new PrismaClient();
  const anuncios = await prisma.anuncio.findMany()
  const messages = await prisma.message.findMany()

  const anunciosAtivos = anuncios.length > 0 ? anuncios.length : 0
  const messagesReceived = messages.length > 0 ?  messages.length : 0

  const values = anuncios.map(anuncio => (
    parseFloat(anuncio.valor)
  ))

  const totalStock = values.reduce((total, valorAtual) => {
    return total + valorAtual
  })

  
  
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
        anunciosAtivos,
        messagesReceived,
        totalStock
    }
  }
}