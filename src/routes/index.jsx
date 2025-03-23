import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/HomePage";
import ProductsPage from "../pages/ProductsPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import OrderConfirmationPage from "../pages/OrderConfirmationPage";
import AccountPage from "../pages/AccountPage";
import OrdersPage from "../pages/OrdersPage";
import WishlistPage from "../pages/WishlistPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import CategoriesPage from "../pages/CategoriesPage";
import DealsPage from "../pages/DealsPage";
import NotFoundPage from "../pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/products",
    element: <ProductsPage />,
  },
  {
    path: "/products/:productId",
    element: <ProductDetailPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
  {
    path: "/order-confirmation/:orderId",
    element: <OrderConfirmationPage />,
  },
  {
    path: "/account",
    element: <AccountPage />,
  },
  {
    path: "/orders",
    element: <OrdersPage />,
  },
  {
    path: "/wishlist",
    element: <WishlistPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/categories",
    element: <CategoriesPage />,
  },
  {
    path: "/deals",
    element: <DealsPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
