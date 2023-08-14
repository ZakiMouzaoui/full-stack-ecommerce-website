import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../hooks/useGetData";
import { FETCH_PRODUCTS, FILTER_PRODUCTS_BRAND } from "../../redux/type";
import { useLocation } from "react-router-dom";

const ViewProductResultsHook = () => {
  // const keyword = useSelector((state) => state.Filter.searchKeyword);
  // const selectedCategory = useSelector(
  //   (state) => state.Filter.selectedCategory
  // );
  // const checkedBrands = useSelector((state) => state.Filter.checkedBrands);
  // const minPrice = useSelector((state) => state.Filter.minPrice);
  // const maxPrice = useSelector((state) => state.Filter.maxPrice);
  // const sort = useSelector((state) => state.Filter.sort);

  // const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  // const products = useSelector((state) => state.Filter.products);

  // useEffect(() => {
  //   console.log("useeffect called");
  //   // const searchParams = new URLSearchParams(location.search);
  //   // const keyword = searchParams.get("keyword");

  //   // const fetch = async () => {
  //   //   setLoading(true);
  //   //   const res = await getData(`/products?keyword=${keyword}`);
  //   //   dispatch({ type: FETCH_PRODUCTS, products: res.data });
  //   //   setLoading(false);
  //   // };

  //   // fetch();
  //   setLoading(false);
  // }, [dispatch]);

  const fetchData = useCallback(
    async (
      keyword,
      selectedCategory,
      brands,
      minPrice,
      maxPrice,
      sort,
      brandChange,
      page = 1
    ) => {
      let catQuery = "";
      let brandQuery = "";
      let minPriceQuery = "";
      let maxPriceQuery = "";
      let sortQuery = "";

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

      try {
        const response = await getData(
          `/products?keyword=${keyword}&${catQuery}&${brandQuery}&${minPriceQuery}&${maxPriceQuery}&${sortQuery}`
        );

        if (brandChange === false) {
          dispatch({
            type: FETCH_PRODUCTS,
            products: response.data,
            pageCount: response.paginationResult.totalPages,
            currentPage:
              response.paginationResult.nextPage - 1 ||
              response.paginationResult.totalPages,
          });
        } else {
          dispatch({
            type: FILTER_PRODUCTS_BRAND,
            products: response.data,
            pageCount: response.paginationResult.totalPages,
            currentPage:
              response.paginationResult.nextPage - 1 ||
              response.paginationResult.totalPages,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch]
  );

  // const getProducts = useCallback(
  //   async (brandChange, page) => {
  //     setLoading(true);

  //     await fetchData(
  //       keyword,
  //       selectedCategory,
  //       checkedBrands,
  //       minPrice,
  //       maxPrice,
  //       sort,
  //       brandChange,
  //       page
  //     );
  //     setLoading(false);
  //   },
  //   [
  //     fetchData,
  //     keyword,
  //     checkedBrands,
  //     selectedCategory,
  //     minPrice,
  //     maxPrice,
  //     sort,
  //   ]
  // );

  // useEffect(() => {
  //   getProducts(false);
  // }, [dispatch, selectedCategory, sort, minPrice, maxPrice, getProducts]);

  // useEffect(() => {
  //   getProducts(true);
  // }, [checkedBrands, getProducts]);

  // const onPress = (page) => {
  //   getProducts(false, page);
  // };
};

export default ViewProductResultsHook;
