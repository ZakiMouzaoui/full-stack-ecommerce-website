import { Container, Spinner } from "react-bootstrap";
import VerificationInput from "react-verification-input";
import VerifyCodeHook from "../../hook/auth/verify_code_hook";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const VerifyCodePage = () => {
  const [onComplete, loading, isCompleted] = VerifyCodeHook();

  return (
    <Container
      style={{ minHeight: "78vh", flexDirection: "column" }}
      className="d-flex align-items-center justify-content-center"
    >
      <div className="title-login text-center mb-4">Verify Code</div>
      {loading === true && isCompleted === true ? (
        <Spinner></Spinner>
      ) : (
        <VerificationInput
          autoFocus={true}
          validChars="0-9"
          onComplete={onComplete}
        ></VerificationInput>
      )}
      <Link to="/forget-password">
        <label style={{ color: "#212529", cursor: "pointer" }} className="mt-2">
          Didn't receive your code?
        </label>
      </Link>

      <ToastContainer></ToastContainer>
    </Container>
  );
};

export default VerifyCodePage;
