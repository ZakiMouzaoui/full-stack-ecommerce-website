import CardProductContainer from "../../components/product/CardProductContainer";
import NavBarLogin from "../../components/utils/NavBarLogin";
import ViewMostSellingProductsHook from "../../hook/product/view_most_selling_products_hook";

const AllMostSellingsPage = () => {
  const [products, loading] = ViewMostSellingProductsHook(10);

  return (
    <>
      <NavBarLogin></NavBarLogin>
      <CardProductContainer
        loading={loading}
        items={products}
        title="Most Sellings"
        limit={10}
      ></CardProductContainer>
    </>
  );
};

export default AllMostSellingsPage;
