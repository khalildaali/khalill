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
import Login from './Login';
function Banner() {
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
            <Button pr={3} colorScheme="gray.600" fontSize="lg" variant="link">
              Log in
            </Button>
            <Button colorScheme="gray.600" fontSize="lg" variant="link">
              Sign up
            </Button>
          </Box>
        </Box>
      </header>
    </>
  );
}

export default Banner;
