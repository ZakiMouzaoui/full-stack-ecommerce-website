import { Fragment, memo } from "react";
import SubTitle from "../utils/SubTitle";

const ShippingAddress = ({ address }) => {
  return (
    <Fragment>
      <SubTitle title="Shipping Address"></SubTitle>
      <div className="bg-white p-3 rounded shadow-sm">
        <p>
          <b>City: </b>
          {address.city}
        </p>
        <p>
          <b>Street: </b>
          {address.street}
        </p>
        <p>
          <b>Details: </b>
          {address.details}
        </p>
        <p>
          <b>Postal Code: </b>
          {address.postalCode}
        </p>
        <p className="mb-0">
          <b>Phone: </b>
          {address.phone}
        </p>
      </div>
    </Fragment>
  );
};

export default memo(ShippingAddress);
