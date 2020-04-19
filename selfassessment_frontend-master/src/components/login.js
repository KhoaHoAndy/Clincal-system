import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
//
function Login() {
  //state variable for the screen, admin or user
  const [screen, setScreen] = useState('auth');

  //for carousel
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  
  //store input field data, user name and password
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [user, setUser] = useState('');
  const apiUrl = "http://localhost:5000/login";

  useEffect( ()=> {
    try{
    let hours= 0.05;
    const jwt= localStorage.getItem("token");
    const time= localStorage.getItem('time');

    if(jwt && (new Date().getTime() - time> hours * 60 * 60 *1000 )){
      console.log( "localstorage", new Date().getTime() - time> hours * 60 * 60 *1000 );
      localStorage.clear();
    }
    else{
    
    const user12= jwtDecode(jwt);
    setUser( {user12});
    console.log("user afted logged in", user12);

    }
  }
    catch(ex){

    }
  },[screen]);
  //send username and password to the server
  // for initial authentication
  const auth = async () => {
    console.log('calling auth')
    console.log(username)
    console.log(password)
    try {
      
      const loginData = { username, password  }
      const res = await axios.post(apiUrl, loginData);
      //process the response
      if (res.data.screen !== undefined) {
        localStorage.setItem('token', res.headers['x-auth-token']);
        localStorage.setItem('time', new Date().getTime());
        setScreen("notauth");
        setUser(res.data.user);
        
        window.location="/";
      }
    } catch (e) { //print the error
      console.log(e);
    }
  
  };
  
  //
  return (
    <div >
      { user=== ''
        ? <div className="d-flex justify-content-center">
          <Form>
          <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={e => setUsername(e.target.value)} />
          <Form.Text className="text-muted">
          We'll never share your email with anyone else.
          </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password"  onChange={e => setPassword(e.target.value)}/>
          </Form.Group>
  
          <Button variant="primary"  type="submit" onClick={auth}>
          Login
          </Button>
          </Form>

        </div>
        : <div>
          <Jumbotron>
        <h1>
           Welcome {user.user12.firstName} </h1> 
          <p>How can we help you today?</p>
        <p>
          Please use the function in the navigation bar
        </p>
        </Jumbotron>          
          </div>
        //<View screen={screen} setScreen={setScreen} />
      }
    </div>
  );
}

export default Login;

