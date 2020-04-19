import React,{useEffect} from 'react';

const Logout= () => {

  useEffect( ()=> {
    try{
    const jwt= localStorage.removeItem("token");
    const time= localStorage.removeItem("time");  
    
    console.log("user afted logged out");
    window.location="/";

    }
    catch(ex){

    }
  },[]);
    return (
      <div>
        <p>Please log in</p>
      </div>
    )

}
export default Logout;