import CategoryHeader from "../../components/product/CategoryHeader";
import NavBarLogin from "../../components/utils/NavBarLogin";
import ProductDetails from "../../components/product/ProductDetails";
import ReviewContainer from "../../components/review/ReviewContainer";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { memo } from "react";
import RelatedProducts from "../../components/product/RelatedProducts";

const ProductDetailsPage = () => {
  const { id } = useParams("id");

  return (
    <div style={{ minHeight: "670px" }}>
      <NavBarLogin></NavBarLogin>
      <CategoryHeader></CategoryHeader>
      <ProductDetails id={id}></ProductDetails>
      <ReviewContainer productId={id}></ReviewContainer>
      <RelatedProducts></RelatedProducts>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default memo(ProductDetailsPage);
