import {
  Box,
  Button,
  Container,
  Center,
  InputGroup,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useHistory } from 'react-router';
import {decode as base64_decode} from 'base-64';
import cript from './Crypt';
import React from 'react';
import axios from "axios";
const baseURL = "http://127.0.0.1:8000/api/user/codes";
const config = {
  headers: {
    'Accept': `application/json`,
    'Authorization': localStorage.getItem('token')
  }
};
function Code(...props) {

let history = useHistory()
if(localStorage.getItem('token')==''){
  localStorage.setItem('token_post','')

  history.push('/')
}
const [show, setShow] = React.useState(false)
  const [msg, setMsg] = React.useState("")
  const [code, setCode] = React.useState("");
  const [email, setEmail] = React.useState("");
  const handelCode =(e)=>{
    setCode(e.target.value)
  }
  var url = window.location.href;
  const paramcrypt = url.split('?');
  var param = base64_decode(paramcrypt[1]);
    

  var body = {
    email:  param,
    code: code,
    token_post:localStorage.getItem('token_post')
}
console.log(config)
const handelsubmit =()=>{

console.log(baseURL)
axios.post(baseURL,{ 'data': cript(body) },
  config
)
.then(function (response) {
  console.log(response.data)
  props.aut = true
  localStorage.setItem('token_post',response.data.token_post);
    if(response.data.status =200){
      localStorage.setItem('auth', true);
       history.push('/profile')
    }
  })
.catch(function (error) {
  var nb = parseInt(localStorage.getItem('nbechek')) 
  var nbr = nb + 1;
  localStorage.setItem('nbechek',nbr)
  console.log(error.response.data.token_post)
  setMsg("Code incorrect")
  let color ='errorBorderColor="red.300"';
  // history.push('/')
  localStorage.setItem('token_post',error.response.data.token_post);
  if( localStorage.getItem('nbechek') == '3'){
    localStorage.setItem('token_post','')
    localStorage.setItem('auth','false')
    localStorage.setItem('nbechek',0)
    history.push('/')
    window.location.reload();
  }

   
})

}


  return (
    <div>


      <Container  >

        <Box p="12" border="1px" color="linear(to-l, #7928CA, #FF0080)" w="100%" h="100%" shadow="dark-lg" mt={20}>
          <Box
            mt="12"
            fontWeight="semibold"
            as="h1"
            lineHeight="tight"
            isTruncated
            color="linear(to-l, #7928CA, #FF0080)"
          >
            <Center fontSize="40px">
              <h1> Verification</h1>
            </Center>
            <Center fontSize="20px" color="red.100">
              <h1> {msg}</h1>
            </Center>
          </Box>
          <FormControl id="adress_email" isRequired p="2" >
          
            <FormLabel fontSize="20px" bgGradient="linear(to-r, #012a4a, #cddafd)" bgClip="text" fontWeight="extrabold" >Adresse Email</FormLabel>
            <Input type="text" placeholder="Adresse email" textColor="black" size="md" errorBorderColor="red.300" value={param} disabled={true}/>
          </FormControl >
          <FormControl id="password" isRequired p="2" >
            <FormLabel fontSize="20px"  bgGradient="linear(to-r, #012a4a, #cddafd)" bgClip="text" fontWeight="extrabold">
            Code</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type="text" 
                placeholder="Enter password"
                textColor="black" size="md"
                onChange={handelCode}
              />
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
          <FormControl id="first-name" p="2"  >
            <Button colorScheme="teal" w="100%" textColor="white" onClick={handelsubmit}>validation</Button>
          </FormControl>
          <Box

          />
        </Box>


      </Container>

    </div>
  )
}
export default Code;
