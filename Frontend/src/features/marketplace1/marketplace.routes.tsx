// src/features/marketplace1/routes/marketplace.routes.tsx

import MarketplacePage from "../marketplace1/pages/MarketplacePage";
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
    path: "/marketplace/product/:id",
    element: <MarketplaceProductDetailPage />,
  },
];
