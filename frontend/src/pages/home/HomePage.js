import { ToastContainer } from "react-toastify";
import BrandFeatured from "../../components/brand/BrandFeatured";
import DiscountSection from "../../components/home/DiscountSection";
import HomeCategory from "../../components/home/HomeCategory";
import Slider from "../../components/home/Slider";
import CardProductContainer from "../../components/product/CardProductContainer";
import NavBarLogin from "../../components/utils/NavBarLogin";
import { useQuery } from "react-query";
import { getData } from "../../hooks/useGetData";
import { memo } from "react";

const HomePage = () => {
  const { data: mostSellings, isLoading: sellingsLoading } = useQuery(
    "most-sellings",
    () => {
      return getData("/products?sort=-sold&limit=8");
    },
    {
      notifyOnChangeProps: ["data"],
    }
  );

  const { data: featured, isLoading: featuredLoading } = useQuery(
    "featured",
    () => {
      return getData("/products?sort=-avgRating&limit=8");
    },
    {
      notifyOnChangeProps: ["data"],
    }
  );

  return (
    <div className="font">
      <NavBarLogin></NavBarLogin>
      <Slider />
      <HomeCategory />

      <CardProductContainer
        title="Most Sellings"
        items={mostSellings?.data}
        loading={sellingsLoading}
        // btnTitle="More"
        // btnLink="most-sellings"
        limit={8}
      />

      <DiscountSection></DiscountSection>

      <CardProductContainer
        title="Featured Products"
        items={featured?.data}
        loading={featuredLoading}
        // btnTitle="More"
        // btnLink="/featured-products"
        limit={8}
      />

      <BrandFeatured></BrandFeatured>

      <ToastContainer></ToastContainer>
    </div>
  );
};

export default memo(HomePage);
