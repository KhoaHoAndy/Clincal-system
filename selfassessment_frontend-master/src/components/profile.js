import React, {useState, useEffect} from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'


const Profile= () => { 

  const [data,setData]= useState([]);
  const[message, setMessage]= useState("Loading");
  const [listError, setListError] = useState(false);
  const [user, setUser] = useState('');
  useEffect( ()=> {
      
    const fetchdata=  () => {

      let hours= 0.05;
      const jwt= localStorage.getItem("token");
      const time= localStorage.getItem("time");
      
      
      if(jwt == undefined){
        setMessage("Not Authorised");
      }

      if(time && (new Date().getTime() - time > hours * 60 * 60 *1000 )){
        console.log( "localstorage for true", new Date().getTime() - time> hours * 60 * 60 *1000 );
        localStorage.removeItem('token');
        localStorage.removeItem('time');
        window.location="/";
      }
      else{     
        const user12= jwtDecode(jwt);
        console.log("from profile page", user12);
        setUser( {user12});
        console.log( "localstorage for false", new Date().getTime() - time> hours * 60 * 60 *1000 );
        
        };
  }

    fetchdata();
    setMessage("Loaded");
    console.log("message here" ,message);
  },[message]);


return(
  <div>
    <Jumbotron>
  <h1>Hello, {jwtDecode(localStorage.getItem("token")).firstName}!</h1>
    <p>
    This is your personal detail
    </p>
    <p>Role: {jwtDecode(localStorage.getItem("token")).role}</p>
    <p>Full Name: {jwtDecode(localStorage.getItem("token")).firstName} {jwtDecode(localStorage.getItem("token")).lastName} </p>
</Jumbotron>
  </div>
  )
}

export default Profile;
