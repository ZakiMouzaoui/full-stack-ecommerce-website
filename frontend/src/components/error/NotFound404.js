import Lottie from "lottie-react";
import notFoundAnimation from "../../animations/not-found-404.json";

const NotFound404 = () => {
  return (
    <div style={{ height: "100vh" }}>
      <Lottie
        style={{ width: "50%", height: "50%", margin: "auto" }}
        animationData={notFoundAnimation}
        loop={false}
      />
    </div>
  );
};

export default NotFound404;
