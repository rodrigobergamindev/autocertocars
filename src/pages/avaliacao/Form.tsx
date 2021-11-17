import { Select, Icon, Box, Flex, VStack, Heading, SimpleGrid, Divider, HStack, Button, Textarea, Text, Input as ChakraInput, FormLabel, FormControl, FormErrorMessage} from "@chakra-ui/react";


import Link from 'next/link'
import CurrencyInput from 'react-currency-input-field';
import {useForm, SubmitHandler} from 'react-hook-form'
import * as yup from 'yup';

import {RiCheckFill, RiWhatsappLine} from 'react-icons/ri'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.umd';
import { HiCheckCircle } from "react-icons/hi";
import {useState} from 'react'
import InputMask from 'react-input-mask';


const phoneRegExp = /^[0-9]{2}?[0-9]{4,5}[0-9]{4}$/


type CreateAvaliacaoFormData = {
    name: string;
    email: string;
    whatsapp: string;
    placa: string;
    marca: string;
    modelo: string;
    ano: string;
    quilometragem: string;
    veiculo: string;
    versao: string;
  }





  const createAvaliacaoSchema = yup.object({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().required('E-mail obrigatório').email(),
    whatsapp: yup.string().required('Informe um contato para whatsapp')
    .matches(phoneRegExp, "Informe um número de celular válido - Ex: 11959944499")
    .nullable(),
    placa: yup.string().required('Informe o final da placa do veículo'),
    marca: yup.string().required('Marca obrigatória'),
    modelo: yup.string().required('Modelo obrigatório'),
    ano: yup.string().required('Ano obrigatório'),
    quilometragem: yup.string().required('Informe a KM'),
    veiculo: yup.string().required('Informe o veículo de interesse'),
    versao: yup.string().required('Informe o veículo de interesse')
  })





export default function FormAvaliacao({anuncios}) {

    const [sentMessage, setSent] = useState(false)
   
    const {register,handleSubmit, formState} = useForm({
        resolver: yupResolver(createAvaliacaoSchema)
    })

    const {errors} = formState


    const handleCreateAvaliacao: SubmitHandler<CreateAvaliacaoFormData> = async (values) => {
        
        const message = {...values}
        console.log(message)
        await saveMessage(message)
       
    }

    
    async function saveMessage(message) { 
        
        const response = await fetch('/api/avaliacoes/create', {
            method: "POST",
            body: JSON.stringify(message)
        })
        
        
        if(!response.ok) {
            console.log(response)
            throw new Error(response.statusText)
        }

        if(response.ok) {
           setSent(true)
        }
    
        return await response.json()
    }




    return (
        <Box width="100%" height="100%">
            {sentMessage ? (
            <Flex direction="column" height="100%" minHeight="650px" align="center" justify="center" backgroundColor="gray.900" borderRadius={8} p={25}>
                <Heading size="2xl" fontWeight="normal" align="center" color="gray.50">Obrigado pelo interesse, em breve entraremos em contato! <Icon as={HiCheckCircle} color="green.400"/></Heading>
            </Flex>
            ) : (
            
                <Box 
                as="form"
                flex="1" 
                bg="gray.900"
                p={8}
                
                onSubmit={handleSubmit(handleCreateAvaliacao)}
                width="100%"
                
                
                display={sentMessage? 'none': 'flex'}
                
                flexDirection="column"
                justifyContent="space-between"

                borderRadius="10px"
                
                >
                <VStack align="flex-start" width="100%" flex="1">
                
                <VStack mb={5} width="100%" flex="1" align="center">
                <Heading size="xl" fontFamily="Roboto, sans-serif" fontWeight="bold" color="gray.50">AVALIAÇÃO VEICULAR</Heading>

                <Divider my="3" borderColor="gray.500"/>
                <Heading size="sm" color="gray.500" mb={10}>PREENCHA OS CAMPOS CORRETAMENTE</Heading>
                </VStack>

                <SimpleGrid minChildWidth="340px" spacing={["6","8"]} width="100%">
               
                    
                    
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
                            {...register('whatsapp')}
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

                           <FormControl isInvalid={!!errors.placa}>
                            <FormLabel 
                            htmlFor="placa"
                            color="gray.50"
                            >
                                Placa
                            </FormLabel>
                            
                            <ChakraInput
                             {...register('placa')}
                             color="gray.900"
                            focusBorderColor="yellow.400"  
                            variant="filled" 
                            name="placa" 
                            id="placa" 
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
                         
                            {!!errors.placa && (
                                    <FormErrorMessage>
                                    {errors.placa.message}
                                    </FormErrorMessage>
                                 )}
                            
                           </FormControl>

                           <FormControl isInvalid={!!errors.marca}>
                            <FormLabel 
                            htmlFor="marca"
                            color="gray.50"
                            >
                                Marca
                            </FormLabel>
                            
                            <ChakraInput
                             {...register('marca')}
                             color="gray.900"
                            focusBorderColor="yellow.400"  
                            variant="filled" 
                            name="marca" 
                            id="marca" 
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
                         
                            {!!errors.marca && (
                                    <FormErrorMessage>
                                    {errors.marca.message}
                                    </FormErrorMessage>
                                 )}
                            
                           </FormControl>


                           <FormControl isInvalid={!!errors.modelo}>
                            <FormLabel 
                            htmlFor="modelo"
                            color="gray.50"
                            >
                                Modelo
                            </FormLabel>
                            
                            <ChakraInput
                             {...register('modelo')}
                             color="gray.900"
                            focusBorderColor="yellow.400"  
                            variant="filled" 
                            name="modelo" 
                            id="modelo" 
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
                         
                            {!!errors.modelo && (
                                    <FormErrorMessage>
                                    {errors.modelo.message}
                                    </FormErrorMessage>
                                 )}
                            
                           </FormControl>

                           <FormControl isInvalid={!!errors.versao}>
                            <FormLabel 
                            htmlFor="versao"
                            color="gray.50"
                            >
                                Versão
                            </FormLabel>
                            
                            <ChakraInput
                             {...register('versao')}
                             color="gray.900"
                            focusBorderColor="yellow.400"  
                            variant="filled" 
                            name="versao" 
                            id="versao" 
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
                         
                            {!!errors.versao && (
                                    <FormErrorMessage>
                                    {errors.versao.message}
                                    </FormErrorMessage>
                                 )}
                            
                           </FormControl>

                           <FormControl isInvalid={!!errors.ano}>
                            <FormLabel 
                            htmlFor="ano"
                            >
                               Ano
                            </FormLabel>
    
                            <ChakraInput
                             {...register('ano')}
                            as={InputMask}
                            bgColor="white" 
                            _hover={{bgColor: 'white'}} 
                            focusBorderColor="yellow.400" 
                            _focus={{bgColor: 'white'}}
                            color="gray.900" 
                            variant="filled" 
                            name="ano" 
                            id="ano" 
                            type="text" 
                            size="lg"
                            mask="9999/9999"
                            
                            />
                          
                            {!!errors.ano && (
                                    <FormErrorMessage>
                                    {errors.ano.message}
                                    </FormErrorMessage>
                                 )}
                            
                           </FormControl>
                            
                           <FormControl isInvalid={!!errors.quilometragem}>
                            <FormLabel 
                            htmlFor="quilometragem"
                            >
                                Quilometragem
                            </FormLabel>
    
                            <ChakraInput
                             {...register('quilometragem')}
                            as={CurrencyInput}
                            bgColor="white" 
                            _hover={{bgColor: 'white'}} 
                            _focus={{bgColor: 'white'}}
                            color="gray.900" 
                            focusBorderColor="yellow.400"  
                            variant="filled" 
                            name="quilometragem" 
                            id="quilometragem" 
                            type="text" 
                            size="lg"
                            groupSeparator="."
                            disableAbbreviations={true}
                            allowNegativeValue={false}
                            />
                          
                            {!!errors.quilometragem && (
                                    <FormErrorMessage>
                                    {errors.quilometragem.message}
                                    </FormErrorMessage>
                                 )}
                            
                           </FormControl>
                        
                           <FormControl isInvalid={!!errors.veiculo}>
                            <FormLabel 
                            htmlFor="veiculo"
                            >
                                Selecione o veículo de interesse:
                            </FormLabel>
                            
                                <Select size="lg" id="veiculo" name="veiculo" variant="filled" bg="white" color="gray.900" _focus={{backgroundColor:'white'}} focusBorderColor="yellow.500" {...register('veiculo')}>
                                        {!!anuncios && anuncios.map(anuncio => {
                                            return (
                                                <option key={anuncio.id}  value={`${anuncio.name} - ${anuncio.ano_fabricacao} - ${anuncio.versao} - ${anuncio.cor}`}>{`${anuncio.name} - ${anuncio.ano_fabricacao} - ${anuncio.versao} - ${anuncio.cor}`}</option>
                                            )
                                        })}
                                </Select>
    
    
                                {!!errors.veiculo && (
                                    <FormErrorMessage>
                                    {errors.veiculo.message}
                                    </FormErrorMessage>
                                 )}
                                
                                  
                            </FormControl>
                        
                </SimpleGrid>
                
                </VStack>

               
                    <HStack spacing="4" justify="flex-end" mt={10}>
                        <Button size="lg" fontSize="xl" type="submit" colorScheme="blue" isLoading={formState.isSubmitting}>Enviar</Button>
                    </HStack>
               
                </Box>
            )
            }
        </Box>
    )
}

