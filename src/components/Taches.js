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
  Select
  
} from '@chakra-ui/react';
import brandLogo from '../assets/brand-logo.svg';
import illustration from '../assets/illustration.svg';
import imageOne from '../assets/image-one.jpg';
import imageTwo from '../assets/image-two.jpg';
import imageThree from '../assets/image-three.jpg';
import rightArrow from '../assets/right-arrow.svg';
import { useHistory } from 'react-router';
import interceptor from '../interceptor';
function Taches() {

  return (
    <div>

      <Box>
        <Container maxW="container.xl">
          <Box d="flex" alignItems="center" py="20" borderBlockStart="1px" color="teal.100">
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
                  {/* <h2> {msg}</h2> */}
                </Center>
              </Box>
              <Box color="teal.500" w="100%" h="100%"  >

                <FormControl id="email" w="100%" p="3%">
                  <FormLabel fontSize="30px">Titre</FormLabel>
                  <Input type="text"
                  //  value={name}
                  //  onChange={handelName} 
                  />
                  </FormControl>
                  <FormControl id="email" w="100%" p="3%">
                  <FormLabel fontSize="30px" >description</FormLabel>

                  <Input type="email"
                  //  value={email}
                  //  onChange={handelEmail}
                  />
                   </FormControl>
                  
                  <FormControl id="email" w="100%" p="3%">
                  <FormLabel fontSize="30px" >Responsable</FormLabel>
                    <Select placeholder="Selectionner un Responsable">
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
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
                    //  onClick={handelValid}
                    >valider</Button>
                  </FormControl>
              
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