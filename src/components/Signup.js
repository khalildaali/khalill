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
  Select,
  Input,
  CloseButton
} from '@chakra-ui/react';
import { useHistory } from 'react-router';
import cript from './Crypt';
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';
import React from 'react';
import axios from "axios";
import MyLoader from './Myloader';
const baseURL = "http://127.0.0.1:8000/api/user/roles";
const baseURLRegister = "http://127.0.0.1:8000/api/user/register";
const config = {
  headers: {
    'Accept': `application/json`,
  }
};
function Signup(...props) {
  let history = useHistory()
  const [show, setShow] = React.useState(false)
  const [auth, setAuth] = React.useState(false)
  const [loding, setLoding] = React.useState(false);
  const [showc, setShowc] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const handleClick = () => setShow(!show)
  const handleClickConforme = () => setShowc(!showc)
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [idrole, setIdrole] = React.useState("");
  const [role, setRole] = React.useState("");
  const [confime, setConfime] = React.useState("");
  const [res, setRes] = React.useState(false);

  const close = () => {
    setMsg('');
  }
  const handelRoles = () => {
    axios.get(baseURL, config
    )
      .then(function (resp) {
        console.log(resp.data.donne)
        if (resp.data.status = 200) {
          setRole(resp.data.donne)
        }
      })
      .catch(function (error) {
        if (error.response.status == 400 || error.response.status == 401 || error.response.status == 403) {
          localStorage.setItem('token', null)
          localStorage.setItem('auth', false)
          localStorage.setItem('exist', false);
          history.push('/')
        }
        console.log(error.response)

      })


  };
  const handelSelect = (e) => {
    setIdrole(e.target.value)
    setMsg('');

  }
  React.useEffect(() => {
    handelRoles();
  }, []);
  const handelPassword = (e) => {
    setConfime(e.target.value)
  }
  const handelPasswordConferme = (e) => {
    setPassword(e.target.value)
  }
  const handelName = (e) => {
    setName(e.target.value)
  }
  const handelEmail = (e) => {
    setEmail(e.target.value)
  }
  setTimeout(() => {
    setLoding(true)
  }, 1000);
  setTimeout(() => {
    setMsg('')
  }, 3000);
  
  var body = {
    name: name,
    email: email,
    password: password,
    id_role: idrole
  }
  console.log((body))

  const handelsubmit = () => {
    if (confime === password && name !=='' && email !=='' && idrole !=='' ) {
      axios({

        method: 'post',
        url: baseURLRegister,
        config,
        data: body
      })
        .then(function (response) {
          console.log(response)
          props.aut = true
          if (response.data.status = 200) {
            setMsg(response.data.message)
            setRes(true)
          }
        })
        .catch(function (error) {
          setRes(false)
          setMsg("Email déja utiliser")

          console.log(error.response)

        })
    } else {
      setMsg("Données Incorrect")
    }
  }
  if (localStorage.getItem('auth') == 'true') {
    history.push('/profile')
  }

  return (
    <div>
      {!loding ?
        <Box ml={90}
          mr={90} w="100%" h="100%">
          <MyLoader /> </Box> :
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
                <h1> Inscription</h1>
              </Center>
              <Center fontSize="20px" color="red.100">
                {msg != "" ?
                  <Alert status={!res ? "error" : "success"}>
                    <AlertIcon />
                    <AlertTitle mr={2} color='black'>{msg}</AlertTitle>
                  </Alert> : null}

              </Center>
            </Box>
            <FormControl id="nom" isRequired p="2" >
              <FormLabel fontSize="20px">Nom </FormLabel>
              <Input type="text" placeholder="Nom" textColor="black" size="md" onChange={handelName} errorBorderColor="red.300" />
            </FormControl >
            <FormControl id="adress_email" isRequired p="2" >
              <FormLabel fontSize="20px">Adresse Email</FormLabel>
              <Input type="text" placeholder="Adresse email" textColor="black" size="md" onChange={handelEmail} errorBorderColor="red.300" />
            </FormControl >
            <FormControl id="password" isRequired p="2" >
              <FormLabel fontSize="20px"  >Mot de Passe</FormLabel>
              <InputGroup size="md" >
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
            <FormControl id="password" isRequired p="2" >
              <FormLabel fontSize="20px">confirmer Mot de Passe</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={showc ? "text" : "password"}
                  placeholder="confirmer password"
                  textColor="black" size="md"
                  onChange={handelPasswordConferme}
                />
                <InputRightElement width="4r.5em">
                  <Button h="100%" w="100%" size="sm" onClick={handleClickConforme} colorScheme="teal">
                    {showc ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="email" w="100%" p="3%">
              <FormLabel fontSize="20px" >Role</FormLabel>
              <Select color="black" onChange={handelSelect} placeholder="Selectionner un Role">
                {role.map(data => (
                  <option key={data.id} value={data.id}>{data.name}</option>
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
              <Button colorScheme="teal" w="100%" textColor="white" onClick={handelsubmit}>Inscription</Button>
            </FormControl>
            <Box
            />
          </Box>


        </Container>}

    </div>
  )
}
export default Signup;
