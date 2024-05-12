import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const SearchDetail: React.FC = () => {
  // INTERFACES
  interface movieDataProps {
    results: {
      title: string;
      release_date: Date;
      id: number;
      poster_path: string;
    }[];
  }

  // REACT ROUTER
  const { searchData } = useParams();

  const navigate = useNavigate();

  const toFilmDetail = (type: string, data: number) => {
    navigate(`/filmDetail/${type}/${data}`);
  };

  // FETCH API FOR MOVIES
  const handleFetch = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YzRiMzg3MGYyNTc4YmM3MzcxNGQwNjQ2ZjNmMWZmNSIsInN1YiI6IjY2MDU2ZDMwZWNhZWY1MDE3YWIwMmZiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bmRrtceW7SjatLLrlFFngGtA0N6Bw3vxh8kBgs-1u3I",
    },
  };

  const [movieData, setMovieData] = useState<movieDataProps>();

  useEffect(() => {
    const displayMovieNames = async (): Promise<any> => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchData}&include_adult=false&language=en-US&page=1`, handleFetch);

        if (!response.ok) {
          throw new Error(`Response Failed: ${response.status}`);
        } else {
          const data = await response.json();

          data ? console.log("Search movie data : ", data) : console.log("No search movie data");
          data && setMovieData(data);
        }
      } catch (error) {
        console.error("Error fetch data : ", error);
      }
    };

    displayMovieNames();
  }, [searchData]);

  // FETCH API FOR TV SHOWS
  interface tvDataProps {
    results: {
      id: number;
      name: string;
      poster_path: string;
      first_air_date: Date;
    }[];
  }

  const [tvData, setTvData] = useState<tvDataProps | null>(null);

  useEffect(() => {
    const fetchTvDetail = async (): Promise<void> => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/search/tv?query=${searchData}&include_adult=false&language=en-US&page=1`, handleFetch);

        if (!response.ok) {
          throw new Error(`Response failed : ${response.status}`);
        } else {
          const data = await response.json();

          data ? console.log("TV DETAIL : ", data) : console.log("No Tv Detail Data!");
          data && setTvData(data);
        }
      } catch (err) {
        console.error("Error fetching data : ", err);
      }
    };

    fetchTvDetail();
  }, [searchData]);

  return (
    <div className="w-screen my-14">
      <div className="w-8/12 mx-auto">
        <h1 className="border-l-8 border-black pl-2  text-pink-800 font-semibold text-3xl mb-8">"{searchData}"</h1>

        <div className="grid grid-flow-row grid-cols-4 gap-4 px-12">
          {tvData?.results.map((value: any, index: number) => {
            const airDate = value.first_air_date;
            const name = value.name;
            const id = value.id;
            const poster = value.poster_path;

            if (airDate && poster) {
              return (
                <div
                  onClick={() => {
                    toFilmDetail("tvShows", id);
                  }}
                  className="hover:cursor-pointer flex flex-col items-center w-48 hover:translate-y-1 transition-all duration-200 ease-in"
                  key={index}
                >
                  <img src={`https://image.tmdb.org/t/p/original${poster}`} alt="" className="w-full rounded-lg h-auto" />

                  <h1 className="text-center text-lg py-2 px-2">{name}</h1>
                </div>
              );
            }
          })}

          {movieData?.results.map((value: any, index: number) => {
            const poster = value.poster_path;
            const title = value.title;
            const releaseDate = value.release_date;
            const movieId = value.id;

            if (releaseDate && poster) {
              return (
                <div
                  onClick={() => {
                    toFilmDetail("movie", movieId);
                  }}
                  className="hover:cursor-pointer flex flex-col items-center w-48 hover:translate-y-1 transition-all duration-200 ease-in"
                  key={index}
                >
                  <img src={`https://image.tmdb.org/t/p/original${poster}`} alt="" className="w-full rounded-lg h-auto" />

                  <h1 className="text-center text-lg py-2 px-2">{title}</h1>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchDetail;
