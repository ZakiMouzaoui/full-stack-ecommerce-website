import SubTitle from "../utils/SubTitle";
import WishlistProductCard from "../wishlist/WishlistProductCard";
import { Row, Spinner } from "react-bootstrap";
import EmptyWishlist from "../error/EmptyWishlist";
import { useQuery } from "react-query";
import { getDataWithToken } from "../../hooks/useGetData";
import { useNavigate } from "react-router-dom";
import ServerError500 from "../error/ServerError500";
import { Fragment } from "react";

const UserWishlist = () => {
  // const wishlist = useSelector((state) => state.Wishlist.wishlist);
  const navigate = useNavigate();

  const { isLoading, data } = useQuery(
    "wishlist-items",
    () => getDataWithToken("/wishlist"),
    {
      onError: (err) => {
        if (err.response.status === 401) {
          navigate("/login");
        }
      },
      retry: false,
    }
  );

  return (
    <Fragment>
      <SubTitle title="My wishlist"></SubTitle>

      {data ? (
        data.data.length > 0 ? (
          <Row>
            {data.data.map((item) => {
              return <WishlistProductCard product={item}></WishlistProductCard>;
            })}
          </Row>
        ) : (
          <EmptyWishlist></EmptyWishlist>
        )
      ) : isLoading === true ? (
        <div className="d-flex justify-content-center">
          <Spinner></Spinner>
        </div>
      ) : (
        <ServerError500></ServerError500>
      )}
    </Fragment>
  );
};

export default UserWishlist;
