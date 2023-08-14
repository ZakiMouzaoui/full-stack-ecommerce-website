import { getData } from "../../hooks/useGetData";
import { useDispatch, useSelector } from "react-redux";
import { GET_FILTERED_PRODUCTS } from "../../redux/type";
import { useEffect, useState } from "react";

const useFilterProductsHook = () => {
  const url = new URL(window.location);

  const dispatch = useDispatch();
  const keyword = useSelector((state) => state.Filter.searchKeyword);
  const products = useSelector((state) => state.Filter.products);
  const selectedCategory = useSelector(
    (state) => state.Filter.selectedCategory
  );
  const brands = useSelector((state) => state.Filter.checkedBrands);
  const minPrice = useSelector((state) => state.Filter.minPrice);
  const maxPrice = useSelector((state) => state.Filter.maxPrice);
  const sort = useSelector((state) => state.Filter.sort);
  const isBrandChecked = useSelector((state) => state.Filter.isBrandChecked);
  const page = useSelector((state) => state.Filter.currentPage);
  const pageCount = useSelector((state) => state.Filter.pageCount);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      let catQuery = "";
      let brandQuery = "";
      let minPriceQuery = "";
      let maxPriceQuery = "";
      let sortQuery = "";
      let keywordQuery = "";

      if (keyword) {
        keywordQuery = `keyword=${keyword}`;
      }

      if (selectedCategory) {
        catQuery = `category=${selectedCategory}`;
      }
      if (brands) {
        brandQuery = brands.map((brand) => `brand=${brand}`).join("&");
      }
      if (minPrice) {
        minPriceQuery = `price[gte]=${minPrice}`;
      }
      if (maxPrice) {
        maxPriceQuery = `price[lte]=${maxPrice}`;
      }
      if (sort !== "") {
        switch (sort) {
          case "latest":
            sortQuery = "sort=-createdAt";
            break;
          case "most-selling":
            sortQuery = "sort=-sold";
            break;
          case "most-rated":
            sortQuery = "sort=-avgRating";
            break;
          case "price-asc":
            sortQuery = "sort=price";
            break;
          case "price-desc":
            sortQuery = "sort=-price";
            break;
          default:
            sortQuery = "sort=-createdAt";
            break;
        }
      }

      const res = await getData(
        `/products?${keywordQuery}&${catQuery}&${brandQuery}&${minPriceQuery}&${maxPriceQuery}&${sortQuery}&limit=6&page=${page}`
      );

      dispatch({
        type: GET_FILTERED_PRODUCTS,
        products: res.data,
        filteredDocs: res.paginationResult.filteredDocs,
        isBrandChecked,
        pageCount: res.paginationResult.totalPages,
      });
      setFilteredProducts(res.paginationResult.filteredDocs);
      setLoading(false);
    };

    fetch();
  }, [
    keyword,
    dispatch,
    brands,
    selectedCategory,
    minPrice,
    maxPrice,
    sort,
    isBrandChecked,
    page,
  ]);

  const onPress = (page) => {
    url.searchParams.set("page", page);
    window.history.pushState(null, "", url.toString());
    dispatch({ type: "CHANGE_PAGE", page });
  };

  return {
    products,
    loading,
    keyword,
    pageCount,
    page,
    onPress,
    filteredProducts,
  };
};

export default useFilterProductsHook;
