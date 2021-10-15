import {
  Box,
  Image,
  Button,
  Container,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Center,
  Select
  
} from '@chakra-ui/react';

import React, { useState } from 'react';
import axios from "axios";
import { useHistory } from 'react-router';
// import brandLogo from '../assets/brand-logo.svg';
import illustration from '../assets/illustration.svg';
// import imageOne from '../assets/image-one.jpg';
// import imageTwo from '../assets/image-two.jpg';
// import imageThree from '../assets/image-three.jpg';
// import rightArrow from '../assets/right-arrow.svg';
// import interceptor from '../interceptor';
import cript from './Crypt';
const baseURL = "http://127.0.0.1:8000/api/user/users";

const config = {
  headers: {
    'Accept': `application/json`,
     'Authorization': localStorage.getItem('token')
  }
}
function Taches() {
  const [id, setId] = useState("");
  const [titre, setTitre] = React.useState("");
  const [msg, setMsg] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [user, setUser] = React.useState([{id:"",name:""}]);
    let history = useHistory()
    if (localStorage.getItem('auth') != 'true') {
        history.push('/')
    }
    const handelUsers = ()=>{
      axios.get(baseURL,config
  )
  .then(function (resp) {
    console.log(resp.data.donne)
      if(resp.data.status =200){
       setUser(resp.data.donne)
      }
    })
  .catch(function (error) {
    if(error.response.status==400 || error.response.status==401 ||error.response.status==403) {
      localStorage.setItem('token',null)
      localStorage.setItem('auth',false)
   history.push('/')
    }
  console.log(error.response)
 
  })


};

React.useEffect(() => {
  handelUsers();
},[]);


const handelTitle =(e)=>{
  setTitre(e.target.value)
}
const handelDescription =(e)=>{
  setDescription(e.target.value)
}
const handelSelectUser =(e)=>{
  setId(e.target.value)
 
}
console.log(titre,description,id)

const handelValid = ()=>{
  const body ={
    titre:  titre,
    description: description,
    id_user: id,
    token_post:localStorage.getItem('token_post')
  }
  console.log(localStorage.getItem('token_post') )
  if(localStorage.getItem('token_post') == 'undefined' || localStorage.getItem('token_post'=='')){
    history.push('/')
  }
  if(titre =='' || description =='' || id ==''){
    setMsg('donnée incorrect')
  }else{
  console.log(body)
  const baseUrlAdd = "http://127.0.0.1:8000/api/user/tache/";
   axios.post(baseUrlAdd,{'data':cript(body)},config
    )
    .then(function (response) {
        console.log(response)
          setMsg(response.data.message)
          localStorage.setItem('token_post',response.data.token_post)
            // window.location.reload();
       
  
      })
    .catch(function (error) {  
      localStorage.setItem('token_post',error.response.data.token_post)
       if(error.response.status==400 || error.response.status==401 || error.response.status==403) {
        localStorage.setItem('token',null)
        localStorage.setItem('auth',false)
        history.push('/')
      // }else if(error.response.data[0]){
      //   setMsg(error.response.data[0])
      // }else if(error.response.data[0] ){
      //   setMsg(error.response.data[0])
      // }else if (error.response.data[0]){
      //   setMsg(error.response.data[0])
      }
      console.log(error.response.data); 
   
    })
  }
}
  
  return (
    <div>

      <Box>
        <Container maxW="container.xl">
          <Box d="flex" alignItems="center" py="20" borderBlockStart="1px" color="teal.800">
            <Box w="50%" p="1%"   >
              <Box

              >
                <Center fontSize="40px">
                  <h1> Ajout Tache</h1>
                </Center>
              </Box>
              <Box

              >
                <Center fontSize="30px" color="red">
                  { <h2> {msg}</h2>}
                </Center>
              </Box>
              <Box color="teal.500" w="100%" h="100%"  >
              <form id="myForm">
                <FormControl id="email" w="100%" p="3%">
                  <FormLabel fontSize="30px">Titre</FormLabel>
                  <Input type="text"
                  //  value={name}
                   onChange={handelTitle} 
                  color="black"
                  />
                  </FormControl>
                  <FormControl id="email" w="100%" p="3%">
                  <FormLabel fontSize="30px" >description</FormLabel>

                  <Textarea type="email"
                  //  value={email}
                   onChange={handelDescription}
                  color="black"
                  />
                   </FormControl>
                  
                  <FormControl id="email" w="100%" p="3%">
                  <FormLabel fontSize="30px" >Responsable</FormLabel>
                    <Select color="black" onChange={handelSelectUser} placeholder="Selectionner un Responsable">
                         {user.map(data =>(
          <option  key={data.id} value={data.id}>{data.name} : {data.email}</option> 
                         ))}  

                    </Select>
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
                    <Button colorScheme="teal" w="100%" textColor="white" fontSize="30px"
                     onClick={handelValid}
                    >valider</Button>
                  </FormControl>
              </form>
                  <Box

                  />
                

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
export default Taches