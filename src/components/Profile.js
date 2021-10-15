import {
    Box,
    Image,
    Button,
    Container,
    Input,
    FormControl,
    FormLabel,
    Center,
} from '@chakra-ui/react';
import illustration from '../assets/illustration.svg';
// import imageOne from '../assets/image-one.jpg';
// import imageTwo from '../assets/image-two.jpg';
// import imageThree from '../assets/image-three.jpg';
// import rightArrow from '../assets/right-arrow.svg';
import { useHistory } from 'react-router';
// import interceptor from '../interceptor';
import cript from './Crypt';
import React, { useState } from 'react';
import axios from "axios";
const baseURL = "http://127.0.0.1:8000/api/user/profile";
const config = {
  headers: {
    'Accept': `application/json`,
    'Authorization': localStorage.getItem('token')
  }
};
function Profile() {
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
  //  history.push('/')
  // error.preventDefault();
  console.log(error.response.data)
  if(error.response.status==401){
    // history.push('/')
  }
 
  })

};
React.useEffect(() => {
handelprofile();
},[]);
const handelName =(e)=>{
  setName(e.target.value)
}
const handelEmail =(e)=>{
  setEmail(e.target.value)
}


const handelValid = ()=>{
  console.log(name)
  console.log(email)
const body = {
  email:  email,
  name: name,
  token_post:localStorage.getItem('token_post')
}
console.log(cript(body))
  const baseURLupdate = "http://127.0.0.1:8000/api/user/updateprofile/";
   axios.put(baseURLupdate,{'data':cript(body)},config
    )
    .then(function (response) {
      console.log(response)
        if(response.data.status =='200'){
          setMsg(response.data.message)
          localStorage.setItem('token_post',response.data.token_post)
        }
  
      })
    .catch(function (error) {  
      console.error(error.response)
      // setMsg("")
      // if(error.response.status==400 || error.response.status==401 || error.response.status==402 || error.response.status==404) {
      //   localStorage.setItem('token',null)
      //   localStorage.setItem('auth',false)
      //   history.push('/')
      // }
      
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
                                    <h1> Profile</h1>
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
                                    <FormLabel>Nom</FormLabel>
                                    <Input type="text" 
                                     value={name}
                                     onChange={handelName} 
                                     />
                                    <FormLabel>Email address</FormLabel>

                                    <Input type="email" 
                                     value={email}
                                     onChange={handelEmail}
                                     />
                                    <Box
                                        mt="3"
                                        fontWeight="semibold"
                                        as="h1"
                                        lineHeight="tight"
                                        isTruncated
                                        color="red.500"
                                    />
                                    <FormControl id="first-name" p="2" >
                                        <Button colorScheme="teal" w="100%" textColor="white" onClick={handelValid}>valider</Button>
                                    </FormControl>
                                    <Box

                                    />
                                </FormControl>

                            </Box>
                        </Box>

                        <Box w="50%" p="1%" >
                            <Image w="100%" src={illustration} alt="illustration" />
                        </Box>
                    </Box>
                </Container>
              
            </Box>
        </div>
    );
}
export default Profile