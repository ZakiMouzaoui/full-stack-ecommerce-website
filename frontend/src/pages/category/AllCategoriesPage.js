import { Pagination } from "../../components/utils/Pagination";
import CategoryContainer from "../../components/category/CategoryContainer";
import AllCategoriesPageHook from "../../hook/category/all_categories_page_hook";

const AllCategoriesPage = () => {
  const [categories, loading, pageCount, getPage] = AllCategoriesPageHook();

  return (
    <div style={{ minHeight: "670px" }}>
      <CategoryContainer
        data={categories}
        loading={loading}
      ></CategoryContainer>
      <Pagination pageCount={pageCount} onPress={getPage}></Pagination>
    </div>
  );
};

export default AllCategoriesPage;
