import { Icon, Box, Flex, VStack, Heading, SimpleGrid, Divider, HStack, Button, Textarea, Text, Input as ChakraInput, FormLabel, FormControl, FormErrorMessage} from "@chakra-ui/react";
import {Input} from '../Form/Input'

import Link from 'next/link'
import CurrencyInput from 'react-currency-input-field';
import {useForm, SubmitHandler} from 'react-hook-form'
import * as yup from 'yup';

import {RiCheckFill, RiWhatsappLine} from 'react-icons/ri'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.umd';
import { HiCheckCircle } from "react-icons/hi";

const phoneRegExp = /^[0-9]{2}?[0-9]{4,5}[0-9]{4}$/


type CreateMessageFormData = {
    name: string;
    email: string;
    whatsapp: string;
    proposta: string;
    veiculo?: string;
  }


  interface MessageProps {
      veiculo: string;
      valor: string;
  }




  const createMessageSchema = yup.object({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().required('E-mail obrigatório').email(),
    whatsapp: yup.string().required('Informe um contato para whatsapp')
    .matches(phoneRegExp, "Informe um número de celular válido - Ex: 11959944499")
    .nullable(),
    proposta: yup.string().required('Informe o valor da proposta'),
  })





export default function FormContact({veiculo, valor}: MessageProps) {

   
    const {register,handleSubmit, formState} = useForm({
        resolver: yupResolver(createMessageSchema)
    })

    const {errors} = formState


    const handleCreateMessage: SubmitHandler<CreateMessageFormData> = async (values) => {
        const message = {...values, veiculo, tipo: 'Compra'}

        await saveMessage(message)
       
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
           
        }
    
        return await response.json()
    }




    return (
        <Box width="100%" height="100%">
            {formState.isSubmitted ? (
            <Flex direction="column" height="350px" align="center" justify="center" backgroundColor="gray.900" borderRadius={8}>
                <Heading size="md" fontWeight="normal" color="gray.50">Obrigado pelo interesse, em breve entraremos em contato! <Icon as={HiCheckCircle} color="green.400"></Icon></Heading>
            </Flex>
            ) : (
            
                <Box 
                as="form"
                flex="1" 
                borderRadius={8} 
                bg="gray.900" 
                p={8}
               
                onSubmit={handleSubmit(handleCreateMessage)}
                width="100%"
                height="100%"
                
                display={formState.isSubmitted? 'none': 'flex'}
                
                flexDirection="column"
                justifyContent="space-between"
                
                
                >
                <VStack align="flex-start" width="100%" flex="1">
                <Heading size="xl" fontFamily="Roboto, sans-serif" fontWeight="bold" color="gray.50">{`${valor},00`}</Heading>

                <Divider my="3" borderColor="gray.500"/>
                <Heading size="sm" color="gray.500" mb={10}>ENVIE UMA MENSAGEM AO VENDEDOR</Heading>

                <VStack width="100%" justify="space-around" flex="1">
               
                    
                    
                        <FormControl isInvalid={!!errors.name}>
                            <FormLabel 
                            htmlFor="name"
                            color="gray.50"
                            >
                                Nome
                            </FormLabel>
                            
                            <ChakraInput
                             {...register('name')}
                             color="gray.900"
                            focusBorderColor="yellow.400"  
                            variant="filled" 
                            name="name" 
                            id="name" 
                            type="text" 
                            size="lg"
                            _focus={{
                                background: 'gray.50'
                            }}
                            bg="gray.50"
                            _hover={{
                                background: 'gray.50'
                            }}
                            />
                         
                            {!!errors.name && (
                                    <FormErrorMessage>
                                    {errors.name.message}
                                    </FormErrorMessage>
                                 )}
                            
                           </FormControl>
                        

                        <FormControl isInvalid={!!errors.whatsapp}>
                            <FormLabel 
                            htmlFor="whatsapp"
                            color="gray.50"
                            >
                                Whatsapp
                            </FormLabel>
                            
                            <ChakraInput
                             {...register('whatsapp')}
                             color="gray.900"
                             bg="gray.50"
                            focusBorderColor="yellow.400"  
                            variant="filled" 
                            name="whatsapp" 
                            id="whatsapp" 
                            type="text" 
                            size="lg"
                            _focus={{
                                background: 'gray.50'
                            }}
                            _hover={{
                                background: 'gray.50'
                            }}
                            />
                         
                            {!!errors.whatsapp && (
                                    <FormErrorMessage>
                                    {errors.whatsapp.message}
                                    </FormErrorMessage>
                                 )}
                            
                           </FormControl>


                        <FormControl isInvalid={!!errors.email}>
                            <FormLabel 
                            htmlFor="email"
                            color="gray.50"
                            >
                                E-mail
                            </FormLabel>
                            
                            <ChakraInput
                             {...register('email')}
                             color="gray.900"
                             bg="gray.50"
                            focusBorderColor="yellow.400"  
                            variant="filled" 
                            name="email" 
                            id="email" 
                            type="text" 
                            size="lg"
                            _focus={{
                                background: 'gray.50'
                            }}
                            _hover={{
                                background: 'gray.50'
                            }}
                            />
                         
                            {!!errors.email && (
                                    <FormErrorMessage>
                                    {errors.email.message}
                                    </FormErrorMessage>
                                 )}
                            
                           </FormControl>

                        
                        <FormControl isInvalid={!!errors.proposta}>
                            <FormLabel 
                            htmlFor="proposta"
                            color="gray.50"
                            >
                                Proposta Inicial
                            </FormLabel>
                            
                            <ChakraInput
                             {...register('proposta')}
                            as={CurrencyInput}
                            bg="gray.50"
                            focusBorderColor="yellow.400"
                            color="gray.900"  
                            variant="filled" 
                            name="proposta" 
                            id="proposta" 
                            type="text" 
                            size="lg"
                            allowNegativeValue={false}
                            disableAbbreviations={true}
                            allowDecimals={false}
                            intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                            _focus={{
                                background: 'gray.50'
                            }}
                            _hover={{
                                background: 'gray.50'
                            }}
                            />
                         
                            {!!errors.proposta && (
                                    <FormErrorMessage>
                                    {errors.proposta.message}
                                    </FormErrorMessage>
                                 )}
                            
                           </FormControl>
                        
                       

                        
                     
                        
                 
                </VStack>
                
                </VStack>

               
                    <HStack spacing="4" justify="flex-end">
                    <Link href={`https://api.whatsapp.com/send?phone=5511959943034&text=Ol%C3%A1!%20Fiquei%20interessado%20no%20ve%C3%ADculo%3A%20${veiculo}%2C%20vamos%20negociar%3F`}><Button fontSize="md" size="md" leftIcon={<Icon as={RiWhatsappLine} fontSize="20"/>} colorScheme="green">Enviar no WhatsApp</Button></Link>
                        <Button size="md" fontSize="md" type="submit" colorScheme="blue" isLoading={formState.isSubmitting}>Enviar</Button>
                    </HStack>
               
                </Box>
            )
            }
        </Box>
    )
}

