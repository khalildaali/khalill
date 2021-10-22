import {
    Box,
    Image,
    Button,
    Link
  } from '@chakra-ui/react';
  function Bannerconx() {
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
             <a href="/"> <Image boxSize="150px" src={'https://bboard.b-forbiz.com/assets/images/cliqeoAdmin.png'} alt="brand" /><Link href="/profile" /></a>
            </Box>
            <Box>
            <Button pr={3} colorScheme="gray.600" fontSize="lg" variant="link">
            <Link href="/taches"  >
  Taches
</Link>
              </Button> 
              <Button pr={3} colorScheme="gray.600" fontSize="lg" variant="link">
            <Link href="/profile" >
  Profile
</Link>
              </Button> 
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
  