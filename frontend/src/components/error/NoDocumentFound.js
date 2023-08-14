import Lottie from "lottie-react";
import notFoundAnimation from "../../animations/no-document-found.json";

const NoDocumentFound = ({ width }) => {
  return (
    <div>
      <Lottie
        style={{ height: "250px" }}
        animationData={notFoundAnimation}
        loop={false}
      />
    </div>
  );
};

export default NoDocumentFound;
