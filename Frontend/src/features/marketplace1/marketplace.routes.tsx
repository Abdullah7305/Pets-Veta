// src/features/marketplace1/routes/marketplace.routes.tsx

import MarketplacePage from "../marketplace1/pages/MarketplacePage";
import MarketplaceCategoryPage from "../marketplace1/pages/MarketplaceCategoryPage";
import MarketplaceProductDetailPage from "../marketplace1/pages/MarketplaceProductDetailPage";

export const marketplaceRoutes = [
  {
    path: "/marketplace1",
    element: <MarketplacePage />,
  },
  {
    path: "/marketplace",
    element: <MarketplacePage />,
  },
  {
    path: "/marketplace1/category/:categorySlug",
    element: <MarketplaceCategoryPage />,
  },
  {
    path: "/marketplace/category/:categorySlug",
    element: <MarketplaceCategoryPage />,
  },
  {
    path: "/marketplace/product/:id",
    element: <MarketplaceProductDetailPage />,
  },
];