import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import Footer from "./components/utils/Footer";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import AllCategoriesPage from "./pages/category/AllCategoriesPage";
import AllBrandsPage from "./pages/brand/AllBrandsPage";
import ProductsByBrand from "./pages/product/ProductsByBrand";
import ProductsByCategory from "./pages/product/ProductsByCategory";
import NotFound404 from "./components/error/NotFound404";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import AdminAllOrdersPage from "./pages/admin/AdminAllOrdersPage";
import ProtectedRouteHook from "./hook/auth/protect_route_hook";
import CartPage from "./pages/cart/CartPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import VerifyCodePage from "./pages/auth/VerifyCodePage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import AdminAllProductsPage from "./pages/admin/AdminAllProductsPage";
import AdminAllCategoriesPage from "./pages/admin/AdminAllCategoriesPage";
import { useEffect, useState } from "react";
import NoIntenetError from "./components/error/NetworkError";
import "react-toastify/dist/ReactToastify.css";
import AdminAllBrandsPage from "./pages/admin/AdminAllBrandsPage";
import AdminAllSubCategoriesPage from "./pages/admin/AdminAllSubcategoriesPage";
import AllFeaturedPage from "./pages/product/AllFeaturedPage";
import AllMostSellingsPage from "./pages/product/AllMostSellingsPage";
import ShopProductsPage from "./pages/product/ShopProductsPage";
import UserProfilePage from "./pages/user/UserProfilePage";
import UserWishlistPage from "./pages/user/UserWishlistPage";
import { Spinner } from "react-bootstrap";
import UserAddressesPage from "./pages/user/UserAddressesPage";
import ProductDetailsPage from "./pages/product/ProductDetailsPage";
import AdminAllCouponsPage from "./pages/admin/AdminAllCouponsPages";
import UserOrdersPage from "./pages/user/UserOrdersPage";
import OrderDetailsPage from "./pages/order/OrderDetailsPage";
import CheckoutSuccessPage from "./pages/order/CheckoutSuccessPage";

const App = () => {
  const { user, isLoading } = ProtectedRouteHook();
  // const { loading: cartLoading } = GetUserCartHook();

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // CHECK IF ONLINE OR OFFLINE
  useEffect(() => {
    function onlineHandler() {
      setIsOnline(true);
    }

    function offlineHandler() {
      setIsOnline(false);
    }

    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);

    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, []);

  return (
    <div className="font">
      {isOnline === true ? (
        isLoading === true ? (
          <div
            className="m-auto d-flex align-items-center justify-content-center"
            style={{ height: "100vh" }}
          >
            <Spinner></Spinner>
          </div>
        ) : (
          <BrowserRouter>
            <Routes>
              <Route index element={<HomePage></HomePage>} />

              <Route path="/register" element={<RegisterPage />}></Route>

              <Route path="/login" element={<LoginPage />}></Route>

              <Route
                path="/forget-password"
                element={<ForgotPasswordPage />}
              ></Route>

              <Route path="/verify-code" element={<VerifyCodePage />}></Route>

              <Route
                path="/reset-password"
                element={<ResetPasswordPage></ResetPasswordPage>}
              ></Route>

              <Route
                path="/all-categories"
                element={<AllCategoriesPage></AllCategoriesPage>}
              ></Route>

              <Route
                path="/featured-products"
                element={<AllFeaturedPage></AllFeaturedPage>}
              ></Route>

              <Route
                path="/most-sellings"
                element={<AllMostSellingsPage></AllMostSellingsPage>}
              ></Route>

              <Route
                path="/product/:id"
                element={<ProductDetailsPage></ProductDetailsPage>}
              ></Route>

              <Route
                path="/products/category/:id"
                element={<ProductsByCategory></ProductsByCategory>}
              ></Route>

              <Route
                path="/all-brands"
                element={<AllBrandsPage></AllBrandsPage>}
              ></Route>

              <Route
                path="/results"
                element={<ShopProductsPage></ShopProductsPage>}
              ></Route>

              <Route
                path="/products/brand/:id"
                element={<ProductsByBrand></ProductsByBrand>}
              ></Route>

              {/* ADMIN PROTECTED ROUTES */}
              <Route
                element={
                  <ProtectedRoute
                    auth={user && user.role === "admin"}
                  ></ProtectedRoute>
                }
              >
                <Route
                  path="/admin/products"
                  element={<AdminAllProductsPage></AdminAllProductsPage>}
                ></Route>

                <Route
                  path="/admin/categories"
                  element={<AdminAllCategoriesPage></AdminAllCategoriesPage>}
                ></Route>

                <Route
                  path="/admin/sub-categories"
                  element={
                    <AdminAllSubCategoriesPage></AdminAllSubCategoriesPage>
                  }
                ></Route>

                <Route
                  path="/admin/brands"
                  element={<AdminAllBrandsPage></AdminAllBrandsPage>}
                ></Route>

                <Route
                  path="/admin/orders"
                  element={<AdminAllOrdersPage></AdminAllOrdersPage>}
                ></Route>
                <Route
                  path="/orders/:id"
                  element={<OrderDetailsPage></OrderDetailsPage>}
                ></Route>
                <Route
                  path="/admin/coupons"
                  element={<AdminAllCouponsPage></AdminAllCouponsPage>}
                ></Route>
                <Route
                  path="/admin/users"
                  element={<AdminAllOrdersPage></AdminAllOrdersPage>}
                ></Route>
              </Route>

              {/*USER PROTECTED ROUTES */}
              <Route
                element={
                  <ProtectedRoute
                    auth={user && user.role === "user"}
                  ></ProtectedRoute>
                }
              >
                <Route path="/cart" element={<CartPage />}></Route>
                <Route
                  path="/account"
                  element={<UserProfilePage></UserProfilePage>}
                ></Route>
                <Route
                  path="/wishlist"
                  element={<UserWishlistPage></UserWishlistPage>}
                ></Route>
                <Route
                  path="/addresses"
                  element={<UserAddressesPage></UserAddressesPage>}
                ></Route>
                <Route
                  path="/orders"
                  element={<UserOrdersPage></UserOrdersPage>}
                ></Route>
                <Route
                  path="/checkout-success"
                  element={<CheckoutSuccessPage></CheckoutSuccessPage>}
                ></Route>
              </Route>

              {/* NOT FOUND ROUTE */}
              <Route path="*" element={<NotFound404></NotFound404>}></Route>
            </Routes>
          </BrowserRouter>
        )
      ) : (
        <NoIntenetError></NoIntenetError>
      )}

      <Footer></Footer>
    </div>
  );
};

export default App;
