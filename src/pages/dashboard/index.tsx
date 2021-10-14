import { Flex, HStack, Box, Text, Grid, useBreakpointValue, Icon, Button } from "@chakra-ui/react";
import  Header from "../../components/Header";
import Siderbar  from "../../components/Sidebar/index"
import {theme} from '../../styles/theme'
import { getSession } from "next-auth/client"
import {SiGoogleanalytics} from 'react-icons/si'
import {RiArrowRightSLine, RiCarFill, RiCarLine, RiCarWashingLine, RiFacebookBoxFill, RiFacebookLine, RiInstagramLine, RiMessageLine, RiUserLine} from 'react-icons/ri'
import { PrismaClient } from '@prisma/client'







export default function Dashboard({session, messagesReceived, anunciosAtivos}) {

    const isWideVersion = useBreakpointValue ({
        base: false,
        lg: true
    })
  
    return (
      <Flex direction="column" h="100vh">
      <Header/>

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Siderbar/>

          <Grid flex="1" templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]} gap={6} align="flex-start">
              <Box
                  p={["6","8"]}
                  bg="gray.800"
                  borderRadius={8}
                  pb="4"

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
                  <Text fontSize="6xl">435</Text>

              </Box>

              <Box
                  p={["6","8"]}
                  bg="gray.800"
                  borderRadius={8}
                  pb="4"

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
                  <Text fontSize="6xl">{messagesReceived}</Text>

              </Box>

              <Box
                  p={["6","8"]}
                  bg="gray.800"
                  borderRadius={8}
                  pb="4"
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"

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
                      <a href="https://analytics.google.com/analytics/web/?authuser=3#/report-home/a210212301w289959142p253245639" target="_blank">
                      <Icon background="whiteAlpha" fontSize="lg" as={RiInstagramLine} w={7} h={7}/>
                      </a>

                      <a href="https://analytics.google.com/analytics/web/?authuser=3#/report-home/a210212301w289959142p253245639" target="_blank">
                      <Icon background="whiteAlpha" fontSize="lg" as={RiFacebookBoxFill} w={7} h={7}/>
                      </a>

                      <a href="https://analytics.google.com/analytics/web/?authuser=3#/report-home/a210212301w289959142p253245639" target="_blank">
                      <Icon background="whiteAlpha" fontSize="lg" as={SiGoogleanalytics} w={6} h={6}/>
                      </a>
                      </HStack>

              </Box>

              <Box
                  p={["6","8"]}
                  bg="gray.800"
                  borderRadius={8}
                  pb="4"
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
                  <Text fontSize="6xl">{anunciosAtivos}</Text>

              </Box>

          </Grid>
      </Flex>
  </Flex>
        
    )
}


export const getServerSideProps = async ({req}) => {

  const session = await getSession({req})
  const response = await fetch('http://localhost:3000/api/analytics/pageviews')
  const analytics = await response.json()

  const prisma = new PrismaClient();
  const anuncios = await prisma.anuncio.findMany()
  const messages = await prisma.message.findMany()

  const anunciosAtivos = anuncios.length
  const messagesReceived = messages.length

  console.log(analytics)

  
  
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
        messagesReceived
    }
  }
}