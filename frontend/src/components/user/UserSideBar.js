import { Link } from "react-router-dom";

const UserSideBar = ({ index = 0 }) => {
  return (
    <div className="py-3">
      <div className="sidebar d-flex flex-column">
        <div>
          <Link to="/account" style={{ textDecoration: "none" }}>
            <div>
              <div
                className={
                  index === 0
                    ? "admin-side-active admin-side-text my-1 py-2 mx-auto border-bottom"
                    : "admin-side-text my-1 py-2 mx-auto border-bottom"
                }
              >
                My Account
              </div>
            </div>
          </Link>
          <Link to="/wishlist" style={{ textDecoration: "none" }}>
            <div>
              <div
                className={
                  index === 1
                    ? "admin-side-active admin-side-text my-1 py-2 mx-auto border-bottom"
                    : "admin-side-text my-1 py-2 mx-auto border-bottom"
                }
              >
                My Wishlist
              </div>
            </div>
          </Link>
          <Link to="/addresses" style={{ textDecoration: "none" }}>
            <div>
              <div
                className={
                  index === 2
                    ? "admin-side-active admin-side-text my-1 py-2 mx-auto border-bottom"
                    : "admin-side-text my-1 py-2 mx-auto border-bottom"
                }
              >
                My Addresses
              </div>
            </div>
          </Link>
          <Link to="/orders" style={{ textDecoration: "none" }}>
            <div>
              <div
                className={
                  index === -1
                    ? "admin-side-active admin-side-text my-1 py-2 mx-auto border-bottom"
                    : "admin-side-text my-1 py-2 mx-auto border-bottom"
                }
              >
                My Orders
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserSideBar;
