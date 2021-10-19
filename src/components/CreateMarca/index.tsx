import ReactDOM from 'react-dom';
import Modal from 'react-modal';


import { Icon, Image, FormLabel, FormControl, FormErrorMessage, Grid, Box, Flex, VStack, 
    Heading, SimpleGrid, Divider, HStack, Button, Textarea, Text, Input as ChakraInput, Select} from "@chakra-ui/react";


import {useForm, SubmitHandler} from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'


import {useState} from 'react'
import { RiCloseLine} from "react-icons/ri";




type CreateMarcaFormData = {
    marca: string;
  }


const createMarcaFormSchema = yup.object({
    marca: yup.string().required('Obrigatório'),
        
  })


  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };


interface ModalInputProps {
    isOpen: boolean;
    closeModal: () => void
}




export default function CreateMarca({isOpen, closeModal}: ModalInputProps) {


    const {register,handleSubmit, formState} = useForm({
        resolver: yupResolver(createMarcaFormSchema)
    })

    const {errors} = formState





    const handleCreateMarca: SubmitHandler<CreateMarcaFormData> = async (values) => {

       console.log(values)
       
    }



    return (


                    <Modal
                        isOpen={isOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
        
            
                <Box 
                as="form"
                flex="1" 
                borderRadius={8} 
                bg="gray.800" p={["6","8"]}
                onSubmit={handleSubmit(handleCreateMarca)}
                >

    
                    <SimpleGrid minChildWidth="240px" spacing={["6","8"]} width="100%">
                        
                        

                        <FormControl isInvalid={!!errors.marca}>
                        <FormLabel 
                        htmlFor="marca"
                        >
                           Criar Marca
                        </FormLabel>
                        <ChakraInput 
                        size="lg" 
                        id="marca" 
                        name="marca" 
                        variant="filled" 
                        bg="gray.900" 
                        focusBorderColor="yellow.500" 
                        {...register('marca')}  
                        _hover={{bgColor: 'gray.900'}}/>
            

                            {!!errors.marca && (
                                <FormErrorMessage>
                                {errors.marca.message}
                                </FormErrorMessage>
                             )}
                            
                              
                        </FormControl>

                       
                    
                    <Button type="submit" colorScheme="blue" isLoading={formState.isSubmitting}>Salvar</Button>
              
                    </SimpleGrid>
                     </Box>
                     </Modal>
    )
}


