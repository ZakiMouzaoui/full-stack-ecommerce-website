import { Container } from "react-bootstrap";
import twitter from "../../images/twitter.png";
import facebook from "../../images/facebook.png";
import instagram from "../../images/instagram.png";
import phone from "../../images/phone.png";

const Footer = () => {
  return (
    <div className="footer footer-background mt-3 py-3">
      <Container>
        <div className="footer-shroot d-flex justify-content-between">
          <div className="d-flex" style={{ height: "25px" }}>
            <img className="ms-3" alt="" src={twitter}></img>
            <img alt="" src={instagram}></img>
            <img alt="" src={facebook}></img>
            <p className="mt-1 ms-2">0558405601</p>
            <img alt="" src={phone}></img>
          </div>
          <div className="d-flex text-center" style={{ height: "25px" }}>
            <p className="me-3">Contact Us</p>

            <p className="me-3">Privacy Policy</p>
            <p className="me-4">Conditions and Usage</p>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Footer;
