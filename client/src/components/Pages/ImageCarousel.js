import React from "react";
import { Carousel } from "react-bootstrap";
import Image1 from "../../img/reception.jpg";
import Image2 from "../../img/ward.jpg";
import Image3 from "../../img/operation-theatre.jpg";
import Image4 from "../../img/laboratory.jpg";
import Image5 from "../../img/doctor-patient.jpg";

const ImageCarousel = () => {
  return (
    <div className="">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Image1}
            height="500vh"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Image2}
            height="500px"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Image3}
            height="500px"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Image4}
            height="500px"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Image5}
            height="500px"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
