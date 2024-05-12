import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
import "../css/FilmDetail.css";
import { useNavigate } from "react-router-dom";
import Back from "../renderer/Back";

function FilmDetail() {
  // REACT ROUTER PARAMETER
  const { id } = useParams();
  const { type } = useParams();

  // DIFFERENTIATE DATA BETWEEN TV SHOWS AND MOVIE
  const typeData = type === "tvShows" ? "tvShows" : "movie";

  // INTERFACES FOR MOVIES
  interface movieDataProps {
    poster_path: string;
    id: number;
    title: string;
    adult: boolean;
    overview: string;
    genres: {
      id: number;
      name: string;
    }[];
  }

  interface videoProps {
    id: number;
    results: {
      name: string;
      key: string;
      official: boolean;
      type: string;
      site: string;
    }[];
  }

  interface handleFetchProps {
    method: string;
    headers: {
      accept: string;
      Authorization: string;
    };
  }

  interface castProps {
    id: number;
    cast: {
      id: number;
      character: string;
      gender: number;
      name: string;
      profile_path: string;
    }[];
  }

  // INTERFACES FOR TV SHOWS
  interface tvDataProps {
    id: number;
    in_production: boolean;
    name: string;
    seasons: {
      id: number;
      name: string;
      overview: string;
      poster_path: string;
      season_number: number;
      vote_average: number;
    }[];
    poster_path: string;
    adult: boolean;
    status: string;
    genres: {
      id: number; // genre id
      name: string;
    }[];
    overview: string;
  }

  interface tvVideosProps {
    results: {
      name: string;
      site: string;
      key: string;
      type: string;
      official: boolean;
      id: string;
    }[];
  }

  interface tvCastProps {
    cast: {
      name: string;
      id: number;
      gender: number;
      profile_path: string;
    }[];
  }

  interface tvImagesProps {
    backdrops: {
      file_path: string;
    }[];
  }

  interface tvSeasonProps {
    episodes: {
      episode_number: number;
      name: string;
      overview: string;
      still_path: string;
      vote_average: number;
    }[];
    season_number: number;
  }

  // FOR HANDLEFETCH
  const handleFetch: handleFetchProps | null = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YzRiMzg3MGYyNTc4YmM3MzcxNGQwNjQ2ZjNmMWZmNSIsInN1YiI6IjY2MDU2ZDMwZWNhZWY1MDE3YWIwMmZiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bmRrtceW7SjatLLrlFFngGtA0N6Bw3vxh8kBgs-1u3I",
    },
  };

  // USESTATE TV SHOWS DATA
  const [tvData, setTvData] = useState<tvDataProps | null>(null);
  const [tvVideos, setTvVideos] = useState<tvVideosProps | null>(null);
  const [tvCast, setTvCast] = useState<tvCastProps | null>(null);
  const [tvImages, setTvImages] = useState<tvImagesProps | null>(null);
  const [tvSeason, setTvSeason] = useState<tvSeasonProps[]>([]);

  // FETCH TV SHOWS DATA
  useEffect(() => {
    const fetchAllDataTv = async (): Promise<any> => {
      if (id) {
        try {
          // TV DATA DETAILS
          const responseData = await fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, handleFetch);

          if (!responseData.ok) {
            throw new Error(`TV Data response failed : ${responseData.status}`);
          } else {
            const tvDataFetch = await responseData.json();

            tvDataFetch ? console.log("TV DATA DETAILS : ", tvDataFetch) : console.log("No TV Data Details !!");
            tvDataFetch && setTvData(tvDataFetch);
          }

          // TV VIDEOS
          const responseVideos = await fetch(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`, handleFetch);

          if (!responseVideos.ok) {
            throw new Error(`TV Videos response failed : ${responseData.status}`);
          } else {
            const tvVideosFetch = await responseVideos.json();

            tvVideosFetch ? console.log("TV Videos DETAILS : ", tvVideosFetch) : console.log("No TV Videos Details !!");
            tvVideosFetch && setTvVideos(tvVideosFetch);
          }

          // TV CAST
          const responseCast = await fetch(`https://api.themoviedb.org/3/tv/${id}/credits?language=en-US`, handleFetch);

          if (!responseCast.ok) {
            throw new Error(`TV CAST response failed : ${responseCast.status}`);
          } else {
            const tvCastFetch = await responseCast.json();

            tvCastFetch ? console.log("TV CAST DETAILS : ", tvCastFetch) : console.log("No TV CAST Details !!");
            tvCastFetch && setTvCast(tvCastFetch);
          }

          // TV IMAGES
          const responseImages = await fetch(`https://api.themoviedb.org/3/tv/${id}/images`, handleFetch);

          if (!responseImages.ok) {
            throw new Error(`TV IMAGES response failed : ${responseImages.status}`);
          } else {
            const tvImagesFetch = await responseImages.json();

            tvImagesFetch ? console.log("TV Images DETAILS : ", tvImagesFetch) : console.log("No TV Images Details !!");
            tvImagesFetch && setTvImages(tvImagesFetch);
          }
        } catch (error) {
          console.error("Error fetching data : ", error);
        }
      }
    };

    fetchAllDataTv();
  }, [id]);

  // FOR TV SHOWS SEASON
  const fetchSeason = async (seasonId: number): Promise<void> => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/season/${seasonId}?language=en-US`, handleFetch);

      if (!response.ok) {
        throw new Error(`Response failed : ${response.status}`);
      } else {
        const data = await response.json();

        data ? setTvSeason((prevData) => [...prevData, data]) : "";
      }
    } catch (error) {
      console.error("Error fetching data : ", error);
    }
  };

  useEffect(() => {
    const fetchAllSeasons = async (): Promise<any> => {
      if (!tvData || !tvData.seasons) return;

      try {
        for (const season of tvData.seasons) {
          await fetchSeason(season.season_number);
        }
      } catch (error) {
        console.error("Error fetching seasons:", error);
      }
    };

    fetchAllSeasons();
  }, [id, tvData !== null]);

  useEffect(() => {
    tvSeason.length > 0 ? console.log("TV SEASON : ", tvSeason) : console.log("No tv season");
  }, [tvSeason]);

  // FOR MOVIE DATA DETAILS
  const [movieData, setMovieData] = useState<movieDataProps>();

  useEffect(() => {
    const fetchMovieDetail = async (): Promise<any> => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, handleFetch);

        if (!response.ok) {
          throw new Error(`Response failed with status: ${response.status}`);
        }

        const data = await response.json();

        data ? console.log(data) : console.log("no data");
        setMovieData(data);
      } catch (error) {
        console.error("Failed fetching data: ", error);
      }
    };

    fetchMovieDetail();
  }, [id]);

  useEffect(() => {
    console.log("Updated movie data:", movieData);
  }, [movieData]);

  // FOR VIDEO
  const [video, setVideo] = useState<videoProps | null>(null);

  useEffect(() => {
    const fetchVideo = async (id: number): Promise<any> => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, handleFetch);

        if (!response.ok) {
          throw new Error(`Error fetching data with status: ${response.status}`);
        }

        const data = await response.json();
        data && setVideo(data);
      } catch (error) {
        console.error("Fetch error: ", error);
      }
    };

    if (movieData && movieData.id) {
      fetchVideo(movieData.id);
    }
  }, [movieData]);

  // RETRIEVE DESIREABLE VIDEO KEY
  const [key, setKey] = useState("");

  useEffect(() => {
    console.log("video: ", video);

    const movieOrTv = typeData === "tvShows" ? tvVideos : video;

    const filteredVideo = movieOrTv?.results.find((value: any) => {
      return value.key && value.type === "Trailer" && (value.official == true || value.official == false) && value.site === "YouTube" && value.name.toLowerCase().includes("trailer");
    });

    if (filteredVideo) {
      const videoKey = filteredVideo?.key;
      setKey(videoKey);
    } else {
      console.log("No match keys");
    }
  }, [tvVideos || video]);

  // CAST DETAILS
  const [cast, setCast] = useState<castProps>();

  useEffect(() => {
    const fetchCast = async (): Promise<any> => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, handleFetch);

        if (!response.ok) {
          throw new Error(`Fetch response failed with status: ${response.status}`);
        } else {
          const data = await response.json();

          data ? setCast(data) : console.log("Cast fetch error");
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchCast();
  }, [id]);

  useEffect(() => {
    console.log("Cast: ", cast);
  }, [cast]);

  // USE NAVIGATE FOR CASTS
  const navigate = useNavigate();

  const handleNavigation = (castData: number) => {
    navigate(`/castDetail/${castData}`);
  };

  const toGenreDetail = (id: number): void => {
    navigate(`/genre_detail/${id}`);
  };

  // FOR DIFFERENTIATE DATA
  const genres = typeData === "tvShows" ? tvData?.genres : movieData?.genres;
  const poster: string | undefined = typeData === "tvShows" ? tvData?.poster_path : movieData?.poster_path;
  const synopsis: string | undefined = typeData === "tvShows" ? tvData?.overview : movieData?.overview;
  const videos = typeData === "tvShows" ? tvVideos : video;
  const casts = typeData === "tvShows" ? tvCast : cast;

  // SEASON CLICKED?
  const [activeSeason, setActiveSeason] = useState<number | null>(null);
  const [showSeason, setShowSeason] = useState<boolean>(false);

  const toggleSeason = (seasonNumber: number) => {
    setActiveSeason(seasonNumber === activeSeason ? null : seasonNumber);
  };

  return (
    <>
      <div className="laptops:w-3/4-screen h-auto laptops:my-12 text-lg mx-auto my-14">
        {window.innerWidth >= 1024 && <Back></Back>}

        {/* Hero */}
        <div className="w-full flex laptops:h-70vh">
          <img src={`https://image.tmdb.org/t/p/original${poster}`} alt="" className="w-5/12 min-w-36 h-auto rounded-lg hidden laptops:block" />

          <iframe
            className="h-40vh laptops:h-auto w-full laptops:ml-4 laptops:rounded-lg "
            src={`https://www.youtube.com/embed/${key}`}
            title="YouTube video player"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>

        {/* Details */}
        <div className="flex flex-col laptops:flex-row w-full laptops:justify-between mt-4 mb-10 px-4 laptops:items-center laptops:px-0">
          <h1 className="text-pink-800 laptops:text-3xl text-xl tracking-wide">{typeData === "tvShows" ? tvData?.name : movieData?.title}</h1>

          <div className="flex laptops:items-center laptops:justify-center justify-between mt-4">
            <div className="flex h-fit items-center">
              <h1 className="laptops:text-lg text-base pr-2">Rating: </h1>

              {typeData === "tvShows" ? <h1 className="font-semibold laptops:text-2xl text-xl">{tvData?.adult ? "PG 13+" : "PG"}</h1> : <h1 className="font-semibold laptops:text-2xl text-xl">{movieData?.adult ? "PG 13+" : "PG"}</h1>}
            </div>

            <div className="pl-4 text-end">
              {genres &&
                genres.map((value: any, index) => {
                  const genre = value.name;
                  const id = value.id;

                  return (
                    <button
                      key={index}
                      className="ml-2 py-1 px-2 border rounded-lg hover:bg-slate-50 transition-colors duration-300 ease-in-out text-base mb-1 laptops:text-lg"
                      onClick={() => {
                        toGenreDetail(id);
                      }}
                    >
                      {genre}
                    </button>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Synopsis & other vids*/}
        <div className="w-full laptops:my-14 laptops:flex px-4 mb-10 laptops:px-0">
          {synopsis !== "" && (
            <div className="laptops:w-7/12 mb-10">
              <h1 className="text-pink-800 font-medium laptops:text-3xl text-xl border-l-4 border-black pl-2 mb-2">Synopsis</h1>
              <p className="text-base laptops:text-lg">{synopsis}</p>
            </div>
          )}

          {videos?.results && videos?.results.length > 0 && (
            <div className="laptops:pl-4 laptops:flex laptops:w-5/12 justify-end">
              <div className="min-w-80 max-w-96">
                <h1 className="laptops:text-3xl text-xl text-pink-800 mb-2 border-l-4 border-black pl-2 laptops:border-0">Video</h1>

                <Swiper modules={[Navigation]} spaceBetween={10} slidesPerView={1} navigation={true} className="">
                  {videos?.results.map((value: any, index: number) => {
                    const type = value.type.toLowerCase();
                    const key = value.key;
                    const name = value.name;
                    const site = value.site.toLowerCase();

                    if (key && (type === "featurette" || type === "behind the scenes" || type === "clip" || type === "trailer" || type === "teaser") && site === "youtube") {
                      return (
                        <SwiperSlide key={index} className="rounded-lg w-full">
                          <a href={`https://www.youtube.com/watch?v=${key}`} target="_blank">
                            <img src={`https://img.youtube.com/vi/${key}/maxresdefault.jpg`} alt="" className="rounded-lg w-full" />
                            <p className="pt-2">{name}</p>
                          </a>
                        </SwiperSlide>
                      );
                    }
                  })}
                </Swiper>
              </div>
            </div>
          )}
        </div>

        <hr />

        {/* SEASONS FOR TV SHOWS */}

        {typeData === "tvShows" && (
          <div className="my-10 laptops:px-0">
            {/* Title */}
            <h1 className="text-pink-800 font-medium text-xl laptops:text-3xl border-l-4 border-black pl-2 mb-2 mx-4">Seasons</h1>

            <div className="w-full laptops:w-1/2 text-base laptops:text-lg h-fit">
              <Swiper className="flex mt-6 w-full" modules={[Navigation]} slidesPerView={3} navigation={true} spaceBetween={2}>
                {tvData?.seasons.map((value: any, index: number) => {
                  const seasonNumber = value.season_number;

                  return (
                    <SwiperSlide className="mx-2 season flex items-center">
                      <button
                        key={index}
                        className={`py-1 px-2 border rounded-lg hover:bg-slate-50 transition-colors duration-300 ease-in-out ${activeSeason === seasonNumber && "text-pink-800"}`}
                        onClick={() => {
                          toggleSeason(seasonNumber);
                        }}
                      >
                        Season {seasonNumber}
                      </button>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>

            <div className="mt-8">
              {tvSeason.map((value: any) => {
                const seasonNumber = value.season_number;

                return (
                  <div className="laptops:w-1/2 text-base font-medium w-screen px-4">
                    {activeSeason === seasonNumber
                      ? value.episodes.map((value: any, index: number) => {
                          const backdropImage = value.still_path;
                          const episodeTitle = value.name;
                          const overview = value.overview;
                          const rating = value.vote_average;

                          const parts = overview.split(".");

                          if (backdropImage) {
                            return (
                              <>
                                <div className="laptops:flex w-full mb-4 my-2" key={index}>
                                  <div className="laptops:w-3/12 laptops:mr-4">
                                    <img src={`https://image.tmdb.org/t/p/original${backdropImage}`} alt="" className="w-full object-center object-cover h-auto" />
                                  </div>

                                  <div className="laptops:w-9/12">
                                    <h1 className="font-semibold">{episodeTitle}</h1>

                                    <p>{parts[0]}.</p>

                                    <div className="flex items-center">
                                      <i className="fa-solid fa-star text-yellow-500 text-sm pr-1" style={{ paddingBottom: "2px" }}></i>

                                      <h1>
                                        {rating} <span className="opacity-70">/ 10</span>
                                      </h1>
                                    </div>
                                  </div>
                                </div>

                                <hr />
                              </>
                            );
                          }
                        })
                      : ""}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <hr />

        {/* Cast */}
        <div className="laptops:my-14 my-10 laptops:px-0">
          <h1 className="text-pink-800 font-medium text-xl laptops:text-3xl border-l-4 border-black pl-2 mb-2 mx-4 laptops:mx-0">Cast</h1>

          {casts?.cast && casts?.cast.length > 0 ? (
            <div className="w-full select-none h-35vh">
              <Swiper modules={[Pagination]} spacebetween={30} slidesPerView={window.innerWidth >= 1024 ? 5.5 : window.innerWidth >= 640 ? 3 : 2} pagination={true} className="h-full filmDetail">
                {casts?.cast.slice(0, 13).map((value: any, index: number) => {
                  const profilePict = value.profile_path;
                  const name = value.name;
                  const castId = value.id;

                  if (profilePict) {
                    return (
                      <SwiperSlide key={index} className="flex justify-center items-center h-full w-fit flex-col">
                        <img
                          src={`https://image.tmdb.org/t/p/original${profilePict}`}
                          alt=""
                          className="w-40 h-40 laptops:w-48 laptops:h-48 object-cover object-center rounded-full hover:cursor-pointer hover:scale-105 ease-in-out transition-all duration-300"
                          onClick={() => {
                            handleNavigation(castId);
                          }}
                        />

                        <h1 className="pt-2  hover:cursor-pointer transition-all hover:opacity-70 duration-300 ease-in-out">{name}</h1>
                      </SwiperSlide>
                    );
                  }
                })}
              </Swiper>
            </div>
          ) : (
            <p>No cast available</p>
          )}
        </div>
      </div>
    </>
  );
}

export default FilmDetail;
