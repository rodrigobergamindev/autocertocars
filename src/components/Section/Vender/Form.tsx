import { Icon, Box, Flex, VStack, Heading, SimpleGrid, Divider, HStack, Button, Textarea, Text, Input as ChakraInput, FormLabel, FormControl, FormErrorMessage} from "@chakra-ui/react";
import {Input} from '../../Form/Input'

import Link from 'next/link'
import CurrencyInput from 'react-currency-input-field';
import {useForm, SubmitHandler} from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.umd';
import {RiWhatsappLine} from 'react-icons/ri'

const phoneRegExp = /^[0-9]{2}?[0-9]{4,5}[0-9]{4}$/


type CreateMessageFormData = {
    name: string;
    email: string;
    whatsapp: string;
    mensagem: string;
    veiculo?: string;
    ano?: string;
    versao?: string;
    proposta: string;
  }






  const createMessageSchema = yup.object({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().required('E-mail obrigatório').email(),
    whatsapp: yup.string().required('Informe um contato para whatsapp')
    .matches(phoneRegExp, "Informe um número de celular válido - Ex: 11959944499")
    .nullable(),
    proposta: yup.string().required('Informe o valor da proposta'),
    ano: yup.string().required('Informe o ano do veículo')
  })





export default function CreateMessage() {

   
    const {register,handleSubmit, formState} = useForm({
        resolver: yupResolver(createMessageSchema)
    })

    const {errors} = formState


    const handleCreateMessage: SubmitHandler<CreateMessageFormData> = async (values) => {

        await saveMessage({...values, tipo: 'Venda'})
       
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
        <Box>

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
                        <SimpleGrid minChildWidth="140px" spacing={["6","8"]} width="100%">
                        <Input name="whatsapp" label="Whatsapp" error={errors.whatsapp} {...register('whatsapp')}/>
        
                        
                        </SimpleGrid>

                        <SimpleGrid minChildWidth="140px" spacing={["6","8"]} width="100%">
                        <Input name="email" label="E-mail" error={errors.email} {...register('email')}/>

                        <Box>
                        <FormControl isInvalid={!!errors.proposta}>
                            <FormLabel 
                            htmlFor="proposta"
                            >
                                Proposta de Venda
                            </FormLabel>
                            
                            <ChakraInput
                             {...register('proposta')}
                            as={CurrencyInput}
                            bgColor="gray.900" 
                            _hover={{bgColor: 'gray.900'}} 
                            focusBorderColor="yellow.400"  
                            variant="filled" 
                            name="proposta" 
                            id="proposta" 
                            type="text" 
                            size="lg"
                            allowNegativeValue={false}
                            disableAbbreviations={true}
                            allowDecimals={false}
                            intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                            />
                         
                            {!!errors.proposta && (
                                    <FormErrorMessage>
                                    {errors.proposta.message}
                                    </FormErrorMessage>
                                 )}
                            
                           </FormControl>
                        
                        </Box>
                        
                        </SimpleGrid>

                        <SimpleGrid minChildWidth="140px" spacing={["6","8"]} width="100%">
                            <Input name="veiculo" label="Veículo" error={errors.veiculo} {...register('veiculo')}/>
                            <Input name="ano" label="Ano" error={errors.ano} {...register('ano')}/>
                            <Input name="versao" label="Versão" error={errors.versao} {...register('versao')}/>
                        </SimpleGrid>
                        
                    </SimpleGrid>

                
                </VStack>

                <Flex mt="8" justify="flex-end">
                    <HStack spacing="4">
                    <Link href="/dashboard/anuncios" passHref><Button fontSize="xl" size="lg" leftIcon={<Icon as={RiWhatsappLine} fontSize="30"/>} colorScheme="green">Chame no WhatsApp</Button></Link>
                        <Button size="lg" fontSize="xl" type="submit" colorScheme="blue" isLoading={formState.isSubmitting}>Enviar</Button>
                    </HStack>
                </Flex>
                </Box>
        </Box>
    )
}

