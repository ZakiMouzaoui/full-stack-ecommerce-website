import Lottie from "lottie-react";
import serverError500 from "../../animations/server-error-500.json";

const ServerError500 = () => {
  return (
    <Lottie
      style={{ width: "70%", height: "70%", margin: "auto" }}
      animationData={serverError500}
      loop={false}
    />
  );
};

export default ServerError500;
