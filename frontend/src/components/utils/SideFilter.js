import { useSelector } from "react-redux";
import SideFilterHook from "../../hook/search/side_filter_hook";
import { memo } from "react";

const SideFilter = () => {
  const [
    categories,
    brands,
    onCategoryClick,
    onBrandClick,
    minPriceRef,
    maxPriceRef,
    onMinPriceChange,
    onMaxPriceChange,
    onPriceSubmit,
  ] = SideFilterHook();
  const category = useSelector((state) => state.Filter.selectedCategory);
  const checkedBrands = useSelector((state) => state.Filter.checkedBrands);
  const brandsCount = useSelector((state) => state.Filter.brandsCount);

  return (
    <div className="d-flex flex-column mt-2">
      <div style={{ fontWeight: "bold" }}>Category</div>
      {/* {categories.length > 1 && (
        <div className="d-flex mt-3">
          <input
            type="radio"
            name="category"
            value={0}
            checked={category === null}
            onChange={onCategoryClick}
          />
          <div className="ms-2 ">All</div>
        </div>
      )} */}

      {categories.length === 1 ? (
        <div key={categories[0]._id} className="d-flex mt-3">
          <input
            onChange={onCategoryClick}
            type="radio"
            name="category"
            value={categories[0]._id}
            checked={true}
          />
          <div className="ms-2 ">{categories[0].name}</div>
        </div>
      ) : (
        categories.map((item, index) => {
          return (
            <div key={index} className="d-flex mt-3">
              <input
                onChange={onCategoryClick}
                type="radio"
                name="category"
                value={item._id}
                checked={category === item._id}
              />
              <div className="ms-2 ">{item.name}</div>
            </div>
          );
        })
      )}
      <br></br>

      <div style={{ fontWeight: "bold" }}>Brand</div>
      {/* {brands.length > 1 && (
        <div className="d-flex mt-3">
          <input
            type="checkbox"
            checked={checkedBrands.length === 0}
            onChange={onBrandClick}
            value="0"
          />
          <div className="ms-2 ">All</div>
        </div>
      )} */}
      {brands.length === 1 ? (
        <div key={0} className="d-flex mt-3">
          <input
            type="checkbox"
            checked={true}
            value={brands[0]._id}
            disabled
          />
          <div className="ms-2 ">
            {brands[0].name} ({brandsCount[brands[0]._id]})
          </div>
        </div>
      ) : (
        brands.map((item, index) => {
          return (
            <div key={index} className="d-flex mt-3">
              <input
                type="checkbox"
                checked={checkedBrands.includes(item._id)}
                value={item._id}
                onChange={onBrandClick}
              />
              <div className="ms-2 ">
                {item.name} ({brandsCount[item._id]})
              </div>
            </div>
          );
        })
      )}
      <br></br>
      <div style={{ fontWeight: "bold" }}>Price</div>
      <div className="d-flex mt-3">
        <div>
          <label style={{ display: "block" }}>From</label>
          <input
            id="priceFrom"
            type="number"
            className="user-input"
            style={{ width: "50px" }}
            value={minPriceRef}
            onChange={onMinPriceChange}
          ></input>
        </div>

        <div className="ms-2">
          <label style={{ display: "block" }}>To</label>
          <input
            id="priceTo"
            type="number"
            className="user-input"
            style={{ width: "50px" }}
            value={maxPriceRef}
            onChange={onMaxPriceChange}
          ></input>
        </div>
        <button
          onClick={onPriceSubmit}
          className="shopping-now mt-4 ms-2"
          style={{ width: "50px" }}
        >
          Go
        </button>
      </div>
    </div>
  );
};

export default memo(SideFilter);
