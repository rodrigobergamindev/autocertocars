import { Box, Flex, VStack, Heading, SimpleGrid, Divider, HStack, Button, Textarea, Text} from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import { Input } from "../../../components/Form/Input";
import  Header  from "../../../components/Header";
import  Siderbar  from "../../../components/Sidebar/index"
import Link from 'next/link'

import {useForm, SubmitHandler} from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { ChangeEventHandler } from 'react'

import { getSession } from "next-auth/client"
import { GetServerSideProps } from 'next'

type CreateAnuncioFormData = {
    name: string;
    ano_fabricacao: string;
    marca: string;
    modelo: string;
    versao: string;
    numero_portas: string;
    cor: string;
    cores_internas: string;
    combustivel: string;
    carroceria: string;
    potencia: string;
    transmissao: string;
    quilometragem: string;
    valor: string;
    chave_copia: string;
    laudo_cautelar: string;
    manual_do_proprietario: string;
    observacoes: string;
    image: FileList;

  }




  const createAnuncioFormSchema = yup.object({
    name: yup.string().required('Nome obrigatório'),
    marca: yup.string().required('Marca obrigatória'),
    ano_fabricacao: yup.string().required('Preencha com o ano do veículo'),
    modelo: yup.string().required('Modelo Obrigatório'),
    valor: yup.string().required('Preencha com o valor'),
    versao: yup.string().required('Preencha com a vesão'),
    cor: yup.string(),
    combustivel: yup.string(),
    carroceria: yup.string(),
    chave_copia: yup.string(),
    numero_portas: yup.string(),
    cores_internas: yup.string(),
    potencia: yup.string(),
    transmissao: yup.string(),
    quilometragem: yup.string(),
    observacoes: yup.string(),
    manual_do_proprietario: yup.string(),
    laudo_cautelar: yup.string(),
    image: yup.
            mixed()
            .required('Envie pelo menos uma imagem')
            .test('name', 'Envie ao menos uma imagem', values => {
                    if(values.length > 0) {
                        return values
                    }
                   
            })
            .test('type', 'Apenas imagens (*JPEG, JPG, PNG)', values => {
                if(values.length > 0) {
                    return values && values[0].type.includes('image')
                }
                
        })


            
        
    //email: yup.string().required('E-mail obrigatório').email(),
    //password: yup.string().required('Senha obrigatória').min(6, 'A senha precisa no mínimo de 6 caracteres'),
    //password_confirmation: yup.string().oneOf([
    //    null, yup.ref('password')
    //], 'As senhas precisam ser iguais')
  })




export default function CreateVehicle({session}) {


    const {register,handleSubmit, formState} = useForm({
        resolver: yupResolver(createAnuncioFormSchema)
    })

    const {errors} = formState


    const handleCreateAnuncio: SubmitHandler<CreateAnuncioFormData> = async (values) => {
        await new Promise(resolve => setTimeout(resolve,1000))
        console.log(values)
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
                onSubmit={handleSubmit(handleCreateAnuncio)}
                >

                <Heading size="lg" fontWeight="normal">Criar Anúncio</Heading>

                <Divider my="6" borderColor="gray.700"/>


                <VStack spacing="8">
                    <SimpleGrid minchildWith={240} spacing={["6","8"]} width="100%">
                        <Heading size="sm" fontWeight="bold" color="gray.300">INFORMAÇÕES DO VEÍCULO</Heading>
                        <Input name="name" label="Nome"  error={errors.name} {...register('name')}/>
                        <Input name="ano_fabricacao" label="Ano Fabricação" error={errors.ano_fabricacao} {...register('ano_fabricacao')}/>
                        <Input name="marca" label="Marca" error={errors.marca} {...register('marca')}/>
                        <Input name="modelo" label="Modelo" error={errors.modelo} {...register('modelo')}/>
                        <Input name="versao" label="Versão" error={errors.versao} {...register('versao')}/>
                        <Input name="numero_portas" label="Número de Portas" {...register('numero_portas')}/>
                        <Input name="cor" label="Cor" {...register('cor')}/>
                        <Input name="cores_internas" label="Cores Interiores" {...register('cores_internas')} />
                        <Input name="combustivel" label="Combustível" {...register('combustivel')}/>
                        <Input name="carroceria" label="Carroceria" {...register('carroceria')}/>
                        <Input name="potencia" label="Potência" {...register('potencia')}/>
                        <Input name="transmissao" label="Transmissão" {...register('transmissao')} />
                        <Input name="quilometragem" label="Quilometragem" {...register('quilometragem')} />
                        <Input name="valor" label="Valor"  error={errors.valor} {...register('valor')}/>

                        <Input name="image" label="Imagens" type="file"  error={errors.image} {...register('image')} />
                    </SimpleGrid>

                    <SimpleGrid minchildWith={240} spacing={["6","8"]} width="100%">
                        <Heading size="sm" fontWeight="bold" color="gray.300">OUTRAS INFORMAÇÕES</Heading>

                        <Input name="chave_copia" label="Chave Cópia" {...register('chave_copia')}/>
                        <Input name="laudo_cautelar" label="Laudo Cautelar" {...register('laudo_cautelar')}/>
                        <Input name="manual_do_proprietario" label="Manual do Proprietário" {...register('manual_do_proprietario')}/>
                        
                        <Text>Observações</Text>
                        <Textarea
                            name="observacoes"
                            resize="none"
                            focusBorderColor="yellow.400"
                            bgColor="gray.900"
                            variant="filled"
                            _hover={{
                                bgColor: 'gray.900'
                            }}
                            size="lg"
                            {...register('observacoes')}
                        >

                        </Textarea>

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
      props: {session},
    }
  }