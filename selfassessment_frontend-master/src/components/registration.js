import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Registration = () => {
  const [registeruser, setRegisteruser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpassword: "",
    role: ""
  });

  const handleChange = event => {
    setRegisteruser({
      ...registeruser,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("/register", registeruser)
      .then(function(response) {
        console.log(response);
        localStorage.setItem("token", response.headers["x-auth-token"]);
        localStorage.setItem('time', new Date().getTime());
        window.location = "/";
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  return (
    <div className= "d-flex justify-content-center">
      <Form onSubmit={handleSubmit}> 
        <Form.Group controlId="formBasicEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" name="firstName" placeholder="Enter first name"  value={registeruser.firstName}
          onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text"  name="lastName" placeholder="Enter last name"  value={registeruser.lastName}
          onChange={handleChange} />
          
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email"  value={registeruser.email}
          onChange={handleChange} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Password" value={registeruser.password}
          onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" name="confirmpassword" placeholder="Confirm Password" value={registeruser.confirmpassword}
          onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>You are: </Form.Label>
          <Form.Check type="checkbox" label="Patient" name="role" value={"Patient"} onChange={handleChange} ></Form.Check>
          <Form.Check type="checkbox" label="Nurse"  name="role" value={"Nurse"} onChange={handleChange}></Form.Check>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      
    </div>
  );
};

export default Registration;
