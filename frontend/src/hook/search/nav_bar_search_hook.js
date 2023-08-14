import { useRef } from "react";
import { useDispatch } from "react-redux";
import {
  CHANGE_MAX_PRICE,
  CHANGE_MIN_PRICE,
  CHECK_BRAND,
  CHECK_CATEGORY,
  SEARCH_KEYWORD,
} from "../../redux/type";
import { useNavigate } from "react-router-dom";

const NavBarSearchHook = () => {
  const url = new URL(window.location);
  const searchRef = useRef(url.searchParams.get("keyword"));
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onSearchChange = (e) => {
    searchRef.current = e.target.value;
  };

  const onSearchComplete = async (e) => {
    const value = e.target.value.trim();

    if (e.keyCode === 13 && value !== "") {
      if (value !== url.searchParams.get("keyword")) {
        // url.searchParams.delete("category");
        // url.searchParams.delete("brand");
        // url.searchParams.delete("minPrice");
        // url.searchParams.delete("maxPrice");
        // url.searchParams.delete("sort");
        // url.searchParams.delete("page");

        dispatch({
          type: SEARCH_KEYWORD,
          keyword: value,
        });

        dispatch({
          type: CHECK_CATEGORY,
          category: null,
        });
        dispatch({
          type: CHECK_BRAND,
          checkedBrands: [],
        });
        dispatch({
          type: CHANGE_MIN_PRICE,
          price: null,
        });
        dispatch({
          type: CHANGE_MAX_PRICE,
          price: null,
        });
        dispatch({
          type: "CHANGE_PAGE",
          page: 1,
        });
        navigate(`/results?keyword=${value}&page=1`);
      }
      // if (window.location.pathname === "/results") {
      //   url.searchParams.set("keyword", value);
      // }
      // url.searchParams.set("keyword", value);

      // window.history.pushState(null, "", url.toString());
      // if (window.location.pathname !== "/results") {
      //   console.log("not same page");
      //   navigate(`/results?keyword=${value}&page=1`);
      // }
    }
  };

  // useEffect(() => {
  //   if (window.location.pathname === "/results") {
  //     key.current = url.searchParams.get("keyword");
  //   }
  // }, [url.searchParams]);

  return [onSearchChange, onSearchComplete, searchRef.current];
};

export default NavBarSearchHook;
