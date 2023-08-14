import UnopDropdown from "unop-react-dropdown";
import sort from "../../images/sort.png";
import { useDispatch, useSelector } from "react-redux";
import { SELECT_SORT } from "../../redux/type";

const FilterSort = () => {
  const handler = () => {};
  //   const sortType = useSelector((state) => state.Filter.sort);
  const dispatch = useDispatch();
  const url = new URL(window.location);

  const onSelectSort = (val) => {
    url.searchParams.set("sort", val);
    window.history.pushState(null, "", url.toString());
    dispatch({
      type: SELECT_SORT,
      sort: val,
    });
  };

  return (
    <div>
      <UnopDropdown
        trigger={
          <div>
            <img
              style={{
                height: "20px",
                width: "30px",
                marginRight: "2px",
                marginLeft: "3px",
              }}
              src={sort}
              alt="sort"
            ></img>
            <span>Sort by</span>
          </div>
        }
        onAppear={handler}
        onDisappearStart={handler}
        delay={0}
        hover
      >
        <ul>
          <div className="card-filter">
            <div
              onClick={() => onSelectSort("latest")}
              className="border-bottom card-filter-item"
            >
              Latest
            </div>
            <div
              onClick={() => onSelectSort("most-selling")}
              className="border-bottom card-filter-item"
            >
              Most Selling
            </div>
            <div
              onClick={() => onSelectSort("most-rated")}
              className="border-bottom card-filter-item"
            >
              Most Rated
            </div>
            <div
              onClick={() => onSelectSort("price-asc")}
              className="border-bottom card-filter-item"
            >
              Price Ascending
            </div>
            <div
              onClick={() => onSelectSort("price-desc")}
              className=" card-filter-item"
            >
              Price Descending
            </div>
          </div>
        </ul>
      </UnopDropdown>
    </div>
  );
};

export default FilterSort;
