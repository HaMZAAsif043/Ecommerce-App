FoundPage from "../pages/NotFoundPage";

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
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
