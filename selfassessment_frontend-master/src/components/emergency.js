import React, { useState ,useEffect} from 'react';
import axios from 'axios';

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import jwtDecode from "jwt-decode";

const Emergency= () => {
  const [message, setMessage] = useState(null);
  const [submit, setSubmit] = useState(null);
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchdata = async () => {
      let hours = 0.05;
      const jwt = localStorage.getItem("token");
      const time = localStorage.getItem("time");

      if (jwt == undefined) {
        setMessage("Not Authorised");
      }

      if (time && new Date().getTime() - time > hours * 60 * 60 * 1000) {
        console.log(
          "localstorage for true",
          new Date().getTime() - time > hours * 60 * 60 * 1000
        );
        localStorage.removeItem("token");
        localStorage.removeItem("time");
        window.location = "/";
      } else {
        const user = jwtDecode(jwt);
        setUser(jwt);
        console.log(
          "localstorage for false",
          new Date().getTime() - time > hours * 60 * 60 * 1000
        );
      }
    };

    fetchdata();
  }, []);

  const apiUrl = "http://localhost:5000/emergency";
  const [token, setToken] = useState("ss");

  const [report, setReport] = useState({
    patientemail: "",
    message: ""
  });

  const handleChange = event => {
    setReport({ ...report, [event.target.name]: event.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("/emergency", report, {
        headers: {
          "x-auth-token": user,
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(function(response) {
        setToken(response.data);
        setMessage("Submmited");
        setSubmit(true);
        console.log(response.data.date);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const submitAnother = e => {
      setMessage(null);
      setSubmit(null);
      setReport({
      patientemail: "",
      message: ""} )
  };


return (
<div>
      {message === null && submit === null ? (
        <div>
          <div className="d-flex p-4">
            
            <Form onSubmit={handleSubmit}>
            <h3>Add Emergency</h3>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Patient email</Form.Label>
                <Form.Control
                  type="text"
                  name="patientemail"
                  value={report.patientemail}
                  placeholder="Enter patient email"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  type="text"
                  name="message"
                  value={report.message}
                  placeholder="message"
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      ) : (
        <div className="d-flex p-4">
          <Form onSubmit={submitAnother}>
            <p> {message}...</p>
            <Button variant="primary" type="submit">
                Submit Another
              </Button>
          </Form>
        </div>
      )}
    </div>
  );
}


export default Emergency;