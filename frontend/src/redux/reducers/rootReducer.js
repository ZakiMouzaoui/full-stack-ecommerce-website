import { combineReducers } from "redux";
import brandReducer from "./brandReducer";
import categoryReducer from "./categoryReducer";
import productReducer from "./productReducer";
import authReducer from "./authReducer";
import subCategoryReducer from "./subCategoryReducer";
import FilterReducer from "./filterReducer";
import wishListReducer from "./wishlistReducer";
import addressReducer from "./addressReducer";
import reviewReducer from "./reviewReducer";
import cartReducer from "./cartReducer";
import couponReducer from "./couponReducer";
import orderReducer from "./orderReducer";

export default combineReducers({
  Product: productReducer,
  Category: categoryReducer,
  SubCategory: subCategoryReducer,
  Brand: brandReducer,
  Filter: FilterReducer,
  Auth: authReducer,
  Wishlist: wishListReducer,
  Address: addressReducer,
  Review: reviewReducer,
  Cart: cartReducer,
  Coupon: couponReducer,
  Order: orderReducer,
});
