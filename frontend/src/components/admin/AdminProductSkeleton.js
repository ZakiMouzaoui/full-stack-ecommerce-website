import { Card } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

const AdminProductSkeleton = () => {
  return (
    <div
      className="my-2"
      style={{
        borderRadius: "8px",
        minWidth: "170px",
        border: "none",
        height: "200px",
      }}
    >
      <div className="d-flex justify-content-between pt-3 px-3">
        <div style={{ cursor: "pointer" }}>
          <Skeleton circle true width={20} height={20}></Skeleton>
          <Skeleton circle true width={20} height={20}></Skeleton>
        </div>
      </div>
      <div style={{ height: "100%" }}></div>
      <div className="py-0">
        <div className="card-title"></div>

        <divt>
          <div className="d-flex justify-content-between">
            <div className="d-flex card-rate mt-1">
              <p></p>
            </div>

            <div className="card-price"></div>
          </div>
        </divt>
      </div>
    </div>
  );
};

export default AdminProductSkeleton;
