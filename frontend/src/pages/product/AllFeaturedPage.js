import CardProductContainer from "../../components/product/CardProductContainer";
import NavBarLogin from "../../components/utils/NavBarLogin";
import ViewFeaturedProductsHook from "../../hook/product/view_featured_products_hook";

const AllFeaturedPage = () => {
  const [products, loading] = ViewFeaturedProductsHook(10);

  return (
    <>
      <NavBarLogin></NavBarLogin>
      <CardProductContainer
        loading={loading}
        items={products}
        title="Featured Products"
        limit={10}
      ></CardProductContainer>
    </>
  );
};

export default AllFeaturedPage;
