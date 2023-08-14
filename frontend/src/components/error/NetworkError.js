import Lottie from "lottie-react";
import networkError from "../../animations/no-internet-connection.json";

const NoIntenetError = () => {
  return (
    <div style={{ height: "100vh" }}>
      <Lottie
        style={{ width: "50%", height: "50%", margin: "auto" }}
        animationData={networkError}
        loop={false}
      />
    </div>
  );
};

export default NoIntenetError;
