import React, { useState, useEffect } from "react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../css/heroComponent.css";
import { useNavigate } from "react-router-dom";

interface topRatedProps {
  results: {
    id: number;
    title: string;
    poster_path: string;
    name?: string;
    vote_average: number;
  }[];
}

function Section({ data }: { data: topRatedProps | undefined }) {
  if (!data || !data.results) {
    return <p>No data available</p>;
  }

  const [mobile, setMobile] = useState<boolean>(false);

  const isMobile = (windowWidth: number) => {
    windowWidth >= 1024 ? setMobile(false) : setMobile(true);
  };

  useEffect(() => {
    isMobile(window.innerWidth);
  }, []);

  // REACT ROUTER
  const navigate = useNavigate();

  const toFilmDetail = (type: string, data: number) => {
    navigate(`/filmDetail/${type}/${data}`);
  };

  const slides = (): number => {
    const windowWidth = window.innerWidth;

    if (windowWidth >= 1280) {
      return 6.2;
    } else if (windowWidth >= 1024) {
      return 4.2;
    } else if (windowWidth >= 640) {
      return 4.2;
    } else {
      return 3.2;
    }
  };

  return (
    <div className="w-full laptops:mb-20 px-4 mb-10">
      <div
        className="flex w-full items-center mb-2 pl-2 border-l-4 border-l-neutral-800
			"
      >
        <h1 className="text-pink-800 text-base laptops:text-xl font-medium pr-2 tracking-wide">{data.results[0].name ? "POPULAR TV SHOWS" : "TOP RATED"}</h1>
      </div>

      <Swiper modules={[Navigation]} spaceBetween={mobile ? 10 : 20} slidesPerView={slides()} navigation={true} className={`w-full select-none ${mobile ? "section" : ""}`}>
        {data.results.map((value: any, index: number) => {
          if (value.poster_path && (value.title || value.name)) {
            const posterPath: string = value.poster_path;
            const movieId: number = value.id;
            const rating: number = value.vote_average.toFixed(1);

            const title: string = value.title;
            const name: string = value.name;

            return (
              <SwiperSlide
                key={index}
                className="hover:cursor-pointer border border-black rounded-md phones:h-30vh tablets:h-45vh laptops:h-55vh hover:brightness-75 transition-all duration-300 ease-in-out w-full"
                onClick={() => {
                  data.results[0].name ? toFilmDetail("tvShows", movieId) : toFilmDetail("movie", movieId);
                }}
              >
                <img src={`https://image.tmdb.org/t/p/w500${posterPath}`} alt="" className="rounded-t-md h-60% laptops:h-2/3 w-full object-cover object-center" />

                <div className="flex laptops:p-2 p-1 items-center">
                  <i className="fa-solid fa-star text-yellow-500 text-xs pr-1" style={{ paddingBottom: "2px" }}></i>

                  <h1 className="text-xs laptops:text-base">{rating}</h1>
                </div>

                {/* DETAILS */}
                <div className="pb-2">
                  <div className="laptops:h-8 px-1 laptops:p-2 h-2">
                    <h1 className="font-semibold text-xs laptops:text-base">{name ? name : title}</h1>
                  </div>
                </div>
              </SwiperSlide>
            );
          }
        })}
      </Swiper>
    </div>
  );
}

export default Section;
