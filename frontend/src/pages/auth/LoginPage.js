import { Link } from "react-router-dom";
import LoginHook from "../../hook/auth/login_hook";
import { Spinner } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import NoIntenetError from "../../components/error/NetworkError";
import NavBarLogin from "../../components/utils/NavBarLogin";

const LoginPage = () => {
  const [loading, onChangeEmail, onChangePassword, onSubmit, isPress, error] =
    LoginHook();

  return (
    <div style={{ minHeight: "670px" }}>
      <NavBarLogin></NavBarLogin>
      {error && error.code === "ERR_NETWORK" ? (
        <NoIntenetError></NoIntenetError>
      ) : (
        <div>
          <div className="title-login text-center mt-4">Login</div>
          <div
            className="mt-3"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <input
              type="email"
              placeholder="Email..."
              className="user-input text-center mb-3"
              onChange={onChangeEmail}
            />
            <input
              type="password"
              placeholder="Password..."
              className="user-input text-center mb-3"
              onChange={onChangePassword}
            />
            <button
              type="submit"
              onClick={onSubmit}
              className="btn-login mx-auto mb-3"
            >
              {isPress === true && loading === true ? (
                <Spinner></Spinner>
              ) : (
                "Login"
              )}
            </button>
            <label>
              You dont have an account?{" "}
              <Link style={{ textDecoration: "none" }} to="/register">
                <span style={{ cursor: "pointer" }} className="text-danger">
                  Register here
                </span>
              </Link>
            </label>
            <label className="mx-auto my-4">
              <Link
                to="/forget-password"
                style={{ textDecoration: "none", color: "#212529" }}
              >
                Forgot your password?
              </Link>
            </label>
          </div>
          <ToastContainer></ToastContainer>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
