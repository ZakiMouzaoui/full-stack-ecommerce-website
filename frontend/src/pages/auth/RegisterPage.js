import { Link } from "react-router-dom";
import RegisterHook from "../../hook/auth/register_hook";
import { Spinner } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoIntenetError from "../../components/error/NetworkError";
import NavBarLogin from "../../components/utils/NavBarLogin";

const RegisterPage = () => {
  const [
    loading,
    isPressed,
    onChangeName,
    onChangeEmail,
    onChangePassword,
    onChnageConfirmPassword,
    onSubmit,
    error,
  ] = RegisterHook();

  return (
    <div style={{ minHeight: "670px" }}>
      <NavBarLogin></NavBarLogin>
      {error && error.code === "ERR_NETWORK" ? (
        <NoIntenetError></NoIntenetError>
      ) : (
        <div>
          <div className="title-login text-center mt-4">Register</div>
          <div
            className="mt-3"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <input
              type="text"
              placeholder="Name..."
              className="user-input text-center mb-3"
              onChange={onChangeName}
            />
            <input
              type="text"
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
            <input
              type="password"
              placeholder="Confirm Password..."
              className="user-input text-center mb-3"
              onChange={onChnageConfirmPassword}
            />
            <button onClick={onSubmit} className="btn-login mx-auto mb-3">
              {loading === true && isPressed === true ? (
                <Spinner></Spinner>
              ) : (
                "Register"
              )}
            </button>
            <label>
              Already have an account?{" "}
              <Link style={{ textDecoration: "none" }} to="/login">
                <span style={{ cursor: "pointer" }} className="text-danger">
                  Login here
                </span>
              </Link>
            </label>
          </div>
          <ToastContainer></ToastContainer>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
