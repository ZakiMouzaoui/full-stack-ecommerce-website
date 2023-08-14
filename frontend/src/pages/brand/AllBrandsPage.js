import BrandContainer from "../../components/brand/BrandContainer";
import NavBarLogin from "../../components/utils/NavBarLogin";
import HomeBrandHook from "../../hook/brand/home_brand_hook";

const AllBrandsPage = () => {
  const [data, loading] = HomeBrandHook();

  return (
    <div className="font" style={{ minHeight: "670px" }}>
      <NavBarLogin></NavBarLogin>
      <BrandContainer loading={loading} data={data}></BrandContainer>
      {/* <Pagination pageCount={pageCount} onPress={getPage}></Pagination> */}
    </div>
  );
};

export default AllBrandsPage;
