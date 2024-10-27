import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/product" replace />, 
  },
  {
    path: "product",
    element: <ProductList />, 
  },
  {
    path: "product/:id",
    element: <ProductDetail />, 
  },
]);
ReactDOM.createRoot(document.getElementById("root") as any).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
);