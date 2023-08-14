import { memo } from "react";
import { Link } from "react-router-dom";

const AdminSideBar = ({ index }) => {
  return (
    <div
      className="ps-4 py-3"
      style={{ height: "200px", position: "fixed", width: "inherit" }}
    >
      <div className="sidebar">
        <div className="d-flex flex-column">
          <Link to="/admin/products" style={{ textDecoration: "none" }}>
            <div>
              <div
                className={
                  index === 0
                    ? "admin-side-active admin-side-text my-1 py-2 mx-auto border-bottom"
                    : "admin-side-text my-1 py-2 mx-auto border-bottom"
                }
              >
                Manage Products
              </div>
            </div>
          </Link>
          <Link to="/admin/categories" style={{ textDecoration: "none" }}>
            <div>
              <div
                className={
                  index === 1
                    ? "admin-side-active admin-side-text my-1 py-2 mx-auto border-bottom"
                    : "admin-side-text my-1 py-2 mx-auto border-bottom"
                }
              >
                Manage Categories
              </div>
            </div>
          </Link>
          <Link to="/admin/sub-categories" style={{ textDecoration: "none" }}>
            <div>
              <div
                className={
                  index === 2
                    ? "admin-side-active admin-side-text my-1 py-2 mx-auto border-bottom"
                    : "admin-side-text my-1 py-2 mx-auto border-bottom"
                }
              >
                Manage Subcategories
              </div>
            </div>
          </Link>
          <Link to="/admin/brands" style={{ textDecoration: "none" }}>
            <div>
              <div
                className={
                  index === 3
                    ? "admin-side-active admin-side-text my-1 py-2 mx-auto border-bottom"
                    : "admin-side-text my-1 py-2 mx-auto border-bottom"
                }
              >
                Manage Brands
              </div>
            </div>
          </Link>
          <Link to="/admin/orders" style={{ textDecoration: "none" }}>
            <div>
              <div
                className={
                  index === 4
                    ? "admin-side-active admin-side-text my-1 py-2 mx-auto border-bottom"
                    : "admin-side-text my-1 py-2 mx-auto border-bottom"
                }
              >
                Manage Orders
              </div>
            </div>
          </Link>
          <Link to="/admin/coupons" style={{ textDecoration: "none" }}>
            <div>
              <div
                className={
                  index === 5
                    ? "admin-side-active admin-side-text my-1 py-2 mx-auto border-bottom"
                    : "admin-side-text my-1 py-2 mx-auto border-bottom"
                }
              >
                Manage Coupons
              </div>
            </div>
          </Link>
          <Link style={{ textDecoration: "none" }}>
            <div>
              <div
                className={
                  index === 6
                    ? "admin-side-active admin-side-text my-1 py-2 mx-auto border-bottom"
                    : "admin-side-text my-1 py-2 mx-auto border-bottom"
                }
              >
                Manage Users
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default memo(AdminSideBar);
