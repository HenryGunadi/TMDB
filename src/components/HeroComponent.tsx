import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import React, { useState, useEffect } from "react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/swiper-bundle.css";
import "../css/heroComponent.css";
import { useNavigate } from "react-router-dom";

function HeroComponent() {
  // Popular Movies
  interface TrendingData {
    results: any[];
  }

  const options: optionType | null = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YzRiMzg3MGYyNTc4YmM3MzcxNGQwNjQ2ZjNmMWZmNSIsInN1YiI6IjY2MDU2ZDMwZWNhZWY1MDE3YWIwMmZiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bmRrtceW7SjatLLrlFFngGtA0N6Bw3vxh8kBgs-1u3I",
    },
  };

  const [trending, setTrending] = useState<TrendingData | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<any> => {
      try {
        const response = await fetch("https://api.themoviedb.org/3/trending/movie/day?language=en-US", options);

        if (!response.ok) {
          throw new Error("Network response failed");
        }

        const data = await response.json();

        setTrending(data);
        console.log("This is trendig data: ", data);
      } catch (err) {
        console.error(`Fetching data error: ${err}`);
      }
    };

    fetchData();
  }, []);

  // UPCOMING MOVIES
  interface optionType {
    method: string;
    headers: {
      accept: string;
      Authorization: string;
    };
  }

  interface upComingType {
    results: {
      id: number; // movieId
      title: string;
      poster_path: string;
      vote_average: number;
    }[];
  }

  const [upcoming, setUpComing] = useState<upComingType | null>(null);

  const options2: optionType | null = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YzRiMzg3MGYyNTc4YmM3MzcxNGQwNjQ2ZjNmMWZmNSIsInN1YiI6IjY2MDU2ZDMwZWNhZWY1MDE3YWIwMmZiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bmRrtceW7SjatLLrlFFngGtA0N6Bw3vxh8kBgs-1u3I",
    },
  };

  useEffect(() => {
    const fetchUpcomingMovies = async (): Promise<any> => {
      try {
        const response = await fetch("https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1", options2);

        if (!response.ok) {
          console.log("Response failed with status: ", response.status);
        }

        const data = await response.json();
        setUpComing(data);

        console.log("UPCOMING MOVIES: ", data);
      } catch (err) {
        console.error("Error fetching data: ", err);
      }
    };

    fetchUpcomingMovies();
  }, []);

  const imgFilePath: string = "https://image.tmdb.org/t/p/original";

  const [i, setI] = useState(0);
  const [a, setA] = useState(1);

  useEffect(() => {
    const timeoutId = setTimeout(changeUpcomingMovies, 5000);
    return () => clearTimeout(timeoutId);
  }, [i, a]);

  function changeUpcomingMovies() {
    let randomNum1: number = Math.floor(Math.random() * 19);
    let randomNum2: number = Math.floor(Math.random() * 19);

    if (randomNum1 === i || randomNum2 === a) {
      randomNum1 = Math.floor(Math.random() * 19);
      randomNum2 = Math.floor(Math.random() * 19);
    } else if (randomNum1 === randomNum2) {
      randomNum1 = Math.floor(Math.random() * 19);
      randomNum2 = Math.floor(Math.random() * 19);
    }

    setI(randomNum1);
    setA(randomNum2);
  }

  // REACT ROUTER
  const navigate = useNavigate();

  const handleNavigation = (type: string, data: number) => {
    navigate(`/filmDetail/${type}/${data}`);
  };

  const [mobile, setMobile] = useState<boolean>(false);

  const isMobile = (window: number): void => {
    window >= 1024 ? setMobile(false) : setMobile(true);
  };

  useEffect(() => {
    isMobile(window.innerWidth);
  }, []);

  return (
    <div className="flex laptops:mb-16 flex-col laptops:flex-row w-full ">
      {/* HERO */}
      <div className="relative laptops:w-8/12 h-fit w-full mb-10 laptops:mb-0">
        <Swiper
          className={`w-full select-none laptops:rounded-md ${mobile ? "hero" : ""}`}
          spaceBetween={0}
          slidesPerView={1}
          onSwiper={(swiper: any) => console.log(swiper)}
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          navigation={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          {trending?.results.map((value: any, index: number) => {
            const imgLink = value.backdrop_path;
            const title = value.title;
            const id = value.id;

            return (
              <SwiperSlide
                key={index}
                className="hover:cursor-pointer h-45vh laptops:h-full"
                onClick={() => {
                  handleNavigation("movie", id);
                }}
              >
                <img src={`https://image.tmdb.org/t/p/original${imgLink}`} alt="" className="w-full h-full object-cover bg-center" style={{ minHeight: "60vh", minWidth: "55vw" }} />

                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-slate-950"></div>

                <h1 className="absolute bottom-0 left-0 right-0 text-white font-medium laptops:font-semibold tracking-widest text-xl laptops:text-3xl mb-6 ml-6 brightness-90 text-center">{title}</h1>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* Recommendations */}
      <div className="laptops:pl-10 laptops:mt-0 mt-14 hidden laptops:block">
        <h1 className="font-medium text-2xl tracking-wide text-pink-800 phones:text-center laptops:text-start">Upcoming Movies</h1>

        <div className="pt-6 upcoming bg-gradient-to-b from-transparent to-gray-100 mt-6 pb-6 pr-6 phones:flex phones:flex-wrap">
          {upcoming?.results ? (
            <>
              <div className="flex items-center pb-6">
                <img
                  src={imgFilePath + upcoming.results[i].poster_path}
                  alt=""
                  className="w-3/12 transition-all ease hover:cursor-pointer"
                  onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                    e.preventDefault();

                    handleNavigation("movie", upcoming.results[i].id);
                  }}
                />

                <div className="pl-4">
                  <h1
                    className="font-medium text-lg block hover:cursor-pointer hover:opacity-70 transition-all"
                    onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                      e.preventDefault();

                      handleNavigation("movie", upcoming.results[i].id);
                    }}
                  >
                    {upcoming.results[i].title}
                  </h1>

                  <h1>
                    rating <span className="font-medium text-lg underline">{upcoming.results[i].vote_average.toFixed(1)}</span>
                  </h1>
                </div>
              </div>

              <div className="flex items-center pb-6">
                <img
                  src={imgFilePath + upcoming.results[a].poster_path}
                  alt=""
                  className="w-3/12 transition-all ease hover:cursor-pointer"
                  onClick={(e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
                    e.preventDefault();

                    handleNavigation("movie", upcoming.results[a].id);
                  }}
                />

                <div className="pl-4">
                  <h1
                    className="font-medium text-lg block hover:cursor-pointer hover:opacity-70 transition-all"
                    onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                      e.preventDefault();

                      handleNavigation("movie", upcoming.results[a].id);
                    }}
                  >
                    {upcoming.results[a].title}
                  </h1>

                  <h1>
                    rating <span className="font-medium text-lg underline">{upcoming.results[a].vote_average.toFixed(1)}</span>
                  </h1>
                </div>
              </div>
            </>
          ) : (
            <div>No content here</div>
          )}

          <a href="" className="hover:underline text-blue-600 mb-6 hover:text-blue-900 transition-all duration-300 ease-in-out">
            See more
          </a>
        </div>
      </div>
    </div>
  );
}

export default HeroComponent;
