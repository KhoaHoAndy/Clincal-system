import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

function Footer(){


  return (
    <Card className="text-center">
  <Card.Body>
    <Card.Title>Final Project</Card.Title>
    <Card.Text>
     Thanks for Visit
    </Card.Text>
    
  </Card.Body>
  <Card.Footer className="text-muted">Copyright Do Hong Thinh, Pham Viet Anh, Nguyen Huu Dinh, Ho Nhat Khoa</Card.Footer>
</Card>
  ) 
};

export default Footer;