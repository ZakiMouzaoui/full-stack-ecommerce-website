import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubCategories } from "../../redux/actions/subCategoryAction";
import { getData } from "../../hooks/useGetData";
import { GET_ERROR } from "../../redux/type";
import { fetchCategories } from "../../redux/actions/categoryAction";

const AllSubCategoriesPageHook = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [isServerError, setIsServerError] = useState(false);
  const subcategories = useSelector((state) => state.SubCategory.subcategories);
  const filtered = useSelector((state) => state.SubCategory.filtered);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getData(`/sub-categories`);
        const categories = await getData("categories");

        dispatch(fetchSubCategories(response.data));
        dispatch(fetchCategories(categories.data));
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

  return [loading, subcategories, filtered, isServerError];
};

export default AllSubCategoriesPageHook;
