import {
    Box,
    Image,
    Button,
    Container,
    Input,
    Heading,
    FormControl,
    FormLabel,
    Center,
    FormHelperText,
} from '@chakra-ui/react';
import illustration from '../assets/illustration.svg';
import { useHistory } from 'react-router';
import React, { useState } from 'react';
import axios from "axios";
const baseURL = "http://127.0.0.1:8000/api/user/profile";
const config = {
  headers: {
    'Accept': `application/json`,
    'Authorization': localStorage.getItem('token')
  }
};
function Email() {
  const [id, setId] = useState("");
  const [name, setName] = React.useState("");
  const [msg, setMsg] = React.useState("");
  const [email, setEmail] = React.useState("");
    let history = useHistory()
    if (localStorage.getItem('auth') != 'true') {
        history.push('/')
    }
    const handelprofile = ()=>{
      axios.get(baseURL,config
  )
  .then(function (resp) {
      if(resp.data.status =200){
        setId(resp.data.id);
        setName(resp.data.name)
        setEmail(resp.data.email)
      }
    })
  .catch(function (error) {
   //history.push('/')

  console.log(error.response.data)
 
  })

};
React.useEffect(() => {
handelprofile();
},[]);
const handelName =(e)=>{
  setName(e.target.value)
}


const handelValid = ()=>{

  const baseURLupdate = "http://127.0.0.1:8000/api/user/updateprofile/";
   axios.put(baseURLupdate, {
    email:  email,
    name: name,
    token_post:localStorage.getItem('token_post')
  },config
    )
    .then(function (response) {
      console.log(response)
        if(response.data.status =='200'){
          setName(response.data.name)
          setEmail(response.data.email)
          setMsg(response.data.message)
          localStorage.setItem('token_post',response.data.token_post)
            window.location.reload();
        }
  
      })
    .catch(function (error) {  
      setMsg("")
      console.error(error.response.data); 
   
    })
}
    return (
        <div>
            <Box>

                {/* main punch text */}
                <Container maxW="container.xl">
                    <Box d="flex" alignItems="center" py="20" borderBlockStart="1px" color="teal.100">
                        <Box w="50%" p="1%"   >
                            <Box

                            >
                                <Center fontSize="40px">
                                    <h1> Email de verification</h1>
                                </Center>
                            </Box>
                            <Box

                            >
                                <Center fontSize="30px" color="red">
                                    <h2> {msg}</h2>
                                </Center>
                            </Box>
                            <Box color="teal.500" w="100%" h="100%"  >
                              
                                <FormControl id="email" w="100%" p="3%">
                                    <FormLabel>code de verification</FormLabel>
                                    <Input type="text" 
                                     value={name}
                                     onChange={handelName} 
                                     />
                                    <FormControl id="first-name" p="2" >
                                        <Button colorScheme="teal" w="100%" textColor="white" onClick={handelValid}>valider</Button>
                                    </FormControl>
                                    <Box

                                    />
                                </FormControl>

                            </Box>
                        </Box>
                    </Box>
                </Container>
              
            </Box>
        </div>
    );
}
export default Email