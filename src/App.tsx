import { Suspense } from "react";
import { useRoutes, BrowserRouter, RouterProvider } from "react-router-dom";
import routes from "tempo-routes";
import router from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import { OrderProvider } from "./context/OrderContext";
import Chatbot from "./components/chatbot/Chatbot";

function App() {
  // // Only use tempo routes when in Tempo environment
  // if (import.meta.env.VITE_TEMPO === "true") {
  //   const route = useRoutes(routes); // No need for extra BrowserRouter
  //   return (
  //     <Suspense fallback={<p>Loading...</p>}>
  //       <AuthProvider>
  //         <ProductProvider>
  //           <CartProvider>
  //             <OrderProvider>
  //               {route}
  //               <Chatbot />
  //             </OrderProvider>
  //           </CartProvider>
  //         </ProductProvider>
  //       </AuthProvider>
  //     </Suspense>
  //   );
  // }

  // Use regular router for normal application
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <OrderProvider>
              <RouterProvider router={router} />
              <Chatbot />
            </OrderProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </Suspense>
  );
}

export default App;
