import { useEffect, useState } from "react";
import { fetchCategories } from "../../redux/actions/categoryAction";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../hooks/useGetData";

const HomeCategoriesHook = () => {
  const [loading, setLoading] = useState(false);
  const categories = useSelector((state) => state.Category.categories);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getData("/categories?limit=6");
        dispatch(fetchCategories(response.data));
      } catch (error) {}
      setLoading(false);
    };
    if (!categories) {
      fetchData();
    }
  }, [dispatch, categories]);

  return [categories, loading];
};

export default HomeCategoriesHook;
