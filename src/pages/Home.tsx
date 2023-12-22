import HeroDealCard from "../layouts/hero/HeroDealCard";
import Slider from "../layouts/hero/Slider";
import {
  FIRST_PRODUCT_SLIDER_DATA,
  HERO_DEAL_CARD_DATA,
  ProdData,
  SALE_SECTION_CARD_DATA,
  SECOND_PRODUCT_SLIDER_DATA,
} from "../constents";
import Footer from "../features/footer/Footer";
import Navbar from "../features/navbar/Navbar";
import ProductSlider from "../layouts/hero/ProductSlider";
import SecondCard from "../layouts/hero/SecondCard";
import SaleSectionCard from "../layouts/hero/SaleSectionCard";
const Home = () => {
  return (
    <>
      <Navbar />
      <div className="w-full max-w-full mx-auto flex-col gap-5 flex min-h-[100vh] pt-14 relative ">
        <Slider />
        <div className="min-h-[400px] hidden lg px-7 pb-10 min-w-full z-[5] lg:grid lg:grid-cols-4 gap-5 justify-center lg:justify-between absolute top-[50vh]">
          {HERO_DEAL_CARD_DATA.map((item) => (
            <HeroDealCard cardData={item} />
          ))}
        </div>
        <div className="lg:mt-24">
          <ProductSlider data={FIRST_PRODUCT_SLIDER_DATA} />
        </div>
        <SaleSectionCard data={SALE_SECTION_CARD_DATA} />
        <div className="w-full">
          <img
            src="https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/a05f4b3d67f2b16c.jpg?q=20"
            className="h-64 hidden lg:block w-full object-cover"
            alt="fdsfsd"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 w-[96%] mx-auto gap-3 overflow-hidden">
          <SecondCard products={ProdData} />
          <div className="col-span-2 h-96 object-center  bg-cover bg-center md:bg-contain align-middle">
            <img src="https://images.bewakoof.com/uploads/grid/app/1x1-1703164584.gif" />
          </div>
          <SecondCard products={ProdData} />
        </div>
        <ProductSlider data={SECOND_PRODUCT_SLIDER_DATA} />
      </div>
      <Footer />
    </>
  );
};

export default Home;
