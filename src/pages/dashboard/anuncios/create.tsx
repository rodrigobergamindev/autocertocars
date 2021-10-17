import { Icon, Image, FormLabel, FormControl, FormErrorMessage, Grid, Box, Flex, VStack, Heading, SimpleGrid, Divider, HStack, Button, Textarea, Text, Input as ChakraInput} from "@chakra-ui/react";


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
import {useState} from 'react'



type CreateAnuncioFormData = {
    marca: string;
    modelo: string;
    ano_fabricacao: string;
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

type ImagePreview = {
    preview: string | ArrayBuffer;
    file: File;
}






  const createAnuncioFormSchema = yup.object({
    marca: yup.string().required('Marca obrigatória'),
    ano_fabricacao: yup.string().required('Preencha com o ano do veículo'),
    modelo: yup.string().required('Modelo Obrigatório'),
    valor: yup.string().required('Preencha com o valor'),
    versao: yup.string(),
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

    const router = useRouter()

    const {register,handleSubmit, formState} = useForm({
        resolver: yupResolver(createAnuncioFormSchema)
    })

    const {errors} = formState

    const [imagesPreview, setImagesPreview] = useState<ImagePreview[]>([])


    const handleCreateAnuncio: SubmitHandler<CreateAnuncioFormData> = async (values) => {

        
        const saveImages = await handleUpload(imagesPreview)
        if(saveImages && values){
            const anuncio = {...values, image: saveImages}
            await saveAnuncio(anuncio)
        }
       
    }

    
    async function saveAnuncio(anuncio) { 
        
        const response = await fetch('/api/anuncios/create', {
            method: "POST",
            body: JSON.stringify(anuncio)
        })
        
        
        if(!response.ok) {
            console.log(response)
            throw new Error(response.statusText)
        }

        if(response.ok) {
            router.push('/dashboard/anuncios')
        }
    
        return await response.json()
    }


    const handleUpload = async (images) => {
        
        if(images) {
            
        
        const result = await insert(images)
                        
        if(result instanceof Error) {
            console.log(`${result.name} - ${result.message}`)
        }
        const response = Promise.all(result)
        return await response
            
        }


    }

    const handleImage =  (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const files = Array.from(event.target.files)
        
        files.map((file: File) => {
            
            const reader = new FileReader()
            const myImage = reader.readAsDataURL(file)
            reader.onloadend = () => {
                const preview = reader.result;
                const image = {preview, file}
                setImagesPreview((prevImages) =>  [...prevImages, image])
    
                
            };
            return null
        })
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
                <Heading size="sm" fontWeight="bold" color="gray.300" alignSelf="flex-start">INFORMAÇÕES DO VEÍCULO</Heading>
                    <SimpleGrid minChildWidth="240px" spacing={["6","8"]} width="100%">
                        
                        <Input name="marca" label="Marca" error={errors.marca} {...register('marca')}/>
                        <Input name="modelo" label="Modelo" error={errors.modelo} {...register('modelo')}/>
                        <Input name="ano_fabricacao" label="Ano Fabricação" error={errors.ano_fabricacao} {...register('ano_fabricacao')}/>
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
                    </SimpleGrid>

                    <Heading size="sm" fontWeight="bold" color="gray.300" alignSelf="flex-start">OUTRAS INFORMAÇÕES</Heading>
                    <SimpleGrid minChildWidth="240px" spacing={["6","8"]} width="100%">
                        

                        <Input name="chave_copia" label="Chave Cópia" {...register('chave_copia')}/>
                        <Input name="laudo_cautelar" label="Laudo Cautelar" {...register('laudo_cautelar')}/>
                        <Input name="manual_do_proprietario" label="Manual do Proprietário" {...register('manual_do_proprietario')}/>
                        

                    </SimpleGrid>
                    
                    <SimpleGrid minChildWidth="240px" spacing={["6","8"]} width="100%">
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
                        >

                        </Textarea>
                        </Box>
                        
                       

                    </SimpleGrid>

                    <SimpleGrid minChildWidth="240px" spacing={["6","8"]} width="100%">
                    
                
                        
                        <Box mt={6} display="flex" flexDirection="column"  p={1} gap={2}>

                        <FormControl isInvalid={!!errors.image}>
                        <FormLabel htmlFor="image">Imagens</FormLabel>
                        <ChakraInput p={1} 
                            name="image" 
                            id="image" 
                            type="file" 
                            multiple
                            variant="filled"
                            accept="image/jpeg, image/png, image/jpg"
                            bgColor="gray.900"
                            _hover={{
                                bgColor: 'gray.900'
                            }}
                            size="lg" {...register('image')} 
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleImage(event)}
                            />

                            {!!errors.image && (
                                <FormErrorMessage>
                                {errors.image.message}
                                </FormErrorMessage>
                             )}
                        </FormControl>
                        {imagesPreview.length > 0 && <Grid mt={6} templateColumns="repeat(4, 1fr)" border="3px solid" bg="whiteAlpha" borderColor="blue.500" borderRadius="5px" p={2} gap={3}>
                            {imagesPreview.map((image, index) => {
                               
                                return (
                                    <Box key={index} maxWidth="250px" maxHeight="250px" width="100%" height="100%">
                                       <Image src={image.preview as string} alt={image.file.name} objectFit="cover" width="100%" height="100%" transition= "all 0.3s ease-in-out" 
                                       _hover={{
                                       opacity: 0.7
                                        }}/>
                                    </Box>
                                )
                            })}
                            </Grid>}
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