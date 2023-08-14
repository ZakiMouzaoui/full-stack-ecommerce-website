import { Fragment } from "react";
import { Link } from "react-router-dom";

const SubTitle = ({ title, btnTitle, btnLink }) => {
  return (
    <Fragment>
      {title && (
        <div className="mt-3 d-flex justify-content-between">
          <p className="sub-title">{title}</p>

          {btnTitle && (
            <Link to={btnLink} style={{ textDecoration: "none" }}>
              <div className="shopping-now">{btnTitle}</div>
            </Link>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default SubTitle;
