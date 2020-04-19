import React, { useState,useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';

const SearchAllreports = () =>{

  const [token, setToken]= useState('ss');
  const [data,setData]= useState([]);
  const [listError, setListError] = useState(false);
  const [localtoken, setLocaltoken]= useState('');
  const[message, setMessage]= useState("Loading");
  
  useEffect( ()=> {
    

    const fetchdata= async () => {

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
        console.log( "localstorage for false", new Date().getTime() - time> hours * 60 * 60 *1000 );
        
      


      await axios.get('/listallreports' ,{ headers: {'x-auth-token' :jwt,
      'Accept' : 'application/json',
      'Content-Type': 'application/json'
       }})
       .then( res=> {
         setData(res.data);
         
          
         
       })
       .catch((err)=> {
         
         setListError(true);
       })
    };
  }

    fetchdata();
  }, []);

 
  return (

    <div>
      
      { data.length !== 0
        ? <div className="p-3">
          <table className="table">
      <thead>
        <tr>
          <th>Patient Email</th>
          <th>Heart Rate</th>
          <th>Blood Pressure</th>
          <th>Respiratory Rate</th>
          <th>Body Temperature</th>
          <th>Nurse Email</th>
        </tr>
      </thead>
      <tbody>
      {data.map((item, idx) => (
        <tr key={idx}>
          <td>{item.patientemail}</td>
          <td>{item.heartrate}</td>
          <td>{item.bloodpressure}</td>
          <td>{item.respiratoryrate}</td>
          <td>{item.bodytemperature}</td>
          <td>{item.nursename}</td>
        </tr>
        ))}
      </tbody>
     </table>
          
        </div>
        : < div> <p> {message}...</p></div>
      }

     
   </div> 
  )
}

export default SearchAllreports 