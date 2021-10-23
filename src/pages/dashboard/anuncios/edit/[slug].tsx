import { Box, Flex, VStack, Heading, 
    SimpleGrid, Divider, HStack, Button, Textarea, Text, Image,
     Grid, Icon, FormLabel, FormControl, FormErrorMessage, Input as ChakraInput, Select, Spinner} from "@chakra-ui/react";


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
import { deletePhoto, insert } from '../../../api/photos'
import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'

import InputMask from 'react-input-mask';
import CurrencyInput from 'react-currency-input-field';
import {RiCheckLine, RiCloseLine, RiUploadCloudLine} from "react-icons/ri";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';


type CreateAnuncioFormData = {
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
    condicao: string;
    valor: string;
    chave_copia: string;
    laudo_cautelar: string;
    manual_do_proprietario: string;
    observacoes: string;
    image: FileList;

  }




  const createAnuncioFormSchema = yup.object({
    marca: yup.string().required('Marca obrigatória'),
    ano_fabricacao: yup.string().required('Preencha com o ano do veículo'),
    modelo: yup.string().required('Modelo Obrigatório'),
    valor: yup.string().required('Informe o valor do veículo'),
    versao: yup.string().required('Preencha com a vesão'),
    cor: yup.string().required('Preencha com a cor'),
    combustivel: yup.string().required('Selecione uma opção'),
    carroceria: yup.string().required('Selecione uma opção'),
    chave_copia: yup.string().required('Selecione uma opção'),
    numero_portas: yup.string().required('Preencha com o número de portas'),
    cores_internas: yup.string().required('Preencha com as cores internas'),
    potencia: yup.string().required('Informe a potência do veículo'),
    transmissao: yup.string().required('Selecione uma opção'),
    quilometragem: yup.string().required('Informe a quilometragem do veículo'),
    observacoes: yup.string().required('Informe os adicionais'),
    manual_do_proprietario: yup.string().required('Selecione uma opção'),
    laudo_cautelar: yup.string().required('Selecione uma opção'),
    condicao: yup.string().required().required('Selecione uma opção'),
    image: yup.mixed()
            

            
        
    //email: yup.string().required('E-mail obrigatório').email(),
    //password: yup.string().required('Senha obrigatória').min(6, 'A senha precisa no mínimo de 6 caracteres'),
    //password_confirmation: yup.string().oneOf([
    //    null, yup.ref('password')
    //], 'As senhas precisam ser iguais')
  })




type ImagePreview = {
    preview: string | ArrayBuffer;
    file?: File;
}



export default function EditVehicle({anuncio, marcas, session}) {

    const router = useRouter()

    const imagesPreRender = anuncio.image.map(image => {
        const imagePreRender = {
            preview: image
        }
        return imagePreRender
    })


    const [imagesDeleted, setImagesDeleted] = useState([])
    const [imagesPreview, setImagesPreview] = useState<ImagePreview[]>(imagesPreRender)
    const [createMarca, setCreateMarca] = useState(false)
    const [valueCar, setValue] = useState(anuncio.valor)

    const {register,handleSubmit, formState} = useForm({
        resolver: yupResolver(createAnuncioFormSchema)
    })


    const[winReady, setwinReady] = useState(false)

    useEffect(() => {
        setwinReady(true)
    }, [])

    const {errors} = formState
 

    const handleEditAnuncio: SubmitHandler<CreateAnuncioFormData> = async (values) => {

        const response = await handleUpload(imagesPreview)
        const images = response.map(image => {
            if(image.file) {
                delete image.file
            }
            return image.preview
        })
        
        if(values && images.length > 0) {
            const anuncioToUpdate = {...values, image: images, valor: valueCar, slug: anuncio.slug}  
            await saveAnuncio(anuncioToUpdate, imagesDeleted)
        }
        
       
        

    }

    async function saveAnuncio(anuncio, imagesDeleted) { 
        
        const anuncioToUpdate = {anuncio, imagesDeleted}
        const response = await fetch('/api/anuncios/update', {
                method: "PUT",
                body: JSON.stringify(anuncioToUpdate)
            })

                    
        if(!response.ok) {
            throw new Error(response.statusText)
        }

        if(response.ok) {
            router.push('/dashboard/anuncios')
        }
        
    }


    const handleUpload = async (images) => {
        
        
        const result = await insert(images)
                        
        if(result instanceof Error) {
            console.log(`${result.name} - ${result.message}`)
        }
        
        const response = await Promise.all(result)
        console.log(response)
        return response


    }


    async function handleRemoveAnuncio(anuncio) {

        const response = await fetch('/api/anuncios/delete', {
            method: "DELETE",
            body: JSON.stringify(anuncio)
        })
        
        
        if(!response.ok) {
            throw new Error(response.statusText)
        }

        if(response.ok) {
            router.push('/dashboard/anuncios')
        }
        
    }

    
    async function handleRemoveImage(image) {

        
         if(image) {
            
            setImagesDeleted((prevImages) => [...prevImages,image])
            const newImages = imagesPreview.filter(newImage => newImage.preview != image.preview)
            setImagesPreview(newImages)
         }

        
        
    }




/*NEW FUNCTIONS*/


const handleImage =  (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const files = Array.from(event.target.files)
    
    files.map((file: File) => {
        if(file.type.includes("image")) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = () => {
            const preview = reader.result;
            const image = {preview, file}
            setImagesPreview((prevImages) =>  [...prevImages, image])
        }
    }
        return null
    })
}



const handleCreateMarca = (event) => {
    if(event.target.value === 'adicionar') {
        openCreateMarca()
    }
}

function openCreateMarca() {
    setCreateMarca(true)
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

                {formState.isSubmitting ? (
                    <Flex
                    align="center"
                    justify="center"
                    flex="1"
                    height="100vh"
                    >
                    <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                  />
                  <Text ml={4}>Enviando dados...</Text>
                  </Flex>
                ) : (
                formState.isSubmitted ? (
                    <Flex
                    align="center"
                    justify="center"
                    flex="1"
                    height="100vh"
                    >
                    <Icon as={RiCheckLine} fontSize="40px"/> <Text ml={4}>Anúncio criado com sucesso!</Text>
                    </Flex>
                ) : (
                    <Box 
                as="form"
                flex="1" 
                borderRadius={8} 
                bg="gray.800" p={["6","8"]}
                onSubmit={handleSubmit(handleEditAnuncio)}
                >

                <Heading size="lg" fontWeight="normal">Editar Anúncio</Heading>

                <Divider my="6" borderColor="gray.700"/>


                <VStack spacing="8">
                <Heading size="sm" fontWeight="bold" color="gray.300" alignSelf="flex-start">INFORMAÇÕES DO VEÍCULO</Heading>
                    <SimpleGrid minChildWidth="240px" spacing={["6","8"]} width="100%">
                        
                        
                    <FormControl isInvalid={!!errors.marca}>
                        <FormLabel 
                        htmlFor="marca"
                        >
                            Marca
                        </FormLabel>
                        {createMarca ? (
                        <ChakraInput size="lg" name="marca" id="marca"  {...register('marca')} focusBorderColor="yellow.500" _hover={{bgColor: 'gray.900'}} variant="filled" bg="gray.900" type="text"/>
                        ) : (
                            <Select size="lg" id="marca" name="marca" variant="filled" bg="gray.900" focusBorderColor="yellow.500" defaultValue={anuncio.marca_name} {...register('marca')} onChange={e => handleCreateMarca(e)}  _hover={{bgColor: 'gray.900'}}>
                                    {!!marcas && marcas.map((marca, index) => {
                                       
                                        return (
                                            <option key={marca.id} style={{backgroundColor:"#1F2029"}} value={`${marca.name}`}>{marca.name}</option>
                                        )
                                    })}
                                    <option style={{backgroundColor:"#1F2029"}} value="adicionar">Adicionar...</option>
                            </Select>
                        )
                        }

                          

                            {!!errors.marca && (
                                <FormErrorMessage>
                                {errors.marca.message}
                                </FormErrorMessage>
                             )}
                            
                              
                        </FormControl>


                        <Input name="modelo" label="Modelo" error={errors.modelo} {...register('modelo')} defaultValue={anuncio.modelo} />
                       
                        <FormControl isInvalid={!!errors.ano_fabricacao}>
                        <FormLabel 
                        htmlFor="ano_fabricacao"
                        >
                           Ano
                        </FormLabel>

                        <ChakraInput
                         {...register('ano_fabricacao')}
                        as={InputMask}
                        bgColor="gray.900" 
                        _hover={{bgColor: 'gray.900'}} 
                        focusBorderColor="yellow.400"  
                        variant="filled" 
                        name="ano_fabricacao" 
                        id="ano_fabricacao" 
                        type="text" 
                        size="lg"
                        mask="9999/9999"
                        defaultValue={anuncio.ano_fabricacao}
                        />
                      
                        {!!errors.ano_fabricacao && (
                                <FormErrorMessage>
                                {errors.ano_fabricacao.message}
                                </FormErrorMessage>
                             )}
                        
                       </FormControl>


                        <Input name="versao" label="Versão" error={errors.versao} {...register('versao')} defaultValue={anuncio.versao}/>
                        <Input name="numero_portas" label="Número de Portas" error={errors.numero_portas} {...register('numero_portas')} defaultValue={anuncio.numero_portas}/>
                        <Input name="cor" label="Cor" {...register('cor')} error={errors.cor} {...register('cor')} defaultValue={anuncio.cor}/>
                        <Input name="cores_internas" label="Cores Interiores" error={errors.cores_internas} {...register('cores_internas')} defaultValue={anuncio.cores_internas} />




                        <FormControl isInvalid={!!errors.combustivel}>
                        <FormLabel 
                        htmlFor="combustivel"
                        >
                            Combustível
                        </FormLabel>
                        <Select size="lg" name="combustivel" variant="filled" bg="gray.900" focusBorderColor="yellow.500"  _hover={{bgColor: 'gray.900'}} {...register('combustivel')} defaultValue={anuncio.combustivel}>
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
                        <Select size="lg" name="carroceria" variant="filled" bg="gray.900" focusBorderColor="yellow.500"  _hover={{bgColor: 'gray.900'}} {...register('carroceria')} defaultValue={anuncio.carroceria}>
                                    <option style={{backgroundColor:"#1F2029"}} value="Hatch">Hatch</option>
                                    <option style={{backgroundColor:"#1F2029"}} value="Compacto">Compacto</option>
                                    <option style={{backgroundColor:"#1F2029"}} value="SUV">SUV</option>
                                    <option style={{backgroundColor:"#1F2029"}} value="Picape">Picape</option>
                                    <option style={{backgroundColor:"#1F2029"}} value="Sedan">Sedan</option>
                                    <option style={{backgroundColor:"#1F2029"}} value="Mini Van">Mini Van</option>
                                    <option style={{backgroundColor:"#1F2029"}} value="Van">Van</option>
                                    <option style={{backgroundColor:"#1F2029"}} value="Van de Painel">Van de Painel</option>
                            </Select>

                            {!!errors.carroceria && (
                                <FormErrorMessage>
                                {errors.carroceria.message}
                                </FormErrorMessage>
                             )}
                            
                              
                        </FormControl>

                        <Input name="potencia" label="Potência" error={errors.potencia} {...register('potencia')} defaultValue={anuncio.potencia}/>
                        <FormControl isInvalid={!!errors.transmissao}>
                        <FormLabel 
                        htmlFor="transmissao"
                        >
                            Transmissão
                        </FormLabel>
                        <Select id="transmissao" size="lg" name="transmissao" variant="filled" bg="gray.900" focusBorderColor="yellow.500" defaultValue={anuncio.transmissao}  _hover={{bgColor: 'gray.900'}} {...register('transmissao')}>
                                    <option style={{backgroundColor:"#1F2029"}} value="Manual">Manual</option>
                                    <option style={{backgroundColor:"#1F2029"}} value="Automatizado">Automatizado</option>
                                    <option style={{backgroundColor:"#1F2029"}} value="Automático">Automático</option>
                                    <option style={{backgroundColor:"#1F2029"}} value="Automático de Dupla Embreagem">Automático de Dupla Embreagem</option>
                                    <option style={{backgroundColor:"#1F2029"}} value="CVT">CVT</option>
                            </Select>

                            {!!errors.transmissao && (
                                <FormErrorMessage>
                                {errors.transmissao.message}
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
                        bgColor="gray.900" 
                        _hover={{bgColor: 'gray.900'}} 
                        focusBorderColor="yellow.400"  
                        variant="filled" 
                        name="quilometragem" 
                        id="quilometragem" 
                        type="text" 
                        size="lg"
                        groupSeparator="."
                        disableAbbreviations={true}
                        allowNegativeValue={false}
                        defaultValue={anuncio.quilometragem}
                        />
                      
                        {!!errors.quilometragem && (
                                <FormErrorMessage>
                                {errors.quilometragem.message}
                                </FormErrorMessage>
                             )}
                        
                       </FormControl>

                       <FormControl isInvalid={!!errors.condicao}>
                        <FormLabel 
                        htmlFor="condicao"
                        >
                            Condição
                        </FormLabel>
                        <Select id="condicao" size="lg" name="condicao" variant="filled" bg="gray.900" focusBorderColor="yellow.500" defaultValue={anuncio.condicao}  _hover={{bgColor: 'gray.900'}} {...register('condicao')}>
                                    <option style={{backgroundColor:"#1F2029"}} value="Novo">Novo</option>
                                    <option style={{backgroundColor:"#1F2029"}} value="Seminovo">Seminovo</option>
                                    <option style={{backgroundColor:"#1F2029"}} value="Usado">Usado</option>
                            </Select>

                            {!!errors.condicao && (
                                <FormErrorMessage>
                                {errors.condicao.message}
                                </FormErrorMessage>
                             )}
                            
                              
                        </FormControl>

                        <FormControl isInvalid={!!errors.valor}>
                        <FormLabel 
                        htmlFor="valor"
                        >
                            Valor
                        </FormLabel>

                        <ChakraInput
                         {...register('valor')}
                        as={CurrencyInput}
                        bgColor="gray.900" 
                        _hover={{bgColor: 'gray.900'}} 
                        focusBorderColor="yellow.400"  
                        variant="filled" 
                        name="valor" 
                        id="valor" 
                        type="text" 
                        size="lg"
                        intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                        disableAbbreviations={true}
                        allowNegativeValue={false}
                        defaultValue={anuncio.valor}
                        onValueChange={(value) => setValue(value)}
                        />
                      
                        {!!errors.valor && (
                                <FormErrorMessage>
                                {errors.valor.message}
                                </FormErrorMessage>
                             )}
                        
                       </FormControl>
                        
                        
                        
                    </SimpleGrid>

                    <Heading size="sm" fontWeight="bold" color="gray.300" alignSelf="flex-start">OUTRAS INFORMAÇÕES</Heading>
                    <SimpleGrid minChildWidth="240px" spacing={["6","8"]} width="100%">
                    

                    <FormControl isInvalid={!!errors.chave_copia}>
                        <FormLabel 
                        htmlFor="chave_copia"
                        >
                            Chave Cópia
                        </FormLabel>
                        <Select size="lg" id="chave_copia" name="chave_copia" variant="filled" bg="gray.900" focusBorderColor="yellow.500" {...register('chave_copia')}  _hover={{bgColor: 'gray.900'}} defaultValue={anuncio.chave_copia}>
                                    <option style={{backgroundColor:"#1F2029"}} value="Sim">Sim</option>
                                    <option style={{backgroundColor:"#1F2029"}} value="Não">Não</option>
                            </Select>

                            {!!errors.chave_copia && (
                                <FormErrorMessage>
                                {errors.chave_copia.message}
                                </FormErrorMessage>
                             )}
                            
                              
                        </FormControl>

                        <FormControl isInvalid={!!errors.laudo_cautelar}>
                        <FormLabel 
                        htmlFor="laudo_cautelar"
                        >
                            Laudo Cautelar
                        </FormLabel>
                        <Select size="lg" id="laudo_cautelar" name="laudo_cautelar" variant="filled" bg="gray.900" focusBorderColor="yellow.500" defaultValue={anuncio.laudo_cautelar}  _hover={{bgColor: 'gray.900'}} {...register('laudo_cautelar')}>
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
                        <Select size="lg" id="manual_do_proprietario" name="manual_do_proprietario" variant="filled" bg="gray.900" focusBorderColor="yellow.500" defaultValue={anuncio.manual_do_proprietario}  _hover={{bgColor: 'gray.900'}} {...register('manual_do_proprietario')}>
                                    <option style={{backgroundColor:"#1F2029"}} value="Sim">Sim</option>
                                    <option style={{backgroundColor:"#1F2029"}} value="Não">Não</option>
                            </Select>

                            {!!errors.manual_do_proprietario && (
                                <FormErrorMessage>
                                {errors.manual_do_proprietario.message}
                                </FormErrorMessage>
                             )}
                            
                              
                        </FormControl>
                        
        

                    </SimpleGrid>
                    
                    <SimpleGrid minChildWidth="240px" spacing={["6","8"]} width="100%">
                    <Box>
                    <FormControl isInvalid={!!errors.observacoes}>
                            <Text size="sm" fontWeight="bold" color="whiteAlpha" mb="2">Observações</Text>
                            <Textarea
                                id="observacoes"
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
                            {!!errors.observacoes && (
                                    <FormErrorMessage>
                                    {errors.observacoes.message}
                                    </FormErrorMessage>
                                 )}
                        </FormControl>
                     
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
                          <Box>{imagesPreview.length === 0 ? <Text fontSize="20px">Envie no mínimo uma imagem</Text> : <Text fontSize="20px">{imagesPreview.length} imagens selecionadas</Text>}</Box>
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
                    
                    {winReady && imagesPreview.length > 0 ? (
                         
                        <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="images" >
                            {(providedDroppable) => (
                                
                                <Grid 
                                {...providedDroppable.droppableProps} 
                            
                                ref={providedDroppable.innerRef}
                               templateColumns="repeat(1, 1fr)"
                                mt={6} border="2px dashed" bg="whiteAlpha" borderColor="blue.500"  p={2} gap={3}
                                >
                                {imagesPreview.map((image, index) => {
                                   
                                    return (
                                        <Draggable key={`${image.preview as string}-${index}`} draggableId={`${image.preview as string}-${index}`} index={index}>
                                            {(providedDraggable) => (
                                                <Box 
                                                ref={providedDraggable.innerRef} 
                                                {...providedDraggable.draggableProps} 
                                                {...providedDraggable.dragHandleProps}
                                                  maxHeight="350px"
                                                  width="100%" 
                                                  height="100%" 
                                                  cursor="pointer"
                                                  overflow="hidden"
                                                  >
                                                    <Icon cursor="default" onClick={() => handleRemoveImage(image)} as={RiCloseLine} backgroundColor="red.400" color="white" position="absolute" zIndex="1" w={5} h={5}/>
                                                    <Image src={image.preview as string} alt="img" objectFit="cover" width="100%" height="100%" transition="0.3s ease-in-out" _hover={{transform: "scale(1.07)"}} />
                                                </Box>
                                            )}
                                        </Draggable>
                                    )
                                })}
                                {providedDroppable.placeholder}
                                </Grid>
                                
                            )}
                    
                        </Droppable>
                    </DragDropContext>
                            ) : (
                        <Box/>
                    )}
                 
                    </Box>
                    
            </SimpleGrid>
                </VStack>

                <Flex mt="8" justify="flex-end">
                    <HStack spacing="4">
                    <Link href="/dashboard/anuncios" passHref><Button colorScheme="whiteAlpha">Cancelar</Button></Link>
                        <Button type="submit" colorScheme="blue" isLoading={formState.isSubmitting}>Salvar</Button>
                        <Button onClick={() => handleRemoveAnuncio(anuncio)} colorScheme="red">Excluir</Button>
                    </HStack>
                </Flex>
                </Box>
                )
                )}

               
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

    const dataMarcas = await prisma.marca.findMany({
        orderBy: [
            {
                name: 'asc'
            }
        ]
    })
    const marcas = JSON.parse(JSON.stringify(dataMarcas))
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
        marcas,
        session
        }
    }
}