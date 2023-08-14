import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/actions/categoryAction";
import { getData } from "../../hooks/useGetData";
import { GET_ERROR } from "../../redux/type";

const AllCategoriesPageHook = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [isServerError, setIsServerError] = useState(false);

  const categories = useSelector((state) => state.Category.categories);
  const filtered = useSelector((state) => state.Category.filtered);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getData(`/categories`);

        dispatch(fetchCategories(response.data));
      } catch (e) {
        if (e.code === "ERR_NETWORK") {
          setIsServerError(true);
        }
        dispatch({
          type: GET_ERROR,
          payload: e,
        });
      }
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  // const getPage = async (page) => {
  //   setLoading(true);
  //   try {
  //     const response = await getData(`/categories?page=${page}&limit=8`);

  //     dispatch(fetchCategories(response, page - 1));
  //   } catch (e) {
  //     dispatch({
  //       type: GET_ERROR,
  //       payload: e,
  //     });
  //   }
  // };
  return [loading, categories, filtered, isServerError];
};

export default AllCategoriesPageHook;
