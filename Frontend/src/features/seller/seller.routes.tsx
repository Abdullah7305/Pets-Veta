// src/features/seller/routes/seller.routes.tsx

import SellerDashboardPage from "../seller/pages/SellerDashboardPage";
import SellerProductsPage from "../seller/pages/SellerProductsPage";
import SellerProductFormPage from "../seller/pages/SellerProductFormPage";
import SellerOrdersStockPage from "../seller/pages/SellerOrdersStockPage";
import SellerSavedListingsPage from "../seller/pages/SellerSavedListingsPage";
export const sellerRoutes = [
  {
    path: "/seller/dashboard",
    element: <SellerDashboardPage />,
  },
  {
    path: "/seller/listings",
    element: <SellerProductsPage />,
  },

   {
    path: "/seller/add-product",
    element: <SellerProductFormPage />,
  },
  {
    path: "/seller/edit-product/:id",
    element: <SellerProductFormPage />,
  },

   {
    path: "/seller/orders",
    element: <SellerOrdersStockPage />,
  },
  {
    path: "/seller/stock",
    element: <SellerOrdersStockPage />,
  },
  {
    path: "/seller/saved-listings",
    element: <SellerSavedListingsPage />,
  },
];
