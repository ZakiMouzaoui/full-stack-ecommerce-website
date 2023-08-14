import { memo, useState } from "react";
import { Col } from "react-bootstrap";
import ReactImageMagnify from "react-magnify-image";

const ImageGallery = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Col lg="6" className="mb-2 d-flex ps-0 pe-3">
      <div className="d-flex flex-column" style={{ gap: "20px" }}>
        {images.map((img, index) => {
          return (
            <div className="shadow-sm rounded">
              <img
                alt="img"
                src={img}
                style={{
                  height: "50px",
                  width: "50px",
                  cursor: "pointer",
                  border: selectedIndex === index && "2px solid orange",
                }}
                onMouseOver={() => setSelectedIndex(index)}
              ></img>
            </div>
          );
        })}
      </div>
      <div className="ms-3 rounded shadow-sm">
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: "Wristwatch by Ted Baker London",
              isFluidWidth: true,
              src: images[selectedIndex],
              height: 200,
            },
            largeImage: {
              src: images[selectedIndex],
              width: 1200,
              height: 1800,
            },
          }}
        />
      </div>
    </Col>
  );
};

export default memo(ImageGallery);
