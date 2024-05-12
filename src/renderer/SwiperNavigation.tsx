import { useEffect } from "react";
import { Navigation } from "swiper/modules";
import Swiper from "swiper";

interface SwiperOptions {
  spaceBetween?: number;
  slidesPerView?: number;
}

const useSwiperWithNavigation = (selector: string, options?: SwiperOptions) => {
  useEffect(() => {
    Swiper.use([Navigation]);

    const swiper = new Swiper(selector, {
      ...options,
      navigation: {
        nextEl: `${selector} .swiper-button-next`,
        prevEl: `${selector} .swiper-button-prev`,
      },
    });

    return () => {
      swiper.destroy(); // Clean up Swiper instance on unmount
    };
  }, [selector, options]);
};

export default useSwiperWithNavigation;
