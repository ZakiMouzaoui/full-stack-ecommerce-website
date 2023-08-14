import {
  Container,
  Dropdown,
  Form,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import logo from "../../images/logo.png";
import login from "../../images/login.png";

import NavBarSearchHook from "../../hook/search/nav_bar_search_hook";
import { useDispatch, useSelector } from "react-redux";
import { GET_WISHLIST, LOGIN_USER } from "../../redux/type";
import { Link } from "react-router-dom";
import { memo } from "react";
import CartTotalItems from "./CartTotalItems";

const NavBarLogin = () => {
  const user = useSelector((state) => state.Auth.loginUser);

  // const totalItems = localStorage.getItem("total-items");
  const [onKeywordChange, onSearchComplete, searchRef] = NavBarSearchHook();
  const dispatch = useDispatch();

  const capitalize = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const logout = (event) => {
    event.preventDefault();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch({ type: LOGIN_USER, user: null });
    dispatch({ type: GET_WISHLIST, payload: [] });
  };

  return (
    <Navbar sticky="top" bg="dark" variant="dark" expand="sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="" className="logo"></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Form.Control
            type="search"
            placeholder="Search..."
            className="me-2 w-100 text-center"
            aria-label="Search"
            style={{ outline: "none", border: "none" }}
            onChange={onKeywordChange}
            onKeyDown={onSearchComplete}
            id="search"
            defaultValue={searchRef}
          />

          <Nav>
            {user ? (
              <NavDropdown
                className="ms-2 d-flex justify-content-center"
                title={capitalize(user.name)}
                // id="basic-nav-dropdown"
                style={{ fontSize: "5rem !important" }}
              >
                {user.role === "user" ? (
                  <Dropdown.Item as={Link} to="/account">
                    Profile
                  </Dropdown.Item>
                ) : (
                  <NavDropdown.Item to="/admin/products" as={Link}>
                    Dashboard
                  </NavDropdown.Item>
                )}

                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout} href="/">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link
                className="nav-text d-flex mt-3 me-3 justify-content-center"
                as={Link}
                to="/login"
              >
                <img className="login-img" src={login} alt="login"></img>
                <p style={{ color: "white" }}>Login</p>
              </Nav.Link>
            )}
            {user && user.role === "user" && <CartTotalItems></CartTotalItems>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default memo(NavBarLogin);
