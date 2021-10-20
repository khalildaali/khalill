import Profile from './components/Profile';
import Banner from './components/Banner';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
// import { useHistory } from 'react-router';
import React , { useState }from 'react';
// import ItWorks from './components/ItWorks';
// import Upcomming from './components/Upcomming';
// import Popular from './components/Popular';
// import Connected from './components/Connected';
// import Stories from './components/Stories';
// import Footerbottom from './components/Footerbottom';
import { Box, Image } from '@chakra-ui/react';
import imageBg from './assets/bg.svg';
import Login from './components/Login';
import Code from './components/Code';
import Bannerconx from './components/Bannerconx';
import Taches from './components/Taches';

function App() {
  // let history = useHistory();

  var conn;

  if(localStorage.getItem('auth') =='true'){
    conn = <Bannerconx />
  }else{
    conn =  <Banner />;
  }


  return (
  
    <div className="App">
     
      <Box position="absolute" left="0" top="0" right="0">
        {conn}
      
      <Router>
        <Switch>
            <Route exact path="/"  component={Login}/>  
            <Route exact path="/code"  component={Code}/>
          <Route exact path="/profile" component={Profile}/>
          <Route exact path="/Taches" component={Taches}/>
        </Switch>
     
      </Router>
        {/* <ItWorks />
        <Upcomming />
        <Popular />
        <Connected />
        <Stories />
        <Footerbottom /> */}
      </Box>
      <Box
        position="relative"
        top="0"
        bottom="0"
        right="0"
        left="0"
        height="100vh"
        zIndex={-1}
      >
        <Image w="50%" m="auto" objectFit="cover" sizes="800" src={imageBg} />
      </Box>
     

    </div>
    
  );
}

export default App;
