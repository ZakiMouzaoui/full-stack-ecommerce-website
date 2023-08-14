import { Col, Container, Row } from "react-bootstrap";
import NavBarLogin from "../../components/utils/NavBarLogin";
import UserSideBar from "../../components/user/UserSideBar";
import UserWishlist from "../../components/user/UserWishlist";
// import { useEffect } from "react";
// import { getDataWithToken } from "../../hooks/useGetData";
// import { useDispatch } from "react-redux";
// import { GET_WISHLIST } from "../../redux/type";
import { ToastContainer } from "react-toastify";
// import { useNavigate } from "react-router-dom";

const UserWishlistPage = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const getItems = async () => {
  //     try {
  //       const res = await getDataWithToken("/wishlist");
  //       dispatch({ type: GET_WISHLIST, payload: res.data });
  //     } catch (err) {
  //       console.log(err);
  //       if (err.response.data.message === "jwt expired") {
  //         navigate("/login");
  //       }
  //     }
  //   };
  //   getItems();
  // }, [dispatch, navigate]);
  return (
    <div className="font" style={{ minHeight: "90vh" }}>
      <NavBarLogin></NavBarLogin>
      <Container>
        <Row className="py-3">
          <Col sm="12" md="6" lg="3">
            <UserSideBar index={1}></UserSideBar>
          </Col>
          <Col sm="12" md="6" lg="9">
            <UserWishlist></UserWishlist>
          </Col>
        </Row>
      </Container>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default UserWishlistPage;
