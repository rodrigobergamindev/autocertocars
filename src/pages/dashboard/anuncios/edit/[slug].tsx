import { Box, Flex, VStack, Heading, SimpleGrid, Divider, HStack, Button, Textarea, Text} from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import { Input } from "../../../../components/Form/Input";
import  Header  from "../../../../components/Header";
import  Siderbar  from "../../../../components/Sidebar/index"
import Link from 'next/link'

import {useForm, SubmitHandler} from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import {GetServerSideProps} from 'next'
import { getSession } from "next-auth/client"
import { PrismaClient } from '@prisma/client'


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


interface AnuncioProps {

    anuncio: {
        slug: string;
        name: string;
        ano_fabricacao: string;
        valor: string;
        marca: string;
        modelo: string;
        versao?: string;
        numero_portas?: string;
        cor?: string;
        cores_internas?: string;
        combustivel?: string;
        carroceria?: string;
        potencia?: string;
        transmissao?: string;
        quilometragem?: string;
        chave_copia?: string;
        laudo_cautelar?: string;
        manual_do_proprietario?: string;
        observacoes?: string;
        data_de_criacao: Date
    }
    
}





export default function EditVehicle({anuncio}: AnuncioProps, {session}) {

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

                <Heading size="lg" fontWeight="normal">Editar Anúncio</Heading>

                <Divider my="6" borderColor="gray.700"/>


                <VStack spacing="8">
                <Heading size="sm" fontWeight="bold" color="gray.300" alignSelf="flex-start">INFORMAÇÕES DO VEÍCULO</Heading>
                    <SimpleGrid minChildWidth="300px" spacing={["6","8"]} width="100%">
                        
                        <Input name="name" label="Nome"  error={errors.name} {...register('name')} defaultValue={anuncio.name}/>
                        <Input name="ano_fabricacao" label="Ano Fabricação" error={errors.ano_fabricacao} {...register('ano_fabricacao')} defaultValue={anuncio.ano_fabricacao}/>
                        <Input name="marca" label="Marca" error={errors.marca} {...register('marca')} defaultValue={anuncio.marca}/>
                        <Input name="modelo" label="Modelo" error={errors.modelo} {...register('modelo')} defaultValue={anuncio.modelo} />
                        <Input name="versao" label="Versão" error={errors.versao} {...register('versao')} defaultValue={anuncio.versao}/>
                        <Input name="numero_portas" label="Número de Portas" {...register('numero_portas')} defaultValue={anuncio.numero_portas}/>
                        <Input name="cor" label="Cor" {...register('cor')} defaultValue={anuncio.cor}/>
                        <Input name="cores_internas" label="Cores Interiores" {...register('cores_internas')} defaultValue={anuncio.cores_internas} />
                        <Input name="combustivel" label="Combustível" {...register('combustivel')} defaultValue={anuncio.combustivel}/>
                        <Input name="carroceria" label="Carroceria" {...register('carroceria')} defaultValue={anuncio.carroceria}/>
                        <Input name="potencia" label="Potência" {...register('potencia')} defaultValue={anuncio.potencia}/>
                        <Input name="transmissao" label="Transmissão" {...register('transmissao')} defaultValue={anuncio.transmissao} />
                        <Input name="quilometragem" label="Quilometragem" {...register('quilometragem')} defaultValue={anuncio.quilometragem} />
                        <Input name="valor" label="Valor"  error={errors.valor} {...register('valor')} defaultValue={anuncio.valor}/>

                        <Input name="image" label="Imagens" type="file"  error={errors.image} {...register('image')} />
                    </SimpleGrid>

                    <Heading size="sm" fontWeight="bold" color="gray.300" alignSelf="flex-start">OUTRAS INFORMAÇÕES</Heading>
                    <SimpleGrid minChildWidth="300px" spacing={["6","8"]} width="100%">
                    

                        <Input name="chave_copia" label="Chave Cópia" {...register('chave_copia')} defaultValue={anuncio.chave_copia}/>
                        <Input name="laudo_cautelar" label="Laudo Cautelar" {...register('laudo_cautelar')} defaultValue={anuncio.laudo_cautelar}/>
                        <Input name="manual_do_proprietario" label="Manual do Proprietário" {...register('manual_do_proprietario')} defaultValue={anuncio.manual_do_proprietario}/>
                        
                        <Box>
                        <Text size="sm" fontWeight="bold" color="whiteAlpha" mb="2">Observações</Text>
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
                        defaultValue={anuncio.observacoes}
                    >

                    </Textarea>

                     
                        </Box>

                    </SimpleGrid>

                
                </VStack>

                <Flex mt="8" justify="flex-end">
                    <HStack spacing="4">
                    <Link href="/dashboard/anuncios" passHref><Button colorScheme="whiteAlpha">Cancelar</Button></Link>
                        <Button type="submit" colorScheme="blue" isLoading={formState.isSubmitting}>Salvar</Button>
                        <Button type="submit" colorScheme="red" isLoading={formState.isSubmitting}>Excluir</Button>
                    </HStack>
                </Flex>
                </Box>
            </Flex>
        </Box>
    )
   
}


export const getServerSideProps: GetServerSideProps = async ({params, req}) => {

    const {slug} = params
    const prisma = new PrismaClient();

    const data = await prisma.anuncio.findUnique({
        where: {
          slug: slug as string
        },
      })

      const anuncio = JSON.parse(JSON.stringify(data))

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
        anuncio,
        session
        }
    }
}