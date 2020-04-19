import React,{useState} from 'react';
import Carousel from 'react-bootstrap/Carousel'

function Carousel1() {
//for carousel
const [index, setIndex] = useState(0);
const handleSelect = (selectedIndex, e) => {
  setIndex(selectedIndex);
};

    return (
  <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.thebalancecareers.com/thmb/RRpbEHhLcWB6rslsCuFt4QE76wc=/3000x2000/filters:fill(auto,1)/doctor-career-information-526008-FINAL-7319a84e6dbe4685825c819c63cdc0c1.png"
          alt="First slide"
        />
        <Carousel.Caption>
          <p>How to talk to your doctor</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.readersdigest.ca/wp-content/uploads/sites/14/2016/05/how-to-talk-to-your-doctor.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <p>A day in the life of a doctor</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://image.shutterstock.com/z/stock-photo-large-group-of-doctors-and-nurses-isolated-on-white-129136301.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <p>
            Doctor and nurses
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
)

};
export default Carousel1;