// import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";

const AdminSubTitle = ({
  title,
  btnTitle = "Add",
  onAddClick,
  onSearch,
  placeholder = "Search by name...",
  search = true,
}) => {
  // const categories = useSelector((state) => state.Category.categories);

  // const [, setFilteredCategories] = useState([]);
  // const [, setOriginalCategories] = useState([]);

  // useEffect(() => {
  //   setFilteredCategories(categories);
  //   setOriginalCategories(categories);
  // }, [categories]);

  return (
    <div
      style={{ position: "sticky", zIndex: "99" }}
      className="mt-3 d-flex justify-content-between"
    >
      <p className="sub-title">{title}</p>
      {search && (
        <div>
          <input
            className="user-input p-2"
            type="search"
            placeholder={placeholder}
            onChange={onSearch}
            style={{ outline: "none" }}
          ></input>
        </div>
      )}

      {btnTitle && (
        <div style={{ textDecoration: "none" }}>
          <div onClick={onAddClick} className="shopping-now">
            {btnTitle}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSubTitle;
