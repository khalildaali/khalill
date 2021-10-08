import {
    Box,
    Image,
    Button,
    Container,
    Heading,
    Grid,
    Badge,
    FormControl,
    Input,
  } from '@chakra-ui/react';
  import brandLogo from '../assets/logo-shyrineprod.png';
  import illustration from '../assets/illustration.svg';
  import imageOne from '../assets/image-one.jpg';
  import imageTwo from '../assets/image-two.jpg';
  import imageThree from '../assets/image-three.jpg';
  import rightArrow from '../assets/right-arrow.svg';
  import { useHistory } from 'react-router';
  import Login from './Login';
  import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Taches from './Taches';
  function Bannerconx() {
    let history = useHistory()
    const logout =()=>{
      localStorage.setItem('auth', false);
      localStorage.setItem('token', "");
      window.location.reload();
    }  
  
    return (
      <>
        <header>
          <Box
            d="flex"
            alignItems="center"
            justifyContent="space-between"
            ml={6}
            mr={6}
          >
            <Box>
              <Image boxSize="110px" src={brandLogo} alt="brand" />
            </Box>
            <Box>
 {/* <Button pr={3} colorScheme="gray.600" fontSize="lg" variant="link" > <Link to="/taches">Taches</Link> </Button> */}
              <Button pr={3} colorScheme="gray.600" fontSize="lg" variant="link" onClick={logout}>
                Logout
              </Button> 
              
            </Box>
          </Box>
        </header>
      </>
    );
  }
  
  export default Bannerconx;
  