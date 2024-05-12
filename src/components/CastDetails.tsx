import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

function CastDetail() {
  // REACT ROUTER
  const { castData } = useParams<any>();

  const navigate = useNavigate();

  const toFilmDetail = (type: string, data: any) => {
    navigate(`/filmDetail/${type}/${data}`);
  };

  // INTERFACES
  interface handleFetchProps {
    method: string;
    headers: {
      accept: string;
      Authorization: string;
    };
  }

  interface castDetailProps {
    gender: number;
    id: number;
    name: string;
    known_for_department: string;
    place_of_birth: string;
    profile_path: string;
    popularity: number;
    deathday: boolean;
    birthday: Date;
    biography: string;
  }

  interface castImageProps {
    id: number;
    profiles: {
      file_path: string;
    }[];
  }

  interface creditProps {
    cast: {
      id: number;
      title: string;
      genre_ids: [];
      poster_path: string;
      media_type: string;
      release_date: Date;
      name?: string;
      first_air_date?: Date;
    }[];
  }

  // FOR HANDLE FETCH
  const handleFetch: handleFetchProps | null = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YzRiMzg3MGYyNTc4YmM3MzcxNGQwNjQ2ZjNmMWZmNSIsInN1YiI6IjY2MDU2ZDMwZWNhZWY1MDE3YWIwMmZiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bmRrtceW7SjatLLrlFFngGtA0N6Bw3vxh8kBgs-1u3I",
    },
  };

  // CAST DETAILS
  const [castDetail, setCastDetail] = useState<castDetailProps>();

  useEffect(() => {
    const fetchCast = async (): Promise<any> => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/person/${castData}?language=en-US`, handleFetch);

        if (!response.ok) {
          throw new Error(`Response failed with status: ${response.status}`);
        } else {
          const data = await response.json();

          data && setCastDetail(data);
        }
      } catch (error) {
        console.error("Fetch error: ", error);
      }
    };

    fetchCast();
  }, [castData]);

  // CAST IMAGES
  const [castImages, setCastImages] = useState<castImageProps>();

  useEffect(() => {
    const fetchCast = async (): Promise<any> => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/person/${castData}/images`, handleFetch);

        if (!response.ok) {
          throw new Error(`Response failed with status: ${response.status}`);
        } else {
          const data = await response.json();

          data && setCastImages(data);
        }
      } catch (error) {
        console.error("Fetch error: ", error);
      }
    };

    fetchCast();
  }, [castData]);

  // CAST COMBINED CREDITS
  const [credit, setCredit] = useState<creditProps>();

  useEffect(() => {
    const fetchCast = async (): Promise<any> => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/person/${castData}/combined_credits?language=en-US`, handleFetch);

        if (!response.ok) {
          throw new Error(`Response failed with status: ${response.status}`);
        } else {
          const data = await response.json();

          data && setCredit(data);
        }
      } catch (error) {
        console.error("Fetch error: ", error);
      }
    };

    fetchCast();
  }, [castData]);

  useEffect(() => {
    castDetail ? console.log("CAST DETAIL: ", castDetail) : console.log("No cast detail");
    castImages ? console.log("CAST IMAGES: ", castImages) : console.log("No cast images");
    credit ? console.log("CAST CREDITS: ", credit) : console.log("No cast credits");
  }, [castDetail, castImages, credit]);

  // SHOW BIO
  const [isBioVisible, setIsBioVisible] = useState(false);

  const toggleBio = () => {
    setIsBioVisible((prevVisible) => !prevVisible);
  };

  const [mobile, setMobile] = useState<boolean>(false);

  const isMobile = (windowWidth: number) => {
    windowWidth >= 1024 ? setMobile(false) : setMobile(true);
  };

  useEffect(() => {
    isMobile(window.innerWidth);
  }, []);

  return (
    <div className="w-screen my-14">
      <div className="laptops:w-8/12 h-auto mx-auto">
        {/* PROFILE PICTURE */}
        <div className="w-full flex items-center mb-4 laptops:mb-14 background bg-gradient-to-b from-pink-800  to-slate-white laptops:py-12 laptops:px-12 laptops:rounded-lg ">
          <div className="w-fit hidden laptops:block">
            <img src={`https://image.tmdb.org/t/p/original${castDetail?.profile_path}`} alt="" className="w-80 h-80 object-cover object-center rounded-full" />

            <h1 className="text-2xl laptops:text-3xl font-semibold tracking-wide mb-2 mt-2 text-center text-gray-900">{castDetail?.name}</h1>
          </div>

          <Swiper className="laptops:w-7/12 flex justify-center select-none h-fit" modules={[Navigation]} slidesPerView={1} navigation={true} spaceBetween={0}>
            {castImages?.profiles.map((value: any, index: number) => {
              const castImage = value.file_path;

              if (castImage) {
                return (
                  <SwiperSlide key={index} className="flex justify-end items-center h-fit w-fit rounded-lg">
                    <img src={`https://image.tmdb.org/t/p/original${castImage}`} alt="" className="w-full h-1/2-screen object-cover object-center laptops:rounded-lg " />

                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-slate-950"></div>
                  </SwiperSlide>
                );
              }
            })}
          </Swiper>
        </div>

        <h1 className=" text-neutral-800 font-medium laptops:font-semibold tracking-widest text-xl laptops:text-3xl mb-10 brightness-90 text-center laptops:hidden">{castDetail?.name}</h1>

        {/* BIOGRAPHY */}
        <div className="w-full px-2 laptops:px-0">
          <div className="flex items-center">
            <h1 className="text-pink-800 laptops:text-2xl text-xl font-medium tracking-wide pl-2 border-l-4 border-black mb-2">Biography</h1>

            <i className={`fa-solid ${isBioVisible ? "fa-chevron-up" : "fa-chevron-down"} pl-4 pb-1 hover:cursor-pointer transition-all duration-300 hover:text-pink-800 laptops:text-xl ease-in-out`} id="toggle" onClick={toggleBio}></i>
          </div>

          <p id="castBio" className={`${isBioVisible === false && "hidden"} leading-loose laptops:text-lg text-base`}>
            {castDetail?.biography}
          </p>
        </div>

        {/* MOVIES */}
        <h1 className="text-pink-800 laptops:text-2xl text-xl font-medium tracking-wide pl-2 border-l-4 border-black mb-2 w-full mt-10 mx-2 laptops:mx-0">Works</h1>

        <div className="grid grid-flow-row grid-cols-3 laptops:grid-cols-4 mt-6 w-full mx-auto h-screen overflow-y-scroll laptops:gap-8 gap-4 px-2 laptops:px-0">
          {credit?.cast.map((value: any, index: number) => {
            const poster = value.poster_path;
            const type = value.media_type.toLowerCase();
            const id = value.id;
            const releaseDate = value.release_date;
            const airDate = value.first_air_date;
            const title = mobile ? value.title?.split(" ").slice(0, 2).join(" ") : value.title;
            const name = mobile ? value.name?.split(" ").slice(0, 2).join(" ") : value.name;

            if (poster && (releaseDate || airDate)) {
              return (
                <div
                  key={index}
                  className="hover:cursor-pointer flex flex-col items-center hover:translate-y-1 transition-all duration-200 ease-in"
                  onClick={() => {
                    toFilmDetail(`${type === "tv" ? "tvShows" : "movie"}`, id);
                  }}
                >
                  <img src={`https://image.tmdb.org/t/p/original${poster}`} alt="" className="w-full rounded-lg" />

                  <h1 className="text-center text-lg py-2 px-2">
                    {type === "tv" ? name : title}
                    {mobile && ".."}
                  </h1>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default CastDetail;
