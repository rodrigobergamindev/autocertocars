import { Flex, Button, Stack} from '@chakra-ui/react'
import { Input } from '../../components/Form/Input'
import {useForm, SubmitHandler} from 'react-hook-form'
import * as yup from 'yup';
import Logo from '../../components/Header/Logo'

import { yupResolver } from '@hookform/resolvers/yup'


type SignInFormData = {
  email: string;
  password: string;
}

const SignInFormSchema = yup.object({
  email: yup.string().required('E-mail obrigatório').email(),
  password: yup.string().required('Senha obrigatória')
})

export default function SignIn() {


  const {register, handleSubmit, formState} = useForm({resolver: yupResolver(SignInFormSchema)})


  const handleSignIn: SubmitHandler<SignInFormData> = async (values, event) => {
    await new Promise(resolve => setTimeout(resolve,2000))
    console.log(values)
  }

  const {errors} =  formState

  return (
    <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center" direction="column">
      <Logo/>
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDirection="column"
        onSubmit={handleSubmit(handleSignIn)}
      >

        <Stack spacing="4">
       
       <Input 
       name="email" 
       type="email" 
       label="E-mail" 
       error={errors.email}
       {...register('email')}/>

       <Input 
       name="password" 
       type="password" 
       label="Password" 
       error={errors.password}
       {...register('password')}/>

      </Stack>

       <Button type="submit" mt="6" colorScheme="blue" size="lg" isLoading={formState.isSubmitting}> Entrar </Button>
       
      </Flex>
    </Flex>
  )
}
