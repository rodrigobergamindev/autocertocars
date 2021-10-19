import { Box, Flex, VStack, Heading, SimpleGrid, Divider, HStack, Button, Textarea, Text} from "@chakra-ui/react";


import { Input } from "../../../components/Form/Input";
import  Header  from "../../../components/Header";
import  Siderbar  from "../../../components/Sidebar/index"
import Link from 'next/link'

import {useForm, SubmitHandler} from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'


import { getSession } from "next-auth/client"
import { GetServerSideProps } from 'next'

import { insert } from '../../api/photos'
import { useRouter } from "next/router";

const phoneRegExp = /^[0-9]{2}?[0-9]{4,5}[0-9]{4}$/


type CreateMessageFormData = {
    name: string;
    email: string;
    whatsapp: string;
    mensagem: string;
    veiculo?: string;
  }






  const createAnuncioFormSchema = yup.object({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().required('E-mail obrigatório').email(),
    whatsapp: yup.string().required('Informe um contato para whatsapp')
    .matches(phoneRegExp, "Informe um número de celular válido - Ex: 11959944499")
    .nullable(),
    mensagem: yup.string().required('Envie a sua mensagem')
    //password: yup.string().required('Senha obrigatória').min(6, 'A senha precisa no mínimo de 6 caracteres'),
    //password_confirmation: yup.string().oneOf([
    //    null, yup.ref('password')
    //], 'As senhas precisam ser iguais')
  })





export default function CreateMessage({session}) {

    const router = useRouter()

    const {register,handleSubmit, formState} = useForm({
        resolver: yupResolver(createAnuncioFormSchema)
    })

    const {errors} = formState


    const handleCreateMessage: SubmitHandler<CreateMessageFormData> = async (values) => {

        await saveMessage(values)
       
    }

    
    async function saveMessage(message) { 
        
        const response = await fetch('/api/messages/create', {
            method: "POST",
            body: JSON.stringify(message)
        })
        
        
        if(!response.ok) {
            console.log(response)
            throw new Error(response.statusText)
        }

        if(response.ok) {
            router.push('/dashboard/mensagens')
        }
    
        return await response.json()
    }


 

    return (
        <Box>
            <Header/>
            
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">

                <Siderbar/>

                <Box 
                as="form"
                flex="1" 
                borderRadius={8} 
                bg="gray.800" p={["6","8"]}
                onSubmit={handleSubmit(handleCreateMessage)}
                >

                <Heading size="lg" fontWeight="normal">Enviar Mensagem</Heading>

                <Divider my="6" borderColor="gray.700"/>


                <VStack spacing="8">
                <Heading size="sm" fontWeight="bold" color="gray.300" alignSelf="flex-start">DADOS DE CONTATO</Heading>
                    <SimpleGrid minChildWidth="300px" spacing={["6","8"]} width="100%">
                        
                        <Input name="name" label="Nome"  error={errors.name} {...register('name')}/>
                        <Input name="email" label="E-mail" error={errors.email} {...register('email')}/>
                        <Input name="whatsapp" label="Whatsapp" error={errors.whatsapp} {...register('whatsapp')}/>
                        <Box>
                        <Text size="sm" fontWeight="bold" color="whiteAlpha" mb="2">Mensagem</Text>
                        <Textarea
                            
                            name="mensagem"
                            resize="none"
                            focusBorderColor="yellow.400"
                            bgColor="gray.900"
                            variant="filled"
                            maxLength={70}
                            _hover={{
                                bgColor: 'gray.900'
                            }}
                            size="lg"
                            {...register('mensagem')}
                        >

                        </Textarea>
                        </Box>
                    </SimpleGrid>

                
                </VStack>

                <Flex mt="8" justify="flex-end">
                    <HStack spacing="4">
                    <Link href="/dashboard/anuncios" passHref><Button colorScheme="whiteAlpha">Cancelar</Button></Link>
                        <Button type="submit" colorScheme="blue" isLoading={formState.isSubmitting}>Salvar</Button>
                    </HStack>
                </Flex>
                </Box>
            </Flex>
        </Box>
    )
}


export const getServerSideProps: GetServerSideProps = async({req}) => {


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
          session
        },
    }
  }