import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const GenreDetail: React.FC = () => {
  // REACT-ROUTER
  const { id } = useParams();

  const navigate = useNavigate();

  const toFilmDetail = (type: string, id: number): void => {
    navigate(`/FilmDetail/${type}/${id}`);
  };

  // INTERFACES
  interface genreProps {
    results: {
      id: number;
      poster_path: string;
      release_date: Date;
      title: string;
      vote_average: number;
    }[];
  }

  interface handleFetchProps {
    method: string;
    headers: {
      accept: string;
      Authorization: string;
    };
  }

  interface tvgenreProps {
    results: {
      poster_path: string;
      id: number;
      name: string;
      vote_average: string;
    }[];
  }

  const handleFetch: handleFetchProps | null = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YzRiMzg3MGYyNTc4YmM3MzcxNGQwNjQ2ZjNmMWZmNSIsInN1YiI6IjY2MDU2ZDMwZWNhZWY1MDE3YWIwMmZiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bmRrtceW7SjatLLrlFFngGtA0N6Bw3vxh8kBgs-1u3I",
    },
  };

  // FETCH MOVIE GENRES
  const [genre, setGenre] = useState<genreProps>();

  useEffect(() => {
    const fetchGenre = async (): Promise<void> => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&sort_by=popularity.desc&vote_average.gte=7&with_genres=${id}`, handleFetch);

        if (!response.ok) {
          throw new Error(`Response failed : ${response.status}`);
        } else {
          const data = await response.json();

          data ? setGenre(data) : console.log("Error fetching genre details !");
          data && console.log("Movie genre : ", data);
        }
      } catch (err) {
        console.error("Error fetching data : ", err);
      }
    };

    fetchGenre();
  }, [id]);

  // FETCH TV GENRES
  const [tvGenre, setTvGenre] = useState<tvgenreProps>();

  useEffect(() => {
    const fetchTvGenre = async (): Promise<void> => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=true&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}`, handleFetch);

        if (!response.ok) {
          throw new Error(`Response failed : ${response.status}`);
        } else {
          const data = await response.json();

          data ? setTvGenre(data) : console.log("Error fetching tv genres !");
        }
      } catch (err) {
        console.error("Error fetching data : ", err);
      }
    };

    fetchTvGenre();
  }, [id]);

  return (
    <div className="w-screen laptops:w-3/4-screen laptops:mx-auto laptops:my-20 my-10 px-4">
      {/* Movies */}
      {genre && genre.results.length > 0 ? (
        <>
          <div className="flex w-full items-center mb-2 pl-2 border-l-4 border-l-neutral-800">
            <h1 className="text-pink-800 laptops:text-2xl font-medium pr-2 tracking-wider text-xl">Movies</h1>

            <i className="fa-solid fa-chevron-right text-neutral-800"></i>
          </div>

          <div className={`w-full grid grid-flow-row grid-cols-${window.innerWidth >= 1024 ? 6 : 3} gap-2 laptops:gap-6 mb-20`}>
            {genre && genre.results.length > 0
              ? genre.results.slice(0, 12).map((value: any, index: number) => {
                  const poster: string = value.poster_path;
                  const title: string = value.title;
                  const rating: number = value.vote_average.toFixed(1);
                  const id: number = value.id;
                  const releaseDate: Date = value.release_date;

                  return (
                    <div
                      className="h-40vh laptops:h-45vh mb-4 hover:cursor-pointer border border-black rounded-md hover:brightness-75 transition-all duration-300 ease-in-out "
                      key={index}
                      onClick={() => {
                        toFilmDetail("movie", id);
                      }}
                    >
                      <img src={`https://image.tmdb.org/t/p/original${poster}`} alt="" className="w-full laptops:h-70% h-60%" />

                      <div className="flex px-2 py-1 items-center">
                        <i className="fa-solid fa-star text-yellow-500 text-sm pr-1 " style={{ paddingBottom: "2px" }}></i>

                        <h1 className="text-sm laptops:text-lg">{rating}</h1>
                      </div>

                      <h1 className="text-sm laptops:text-lg  px-2 laptops:mb-12 pb-2">{title}</h1>
                    </div>
                  );
                })
              : ""}
          </div>
        </>
      ) : (
        ""
      )}

      {/* TV SHOWS */}
      {tvGenre && tvGenre.results.length > 0 ? (
        <>
          <div className="flex w-full items-center mb-2 pl-2 border-l-4 border-l-neutral-800">
            <h1 className="text-pink-800 laptops:text-2xl font-medium pr-2 tracking-wider text-xl">Tv Shows</h1>

            <i className="fa-solid fa-chevron-right text-neutral-800"></i>
          </div>

          <div className="w-full grid grid-flow-row laptops:grid-cols-6 grid-cols-3 gap-2 laptops:gap-6">
            {tvGenre && tvGenre.results.length > 0
              ? tvGenre.results.slice(0, 12).map((value: any, index: number) => {
                  const poster: string = value.poster_path;
                  const title: string = value.name;
                  const rating: number = value.vote_average.toFixed(1);
                  const id: number = value.id;

                  return (
                    <div
                      className="h-40vh laptops:h-45vh mb-4 hover:cursor-pointer border border-black rounded-md hover:brightness-75 transition-all duration-300 ease-in-out"
                      key={index}
                      onClick={() => {
                        toFilmDetail("tvShows", id);
                      }}
                    >
                      <img src={`https://image.tmdb.org/t/p/original${poster}`} alt="" className="h-60% laptops:h-70% w-full" />

                      <div className="flex px-2 py-1 items-center">
                        <i className="fa-solid fa-star text-yellow-500 text-sm pr-1" style={{ paddingBottom: "2px" }}></i>

                        <h1 className="laptops:text-lg text-sm">{rating}</h1>
                      </div>

                      <h1 className="text-sm laptops:text-lg px-2 laptops:mb-12 pb-2">{title}</h1>
                    </div>
                  );
                })
              : ""}
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default GenreDetail;
