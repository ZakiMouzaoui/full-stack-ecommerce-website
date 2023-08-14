import { Col, Container, Row } from "react-bootstrap";
import NavBarLogin from "../../components/utils/NavBarLogin";
import UserSideBar from "../../components/user/UserSideBar";
import UserOrder from "../../components/user/UserOrder";
import { memo } from "react";

const UserOrdersPage = () => {
  return (
    <div className="font" style={{ minHeight: "90vh" }}>
      <NavBarLogin></NavBarLogin>
      <Container>
        <Row className="py-3">
          <Col sm="12" md="4" lg="3">
            <UserSideBar index={-1}></UserSideBar>
          </Col>
          <Col sm="12" md="8" lg="9">
            <UserOrder></UserOrder>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default memo(UserOrdersPage);
