import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchbyEmail = () => {
  const [report, setReport] = useState({ patientemail: "" });
  //modified part
  const [idfrombutton, setidfrombutton] = useState('');
  const [data, setData] = useState([]);
  const [listError, setListError] = useState(false);
  const [cookie, setCookie] = useState('');
  const[message, setMessage]= useState("");

 

  useEffect(() => {
    
    const fetchdata = async () => {

      const jwt= localStorage.getItem("token");
      const time= localStorage.getItem("time");
      let hours= 0.05 ;
      

      if(jwt == undefined){
        setMessage("Not Authorised");
      }
      if(time && (new Date().getTime() - time > hours * 60 * 60 *1000 )){
        console.log( "localstorage from searchbyemail true", new Date().getTime() - time> hours * 60 * 60 *1000 );
        localStorage.removeItem('token');
        localStorage.removeItem('time');
        window.location="/";
      }
      else{
        console.log( "localstorage from searchbyemail false", new Date().getTime() - time> hours * 60 * 60 *1000 );
        
      

      await axios
        .post("/listbyemail", report, {
          headers: {
            "x-auth-token":
              jwt,
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          setData(res.data);
        })
        .catch(err => {
          setListError(true);
        });
    };

    return ()=> {
      fetchdata();
    }

  }

    fetchdata();
  }, [idfrombutton]);

  const handleChange = event => {
    setReport({ ...report, [event.target.name]: event.target.value });
  };

  const handleSubmit = e => {
    setidfrombutton(report);
  };

  const handleClick =() => {
    setidfrombutton(report.patientemail);
}

  return (
    <div className="App">
      
            <p>Enter the email here:</p>
            <input
              type="text"
              name="patientemail"
              value={report.patientemail}
              onChange={handleChange}
              required
            />
            <br></br>
            <div className="btn btn-danger btn-sm" >
              <button className="btn" type="submit" onClick={handleClick}>
                Search
              </button>
            </div>
          
      {data.length !== 0  ? (
        <div className="justify-content-center p-3 ">
          
          <table className="table">
            <thead>
              <tr>
                <th>Patient Email</th>
                <th>Heart Rate</th>
                <th>Blood Pressure</th>
                <th>Respiratory Rate</th>
                <th>Body Temperature</th>
                <th>Nurse Name</th>
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
      ) : (
        <div className="d-flex justify-content-center p-3 ">
          {" "}
          <p>{message}...</p>
        </div>
      )}
    </div>
  );
};

export default SearchbyEmail;
