import { Autoplay, Navigation, Pagination, Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { SliderData } from "../../constents";
const Slider = () => {
  return (
    <div className="max-h-[700px] carousel relative">
    <Swiper
      className="max-h-[700px] w-full"
      modules={[Navigation, Pagination, Autoplay, Virtual]}
      spaceBetween={0}
      slidesPerView={1}
      effect="fade"
      autoplay={{
        delay: 1500,
        disableOnInteraction: false,
      }}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      {SliderData.map((slide,i) => (
        <SwiperSlide key={i} className="h-full cursor-pointer">
          <img
            className="mx-auto h-full w-full lg:object-contain"
            src={slide.mob} 
            srcSet={`${slide.mob} 360w, ${slide.mob} 768w, ${slide.img} 1200w`} 
            sizes="(max-width: 767px) 360px, (max-width: 1023px) 768px, 1200px" 
            alt={slide.alt}
          />
        </SwiperSlide>
      ))}
    </Swiper>
    </div>
  );
};

export default Slider;
