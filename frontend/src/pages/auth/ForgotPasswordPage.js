import NoIntenetError from "../../components/error/NetworkError";
import ForgotPasswordHook from "../../hook/auth/forgot_password_hook";
import { Spinner } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

const ForgotPasswordPage = () => {
  const [onChangeEmail, loading, isPressed, onSubmit, error] =
    ForgotPasswordHook();

  return (
    <div style={{ minHeight: "670px" }}>
      {error && error.code === "ERR_NETWORK" ? (
        <NoIntenetError></NoIntenetError>
      ) : (
        <div>
          <div className="title-login text-center mt-4">Forgot password</div>
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

            <button
              disabled={isPressed && loading}
              type="submit"
              onClick={onSubmit}
              className="btn-login mx-auto mb-3"
            >
              {isPressed === true && loading === true ? (
                <Spinner></Spinner>
              ) : (
                "Send"
              )}
            </button>
          </div>
          <ToastContainer></ToastContainer>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
