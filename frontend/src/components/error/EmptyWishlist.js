import Lottie from "lottie-react";

import emptyWishlist from "../../animations/empty-wishlist.json";

const EmptyWishlist = () => {
  return (
    <div>
      <Lottie
        style={{ width: "30%", minWidth: "250px", margin: "auto" }}
        animationData={emptyWishlist}
        loop={false}
      />
    </div>
  );
};

export default EmptyWishlist;
