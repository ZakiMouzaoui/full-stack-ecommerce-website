import { Spinner } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import NoIntenetError from "../../components/error/NetworkError";
import ResetPassWordHook from "../../hook/auth/reset_password_hook";

const ResetPasswordPage = () => {
  const [
    loading,
    onChangeEmail,
    onChangePassword,
    onChangeConfirmPassword,
    onSubmit,
    isPressed,
    error,
  ] = ResetPassWordHook();

  return (
    <div style={{ minHeight: "670px" }}>
      {error && error.code === "ERR_NETWORK" ? (
        <NoIntenetError></NoIntenetError>
      ) : (
        <div>
          <div className="title-login text-center mt-4">Reset Password</div>
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
              placeholder="New password..."
              className="user-input text-center mb-3"
              onChange={onChangePassword}
            />
            <input
              type="password"
              placeholder="Confirm new password..."
              className="user-input text-center mb-3"
              onChange={onChangeConfirmPassword}
            />
            <button
              type="submit"
              onClick={onSubmit}
              className="btn-login mx-auto mb-3"
            >
              {isPressed === true && loading === true ? (
                <Spinner></Spinner>
              ) : (
                "Login"
              )}
            </button>
          </div>
          <ToastContainer></ToastContainer>
        </div>
      )}
    </div>
  );
};

export default ResetPasswordPage;
