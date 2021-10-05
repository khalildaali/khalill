import {
  Box,
  show,
  Button,
  Container,
  Center,
  InputGroup,
  Stack,
  FormControl,
  FormLabel,
  InputRightElement,
  
  Input,
} from '@chakra-ui/react';
import { useHistory } from 'react-router';
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';
import React from 'react';
import axios from "axios";
import Banner from './Banner';
const baseURL = "http://127.0.0.1:8000/api/user/login";

function Login(...props) {
let history = useHistory()
  const [show, setShow] = React.useState(false)
  const [auth, setAuth] = React.useState(false)
  const handleClick = () => setShow(!show)
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const handelPassword =(e)=>{
    setPassword(e.target.value)
  }
  const handelEmail =(e)=>{
    setEmail(e.target.value)
  }
  var body = {
    email:  email,
    password: password
}
const handelsubmit =()=>{
console.log(baseURL)
  axios({
   
    method: 'post',
    url: baseURL,
    data: body
})
.then(function (response) {
  props.aut = true
  history.push('/taches')
console.log(response.data)
    if(response.data.status =200){
      localStorage.setItem('auth', true);
      localStorage.setItem('token', response.data.token_type+' '+response.data.access_token);
      localStorage.setItem('token_post',response.data.token_post);
      window.location.reload();
    }
  })
.catch(function (error) {
  history.push('/')
console.log(error)
   
})

}
if(localStorage.getItem('auth') =='true'){
  history.push('/taches')
}

  return (
    <div>


      <Container  >

        <Box p="12" border="1px" color="teal.500" w="100%" h="100%" shadow="dark-lg" mt={20}>
          <Box
            mt="12"
            fontWeight="semibold"
            as="h1"
            lineHeight="tight"
            isTruncated
            color="bleu.100"
          >
            <Center fontSize="40px">
              <h1> Connexion</h1>
            </Center>
          </Box>
          <FormControl id="adress_email" isRequired p="2" >
            <FormLabel fontSize="20px">Adresse Email</FormLabel>
            <Input type="text" placeholder="Adresse email" textColor="black" size="md" onChange={handelEmail}/>
          </FormControl >
          <FormControl id="password" isRequired p="2" >
            <FormLabel fontSize="20px">Mot de Passe</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                textColor="black" size="md"
                onChange={handelPassword}
              />
              <InputRightElement width="4r.5em">
                <Button h="100%" w="100%"size="sm" onClick={handleClick} colorScheme="teal">
                  {show ? <ViewOffIcon/> : <ViewIcon/>}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Box
            mt="3"
            fontWeight="semibold"
            as="h1"
            lineHeight="tight"
            isTruncated
            color="red.500"
          />
          <FormControl id="first-name" p="2" >
            <Button colorScheme="teal" w="100%" textColor="white" onClick={handelsubmit}>Connexion</Button>
          </FormControl>
          <Box

          />
        </Box>


      </Container>

    </div>
  )
}
export default Login;
