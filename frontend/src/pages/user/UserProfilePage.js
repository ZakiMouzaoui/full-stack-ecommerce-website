import NavBarLogin from "../../components/utils/NavBarLogin";
import UserSideBar from "../../components/user/UserSideBar";
import { Col, Container, Row } from "react-bootstrap";
import UserProfile from "../../components/user/UserProfile";

const UserProfilePage = () => {
  return (
    <div className="font" style={{ minHeight: "90vh" }}>
      <NavBarLogin></NavBarLogin>
      <Container>
        <Row className="py-3">
          <Col sm="12" md="6" lg="3">
            <UserSideBar></UserSideBar>
          </Col>
          <Col sm="12" md="6" lg="9">
            <UserProfile></UserProfile>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserProfilePage;
