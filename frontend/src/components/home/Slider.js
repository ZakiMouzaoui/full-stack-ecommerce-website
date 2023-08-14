import Carousel from "react-bootstrap/Carousel";
import slider1 from "../../images/slider1.png";
import slider2 from "../../images/slider4.png";
import slider3 from "../../images/prod3.png";
import slider4 from "../../images/prod4.png";
import { memo } from "react";

const Slider = () => {
  return (
    <Carousel>
      <Carousel.Item className="slider-background w-100">
        <div
          style={{
            position: "absolute",
            background: "black",
            height: "100%",
            width: "100%",
            opacity: 0.25,
          }}
        ></div>
        <div className="">
          <img
            style={{ height: "296px", width: "313.53px" }}
            src={slider1}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3 className="slider-title">There is a big discount</h3>
            <p className="slider-text">
              Up to 50% of dicount for your checkout
            </p>
          </Carousel.Caption>
        </div>
      </Carousel.Item>

      <Carousel.Item className="slider-background2 w-100">
        <div
          style={{
            position: "absolute",
            background: "black",
            height: "100%",
            width: "100%",
            opacity: 0.25,
          }}
        ></div>
        <div>
          <img
            style={{ height: "296px", width: "313.53px" }}
            src={slider2}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3 className="slider-title">There is a big discount</h3>
            <p className="slider-text">
              Up to 50% of dicount for your checkout
            </p>
          </Carousel.Caption>
        </div>
      </Carousel.Item>
      <Carousel.Item className="slider-background3 w-100">
        <div
          style={{
            position: "absolute",
            background: "black",
            height: "100%",
            width: "100%",
            opacity: 0.25,
          }}
        ></div>
        <img
          style={{ height: "296px", width: "313.53px" }}
          src={slider3}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3 className="slider-title">There is a big discount</h3>
          <p className="slider-text">Up to 50% of dicount for your checkout</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="slider-background4 w-100">
        <div
          style={{
            position: "absolute",
            background: "black",
            height: "100%",
            width: "100%",
            opacity: 0.25,
          }}
        ></div>
        <img
          style={{ height: "296px", width: "313.53px" }}
          src={slider4}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3 className="slider-title">There is a big discount</h3>
          <p className="slider-text">Up to 50% of dicount for your checkout</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default memo(Slider);
