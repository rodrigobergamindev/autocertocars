import { Icon, Image, FormLabel, FormControl, FormErrorMessage, Grid, Box, Flex, VStack, 
    Heading, SimpleGrid, Divider, HStack, Button, Textarea, Text, Input as ChakraInput, Select} from "@chakra-ui/react";


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
import { RiCloseLine, RiUploadCloudLine, RiUploadLine} from "react-icons/ri";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';


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
    chave_copia: yup.string().required('Obrigatório'),
    numero_portas: yup.string(),
    cores_internas: yup.string(),
    potencia: yup.string(),
    transmissao: yup.string(),
    quilometragem: yup.string(),
    observacoes: yup.string(),
    manual_do_proprietario: yup.string(),
    laudo_cautelar: yup.string(),
    image: yup.mixed()
    
        
  })


  


export default function CreateVehicle({session}) {

    const router = useRouter()

    const {register,handleSubmit, formState} = useForm({
        resolver: yupResolver(createAnuncioFormSchema)
    })

    const {errors} = formState

    const [imagesPreview, setImagesPreview] = useState<ImagePreview[]>([])

















    const handleCreateAnuncio: SubmitHandler<CreateAnuncioFormData> = async (values) => {

        console.log(values)
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


        
    async function handleRemoveImage(image: ImagePreview) {

        
        if(image) {
           const newImages = imagesPreview.filter(newImage => newImage.file.name != image.file.name)
           setImagesPreview(newImages)
        }

       
       
   }

   const handleOnDragEnd = (result: DropResult) => {
       if(!result.destination) return;
       
       const {source, destination} = result

       if (destination.droppableId === source.droppableId && destination.index === source.index) {
        console.log("they're equal");
        return;
      }
       
       const newImages = Array.from(imagesPreview)
       const [reorderedItem] = newImages.splice(source.index, 1)
       newImages.splice(destination.index, 0, reorderedItem)
       
       
       setImagesPreview(newImages)
       
       
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
                        <FormControl isInvalid={!!errors.combustivel}>
                        <FormLabel 
                        htmlFor="combustivel"
                        >
                            Combustível
                        </FormLabel>
                        <Select name="combustivel" variant="filled" bg="gray.900" focusBorderColor="yellow.500" defaultValue="Flex"  _hover={{bgColor: 'gray.900'}} {...register('combustivel')}>
                                    <option style={{backgroundColor:"#1F2029"}} value="Flex">Flex</option>
                                    <option style={{backgroundColor:"#1F2029"}} value="Gasolina">Gasolina</option>
                                    <option style={{backgroundColor:"#1F2029"}} value="Diesel">Diesel</option>
                                    <option style={{backgroundColor:"#1F2029"}} value="Híbrido">Híbrido</option>
                                    <option style={{backgroundColor:"#1F2029"}} value="Elétrico">Elétrico</option>
                                    <option style={{backgroundColor:"#1F2029"}} value="GNV">GNV</option>
                            </Select>

                            {!!errors.combustivel && (
                                <FormErrorMessage>
                                {errors.combustivel.message}
                                </FormErrorMessage>
                             )}
                            
                              
                        </FormControl>
                        

                        <FormControl isInvalid={!!errors.carroceria}>
                        <FormLabel 
                        htmlFor="carroceria"
                        >
                            Carroceria
                        </FormLabel>
                        <Select name="carroceria" variant="filled" bg="gray.900" focusBorderColor="yellow.500" defaultValue="Hatch"  _hover={{bgColor: 'gray.900'}} {...register('carroceria')}>
                                    <option style={{backgroundColor:"#1F2029"}} value="Hatch">Hatch</option>
                                    <option style={{backgroundColor:"#1F2029"}} value="SUV">SUV</option>
                                    <option style={{backgroundColor:"#1F2029"}} value="Picape">Picape</option>
                                    <option style={{backgroundColor:"#1F2029"}} value="Sedan">Sedan</option>
                            </Select>

                            {!!errors.carroceria && (
                                <FormErrorMessage>
                                {errors.carroceria.message}
                                </FormErrorMessage>
                             )}
                            
                              
                        </FormControl>

                        <Input name="potencia" label="Potência" {...register('potencia')}/>
                        

                        <FormControl isInvalid={!!errors.transmissao}>
                        <FormLabel 
                        htmlFor="transmissao"
                        >
                            Transmissão
                        </FormLabel>
                        <Select name="transmissao" variant="filled" bg="gray.900" focusBorderColor="yellow.500" defaultValue="Manual"  _hover={{bgColor: 'gray.900'}} {...register('transmissao')}>
                                    <option style={{backgroundColor:"#1F2029"}} value="Manual">Manual</option>
                                    <option style={{backgroundColor:"#1F2029"}} value="Automatizado">Automatizado</option>
                                    <option style={{backgroundColor:"#1F2029"}} value="Automático">Automático</option>
                                    <option style={{backgroundColor:"#1F2029"}} value="CVT">CVT</option>
                            </Select>

                            {!!errors.transmissao && (
                                <FormErrorMessage>
                                {errors.transmissao.message}
                                </FormErrorMessage>
                             )}
                            
                              
                        </FormControl>

                        <Input name="quilometragem" label="Quilometragem" {...register('quilometragem')} />
                        <Input name="valor" label="Valor"  error={errors.valor} {...register('valor')}/>

                    </SimpleGrid>

                    <Heading size="sm" fontWeight="bold" color="gray.300" alignSelf="flex-start">OUTRAS INFORMAÇÕES</Heading>
                    <SimpleGrid minChildWidth="240px" spacing={["6","8"]} width="100%">
                        
                        <FormControl isInvalid={!!errors.laudo_cautelar}>
                        <FormLabel 
                        htmlFor="laudo_cautelar"
                        >
                            Laudo Cautelar
                        </FormLabel>
                        <Select name="laudo_cautelar" variant="filled" bg="gray.900" focusBorderColor="yellow.500" defaultValue="Aprovado"  _hover={{bgColor: 'gray.900'}} {...register('laudo_cautelar')}>
                                    <option style={{backgroundColor:"#1F2029"}} value="Aprovado">Aprovado</option>
                                    <option style={{backgroundColor:"#1F2029"}} value="Reprovado">Reprovado</option>
                                    <option style={{backgroundColor:"#1F2029"}} value="Pendente">Pendente</option>
                            </Select>

                            {!!errors.laudo_cautelar && (
                                <FormErrorMessage>
                                {errors.laudo_cautelar.message}
                                </FormErrorMessage>
                             )}
                            
                              
                        </FormControl>
                        
                            
                       <FormControl isInvalid={!!errors.manual_do_proprietario}>
                        <FormLabel 
                        htmlFor="manual_do_proprietario"
                        >
                            Manual do Proprietário
                        </FormLabel>
                        <Select name="manual_do_proprietario" variant="filled" bg="gray.900" focusBorderColor="yellow.500" defaultValue="Sim"  _hover={{bgColor: 'gray.900'}} {...register('manual_do_proprietario')}>
                                    <option style={{backgroundColor:"#1F2029"}} value="Sim">Sim</option>
                                    <option style={{backgroundColor:"#1F2029"}} value="Não">Não</option>
                            </Select>

                            {!!errors.manual_do_proprietario && (
                                <FormErrorMessage>
                                {errors.manual_do_proprietario.message}
                                </FormErrorMessage>
                             )}
                            
                              
                        </FormControl>

                        
                        <FormControl isInvalid={!!errors.chave_copia}>
                        <FormLabel 
                        htmlFor="chave_copia"
                        >
                            Chave Cópia
                        </FormLabel>
                        <Select name="chave_copia" variant="filled" bg="gray.900" focusBorderColor="yellow.500" {...register('chave_copia')}  _hover={{bgColor: 'gray.900'}} defaultValue="Sim">
                                    <option style={{backgroundColor:"#1F2029"}} value="Sim">Sim</option>
                                    <option style={{backgroundColor:"#1F2029"}} value="Não">Não</option>
                            </Select>

                            {!!errors.chave_copia && (
                                <FormErrorMessage>
                                {errors.chave_copia.message}
                                </FormErrorMessage>
                             )}
                            
                              
                        </FormControl>
                        


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
                        <FormLabel 
                        htmlFor="image"
                        >
                            <Box display="flex" justifyContent="center" alignItems="center">
                          <Box mr={5} maxWidth="240px" bg="blue.500" borderRadius="5px" p={2} display="flex" alignItems="center" justifyContent="center" cursor="pointer" transition="all 0.3s ease-in-out" _hover={{opacity: 0.88}}>
                              <Icon mr={3}  alignSelf="center" w={7} h={7} as={RiUploadCloudLine}/>
                              <Text fontSize="20px">Escolher imagens</Text>
                              
                              </Box>
                              <Text fontSize="20px">{imagesPreview.length} imagens selecionadas</Text>
                              </Box>
                        
                        </FormLabel>
                        <ChakraInput p={1} 
                            name="image" 
                            id="image" 
                            type="file" 
                            multiple
                            variant="filled"
                            accept="image/jpeg, image/png, image/jpg"
                            bgColor="gray.900"
                            display="none"
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
                        
                        <DragDropContext onDragEnd={handleOnDragEnd}>
                            <Droppable droppableId="images" >
                                {(provided) => (
                                    imagesPreview.length > 0 && 
                                    <Grid 
                                    {...provided.droppableProps} 
                                    ref={provided.innerRef}
                                   templateColumns="repeat(1, 1fr)"
                                    mt={6} border="2px dashed" bg="whiteAlpha" borderColor="blue.500"  p={2} gap={3}
                                    >
                                    {imagesPreview.map((image, index) => {
                                       
                                        return (
                                            <Draggable key={`${image.file.name}-${index}`} draggableId={`${image.file.name}-${index}`} index={index}>
                                                {(provided) => (
                                                    <Box 
                                                    ref={provided.innerRef} 
                                                    {...provided.draggableProps} 
                                                    {...provided.dragHandleProps}
                                                      
                                                      maxHeight="350px"
                                                      width="100%" 
                                                      height="100%" 
                                                      cursor="pointer">
                                                        <Icon cursor="default" onClick={() => handleRemoveImage(image)} as={RiCloseLine} backgroundColor="red.400" color="white" position="absolute" zIndex="1" w={5} h={5}/>
                                                        <Image src={image.preview as string} alt={image.file.name} objectFit="cover" width="100%" height="100%" transition= "all 0.3s ease-in-out" 
                                                        _hover={{opacity: 0.7}}/>
                                                    </Box>
                                                )}
                                            </Draggable>
                                        )
                                    })}
                                    {provided.placeholder}
                                    </Grid>
                                    
                                )}
                        
                            </Droppable>
                        </DragDropContext>
                     
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