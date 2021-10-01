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
  import brandLogo from '../assets/brand-logo.svg';
  import illustration from '../assets/illustration.svg';
  import imageOne from '../assets/image-one.jpg';
  import imageTwo from '../assets/image-two.jpg';
  import imageThree from '../assets/image-three.jpg';
  import rightArrow from '../assets/right-arrow.svg';
  import { useHistory } from 'react-router';
function Profile(){
   
    let history = useHistory()
    if(localStorage.getItem('auth') !='true'){
        history.push('/')
      }
     
return(
    <div>
         <Box>
             
        {/* main punch text */}
        <Container maxW="container.xl">
          <Box d="flex" alignItems="center" py="20" borderBlockStart="1px"  color="teal.100">
          <Box w="50%" p="1%"   >
          <Box
            
          >
            <Center fontSize="40px">
              <h1> Profile</h1>
            </Center>
          </Box>
          <Box color="teal.500" w="100%" h="100%"  >
                 <FormControl id="email" w="100%" p="3%">
  <FormLabel>Nom</FormLabel>
  <Input type="email" />
  <FormLabel>Email address</FormLabel>
  <Input type="email" />
  <FormLabel>Mode de passe</FormLabel>

  <Input type="email" />
  <Box
            mt="3"
            fontWeight="semibold"
            as="h1"
            lineHeight="tight"
            isTruncated
            color="red.500"
          />
          <FormControl id="first-name" p="2" >
            <Button colorScheme="teal" w="100%" textColor="white" >valider</Button>
          </FormControl>
          <Box

          />
</FormControl>

            
              {/*  <Box mt="6" fontWeight="medium">
                Join a group to meet people, make friends, find support, grow a
                business, and explore your interests. Thousands of events are
                happening every day, both online and in person!*/}
              </Box>
            </Box> 

            <Box w="50%" p="1%" >
              <Image w="100%" src={illustration} alt="illustration" />
            </Box>
          </Box>
        </Container>
        {/* three boxes */}
        {/* <Container maxW="container.xl" mt={10}>
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            <Box>
              <Image
                w="100%"
                borderRadius="lg"
                src={imageOne}
                alt="image three"
              />
              <Button colorScheme="teal" variant="link" mt="5">
                Make new friend
                <Image w="100%" ml="2" src={rightArrow} alt="right arrow" />
              </Button>
            </Box>
            <Box>
              <Image
                w="100%"
                borderRadius="lg"
                src={imageTwo}
                alt="image three"
              />
              <Button colorScheme="teal" variant="link" mt="5">
                Explore the outdoors
                <Image w="100%" ml="2" src={rightArrow} alt="right arrow" />
              </Button>
            </Box>
            <Box>
              <Image
                w="100%"
                borderRadius="lg"
                src={imageThree}
                alt="image three"
              />
              <Button colorScheme="teal" variant="link" mt="5">
                Connect over tech
                <Image w="100%" ml="2" src={rightArrow} alt="right arrow" />
              </Button>
            </Box>
          </Grid>
        </Container>*/}
        </Box> 
    </div>
);
}
export default Profile