import { Col, Container, Row } from "react-bootstrap";
import NavBarLogin from "../../components/utils/NavBarLogin";
import UserSideBar from "../../components/user/UserSideBar";
import UserAddress from "../../components/user/UserAddress";
import { ToastContainer } from "react-toastify";

const UserAddressesPage = () => {
  return (
    <div className="font" style={{ minHeight: "90vh" }}>
      <NavBarLogin></NavBarLogin>
      <Container>
        <Row className="py-3">
          <Col sm="12" md="6" lg="3">
            <UserSideBar index={2}></UserSideBar>
          </Col>
          <Col sm="12" md="6" lg="9">
            <UserAddress></UserAddress>
          </Col>
        </Row>
      </Container>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default UserAddressesPage;
