import {
  Box,
  Button,
  Container,
  Center,
  InputGroup,
  FormControl,
  FormLabel,
  InputRightElement,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Input,
  CloseButton
} from '@chakra-ui/react';
import { useHistory } from 'react-router';
import cript from './Crypt';
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';
import React from 'react';
import axios from "axios";
import MyLoader from './Myloader';
const baseURL = "http://127.0.0.1:8000/api/user/login";
const config = {
  headers: {
    'Accept': `application/json`,
  }
};
function Login(...props) {
  let history = useHistory()
  const [show, setShow] = React.useState(false)
  const [auth, setAuth] = React.useState(false)
  const [loding, setLoding] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const handleClick = () => setShow(!show)
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const handelPassword = (e) => {
    setPassword(e.target.value)
  }
  const handelEmail = (e) => {
    setEmail(e.target.value)
  }
  setTimeout(() => {
    setLoding(true)
  }, 1000);
  var body = {
    email: email,
    password: password
  }
  // console.log(cript(body)) 

  const handelsubmit = () => {
    axios({

      method: 'post',
      url: baseURL,
      config,
      data: { 'data': cript(body) }
    })
      .then(function (response) {
        console.log(response.data)
        props.aut = true
        if (response.data.status = 200) {
          setTimeout(() => {
            setAuth(true)
          }, 100000);
          
          localStorage.setItem('auth', true);
          localStorage.setItem('token', response.data.token_type + ' ' + response.data.access_token);
          localStorage.setItem('token_post', response.data.token_post);
          if (response.data.exist == 'false') {
            history.push('/profile')
           
          } else {
            history.push('/code')
          }
          window.location.reload();
        }
      })
      .catch(function (error) {
        setMsg("login ou mot de passe incorrect")
        // let color = 'errorBorderColor="red.300"'
        // history.push('/')
       console.log(error.response.data)

      })

  }
  if (localStorage.getItem('auth') == 'true') {
    history.push('/profile')
  }

  return (
    <div>
{!loding ?
      <Box   ml={90}
      mr={90} w="100%" h="100%">
        <MyLoader /> </Box>:
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
            <Center fontSize="20px" color="red.100">
      {msg !="" ? <Alert status="error">
  <AlertIcon />
  <AlertTitle mr={2} color='black'>{msg}</AlertTitle>
  <CloseButton position="absolute" right="8px" top="8px" />
</Alert> : null}
            
            </Center>
          </Box>
          <FormControl id="adress_email" isRequired p="2" >
            <FormLabel fontSize="20px">Adresse Email</FormLabel>
            <Input type="text" placeholder="Adresse email" textColor="black" size="md" onChange={handelEmail} errorBorderColor="red.300" />
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
                <Button h="100%" w="100%" size="sm" onClick={handleClick} colorScheme="teal">
                  {show ? <ViewOffIcon /> : <ViewIcon />}
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


      </Container>}

    </div>
  )
}
export default Login;
