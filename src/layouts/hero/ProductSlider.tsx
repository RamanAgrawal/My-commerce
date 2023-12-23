import { FC } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
// interface sliderProduct {
//   heading: string;
//   img: string;
//   discount: string;
//   alt: string;
//   path: string;
// }

interface SlideData {
  path: string;
  heading: string;
  img: string;
  discount: string;
  //   alt: string;
  //   path: string;
}

// Define the interface for the entire data structure
interface ProductSliderData {
  heading: string;
  slideData: SlideData[];
}

interface ProductSliderProps {
  data: ProductSliderData;
}

const ProductSlider: FC<ProductSliderProps> = ({ data }) => {
  const navigate = useNavigate(); // for navigation

  return (
    <section className="h-[400px] p-2 w-[96%] mx-auto bg-white overflow-hidden">
      <h1 className="text-2xl mb-2 text-black font-bold font-serif text-center uppercase">
        {data.heading}
      </h1>
      <Swiper
        className="max-h-[700px] w-full"
        modules={[Navigation, Autoplay]}
        spaceBetween={2}
        slidesPerView={6}
        effect="fade"
        loop={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        breakpoints={{
          // when window width is >= 920px
          320: {
            slidesPerView: 1,
          },
          752: {
            slidesPerView: 2,
          },
          920: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 6,
          },
        }}
      >
        {data.slideData.map((item, i) => (
          <SwiperSlide
            key={i}
            onClick={() => navigate(`${item.path}`)}
            className="h-full w-full lg:w-1/5 cursor-pointer border-2 "
          >
            <div className="h-full bg-white p-4 shadow-md hover:scale-105 transition-all overflow-hidden">
              <h1 className="tracking-wider font-bold text-xl text-black">
                {item.heading}
              </h1>
              <img
                src={item.img}
                height={500}
                width="full"
                className="h-52 m-auto category-img object-fill"
                // alt={item.alt}
              />
              <div className="my-5 text-center">
                <span className="text-red-700 font-bold p-2">Best Deal</span>
                <p className="bg-red-700 mx-auto font-bold rounded-md p-1 px-2 w-fit text-white">
                  Up to {item.discount}% off
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ProductSlider;
