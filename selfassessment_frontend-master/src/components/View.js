

import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';

import Jumbotron from 'react-bootstrap/Jumbotron';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
//
import axios from 'axios';
//
function View (props) {
  // read the info from props, coming from the ancestor component
  const { screen, setScreen } = props;
  // return a stateful value and funcion to update it
  const [data, setData] = useState();
  //
  const [article, setArticle] = useState('');
  const [showLoading, setShowLoading] = useState(true);
  const showAll=false;
  
  // called when user clicks on Logout button
  // to clear the cookie and set the screen state variable 
  // back to its initial state.
  const deleteCookie = async () => {
    try {
      await axios.get('/signout');
      setScreen('auth');
    } catch (e) {
      console.log(e);
    }
  };
  // called when user clicks on Get Data button
  // end-point demonstrates another example for the use
  // of cookie specific response from the server.
  const verifyCookie = async () => {
    try {
      const res = await axios.get('/welcome');
      console.log(res.data)
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  }
  //
  const listArticles = async () => {
   showAll=true;
    axios.get('/api/articles')
    .then(result => {
      console.log('result.data:',result.data);
      setData(result.data);
  })
};
  //
  const createArticle = () => {
    console.log('in createArticle')
    setArticle('y')

  }

  const showDetail = (id) => {
    props.history.push({
      pathname: '/show/' + id
    });
  }
  
  //
  return (
    <div className="App">
      {article !== 'y'
        ? <div>
            <p>Welcome : {screen}</p>
            <p> {data}</p>
            <Jumbotron>
       
      </Jumbotron>

     
            
            <button onClick={createArticle}>Add Course</button>
            

            <button onClick={deleteCookie}>Log out</button>
          </div>            
        : <p >Hi</p>
      }
    </div>
  );
}

//
export default View;