import MarketplaceHero from "../components/MarketplaceHero";
import MarketplaceBenefits from "../components/MarketplaceBenefits";
import MarketplaceCategories from "../components/MarketplaceCategories";
import ProductsGrid from "../components/ProductsGrid";
import MarketplaceBanner from "../components/MarketplaceBanner";
import MarketplaceCTA from "../components/MarketplaceCTA";

const MarketplacePage = () => {
    return (
        <>
            <MarketplaceCategories />
            <ProductsGrid />

        </>
    );
};

export default MarketplacePage;