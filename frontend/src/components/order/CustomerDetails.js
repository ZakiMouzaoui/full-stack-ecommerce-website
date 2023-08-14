import { Fragment, memo } from "react";
import SubTitle from "../utils/SubTitle";
import { Col } from "react-bootstrap";

const CustomDetails = ({ user }) => {
  return (
    <Fragment>
      <SubTitle title="Customer Details"></SubTitle>
      <div className="bg-white p-3 rounded shadow-sm">
        <p>
          <b>Name: </b>
          {user.name}
        </p>
        <p>
          <b>Email: </b>
          {user.email}
        </p>
        <p className="mb-0">
          <b>Phone: </b>
          {user.phone}
        </p>
      </div>
    </Fragment>
  );
};

export default memo(CustomDetails);
