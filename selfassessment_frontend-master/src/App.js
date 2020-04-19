import React,{ useState, useEffect} from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import Registration from './components/registration';
import ReportNurse from './components/reportnurse';
import SearchAllreports from './components/searchallreports';
import SearchbyEmail from './components/searchbyemail';
import SearchAllEmer from './components/searchallemer';
import Login from './components/login';
import Navbar from "./components/navbar";
import Profile from "./components/profile";
import Logout from "./components/logout";
import ReportUser from "./components/reportuser";
import Emergency from "./components/emergency";
import Addtips from "./components/addtips";
import Carousel from 'react-bootstrap/Carousel'
import Carousel1 from './components/carousel';
import Footer from './components/footer';



function App() {


   //for carousel
   const [index, setIndex] = useState(0);
   const handleSelect = (selectedIndex, e) => {
     setIndex(selectedIndex);
   };

  const [user, setUser] = useState('');
  const [message,setMessage]= useState('');

  useEffect( ()=> {

    const fetchdata= async () => {
      await axios.get('/getTips')
      .then( res=> {
        setMessage(res.data);
      })
      .catch( (err)=>{

      })
    }

    try{
    const jwt= localStorage.getItem("token");
    const user= jwtDecode(jwt);
    console.log("user is here", user);
    console.log("role from app.js is here", user.role);
    setUser( {user});
    //console.log(user);




    }
    catch(ex){

    }
    fetchdata();
  },[]);
  
  return (
    <React.Fragment>
      
      <Navbar u={user}/>
      <Carousel1 />
      
      <p><i><marquee>Tips of the Day: {message}</marquee> </i></p>
        <div className="p-4">
        
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/logout" component={Logout}></Route>
          <Route path="/profile" component={Profile}></Route>
          <Route path="/registration" component={Registration}></Route>
          <Route path="/reportnurse" component={ReportNurse}></Route>
          <Route path="/searchallreports" component={SearchAllreports}></Route>
          <Route path="/searchallemer" component={SearchAllEmer}></Route>
          <Route path="/searchbyemail" component={SearchbyEmail}></Route>
          <Route path="/reportuser" component={ReportUser}></Route>
          <Route path="/emergency" component={Emergency}></Route>
          <Route path="/addTips" component={Addtips}></Route>
          <Redirect from="/" to="/login" />
          <Redirect to="" />
        </Switch>
        </div>
        <Footer />
    </React.Fragment>
  );
}

export default App;
