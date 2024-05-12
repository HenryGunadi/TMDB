import searchIcon from "../assets/search.svg";
import hamburgerMenu from "../assets/menu.svg";
import closeButton from "../assets/x.svg";
import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../css/index.css";
import "aos/dist/aos.css"; // Import AOS CSS - adjust path if necessary

interface NavbarProps {
  onFocus: () => void;
  onBlur: () => void;
}

function Navbar({ onFocus, onBlur }: NavbarProps) {
  // REACT ROUTER
  const navigate = useNavigate();

  const toSearchDetail = (data: any): void => {
    navigate(`/searchDetail/${data}`);
  };

  const toFilmDetail = (type: string, data: number): void => {
    navigate(`/filmDetail/${type}/${data}`);
  };

  // INTERFACES
  interface searchRecommendProps {
    results: {
      title: string;
      poster_path: string;
      release_date: Date;
      id: number;
    }[];
  }

  interface tvSearchProps {
    results: {
      id: number; // tv shows id
      name: string;
      poster_path: string;
      first_air_date: Date;
    }[];
  }

  // SEARCH MOVIE BY NAME
  const [input, setInput] = useState<string>("");
  const [searchRecommend, setSearchRecommend] = useState<searchRecommendProps>();
  const [displaySearch, setDisplaySearch] = useState<boolean>(false); // to display element

  const searchMovies = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setInput("");
    } else if (event.key === "Enter") {
      toSearchDetail(input);
    }
  };

  // FETCH API SEACRH MOVIE BY NAME
  const handleFetch = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YzRiMzg3MGYyNTc4YmM3MzcxNGQwNjQ2ZjNmMWZmNSIsInN1YiI6IjY2MDU2ZDMwZWNhZWY1MDE3YWIwMmZiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bmRrtceW7SjatLLrlFFngGtA0N6Bw3vxh8kBgs-1u3I",
    },
  };

  useEffect(() => {
    const displayMovieNames = async (): Promise<any> => {
      if (input !== "") {
        try {
          const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${input}&include_adult=false&language=en-US&page=1`, handleFetch);

          if (!response.ok) {
            throw new Error(`Response Failed: ${response.status}`);
          } else {
            const data = await response.json();

            // data ? console.log("Search movie data : ", data) : console.log("No search movie data");
            data && setSearchRecommend(data);
          }
        } catch (error) {
          console.error("Error fetch data : ", error);
        }
      }
    };

    displayMovieNames();
  }, [input]);

  useEffect(() => {
    if (input === "") {
      setDisplaySearch(false);
    } else {
      setDisplaySearch(true);
    }
  }, [input]);

  // DISPLAY SEARCH RECOMMENDATIONS TV SHOWS
  const [tvSearch, setTvSearch] = useState<tvSearchProps>();

  useEffect(() => {
    const displayTvShows = async (): Promise<any> => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/search/tv?query=${input}&include_adult=false&language=en-US&page=1`, handleFetch);

        if (!response.ok) {
          throw new Error(`Response failed with status ${response.status}`);
        } else {
          const data = await response.json();

          data ? console.log("TV SEARCH DATA : ", data) : console.log("NO TV SHOWS RESULTS");
          data && setTvSearch(data);
        }
      } catch (err) {
        console.error("Error fetching data : ", err);
      }
    };

    displayTvShows();
  }, [input]);

  // REACT NAVBAR TOGGLE !!!
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  function hamburgerIcon() {
    return (
      <div className="bg-stone-50 w-1/2-screen absolute top-0 right-0 z-10 overflow-scroll text-base min-h-screen" data-aos="fade-left">
        <div className="w-full  px-2 py-4 ">
          <img src={closeButton} alt="" />
        </div>

        <div className="pr-4 font-normal">
          <ul className="text-start pl-8 ">
            <a href={``}>
              <li className="pb-4 font-semibold tracking-wider hover:opacity-40">Home</li>
            </a>
            <a href={``}>
              <li className="pb-4 font-semibold tracking-wider hover:opacity-40">About</li>
            </a>
            <a href={``}>
              <li className="pb-4 font-semibold tracking-wider hover:opacity-40">Contact</li>
            </a>
          </ul>
        </div>
      </div>
    );
  }

  const navbar = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="w-screen bg-neutral-900 laptops:px-14 py-3 flex justify-between items-center h-14 laptops:h-16 px-4  fixed top-0 z-20 laptops:static" ref={navbar}>
        <h1 className="font-bold laptops:text-2xl tracking-wider text-white text-xl">MOVIELIX</h1>

        <form className="w-1/2 laptops:w-1/3 bg-white rounded-md px-2 flex items-center laptops:ml-4">
          <img src={searchIcon} alt="" className="inline-block w-5" />

          <input type="text" placeholder="Search movies..." className="text-sm px-4 py-2 outline-none w-full" id="search-bar" value={input} onChange={searchMovies} onKeyDown={handleSubmit} onFocus={onFocus} onBlur={onBlur} />
        </form>

        <img src={hamburgerMenu} alt="" className="laptops:hidden" />

        <ul className="laptops:flex text-pink-200 tracking-wider font-semibold text-sm hidden">
          <a href={""}>
            <li className="transition duration-300 hover:border-solid border-gray-400 hover:border-default border-opacity-35 rounded-md p-2 mx-1 cursor-pointer active:transform active:translate-y-0.5" style={{ userSelect: "none" }}>
              Home
            </li>
          </a>

          <a href={``}>
            <li className="transition duration-300 hover:border-solid border-gray-400 hover:border-default border-opacity-35 rounded-md p-2 mx-1 cursor-pointer active:transform active:translate-y-0.5" style={{ userSelect: "none" }}>
              About
            </li>
          </a>

          <a href={``}>
            <li className="transition duration-300 hover:border-solid border-gray-400 hover:border-default border-opacity-35 rounded-md p-2 mx-1 cursor-pointer active:transform active:translate-y-0.5" style={{ userSelect: "none" }}>
              Contact
            </li>
          </a>
        </ul>
      </div>

      <div className={`${displaySearch === false && "hidden"} laptops:w-1/3 mx-auto text-neutral-200 z-20 left-0 right-12 max-h-3/4-screen overflow-y-scroll h-fit fixed laptops:absolute w-screen bg-neutral-900 shadow-sm`}>
        {tvSearch &&
          tvSearch.results.length !== 0 &&
          tvSearch.results.map((value: any, index: number) => {
            const name: string = value.name;
            const tvId: number = value.id;
            const poster: string = value.poster_path;
            const firstAirDate: string = value.first_air_date;
            const year = firstAirDate.split("-");

            return (
              <div
                key={index}
                onClick={() => {
                  toFilmDetail("tvShows", tvId);
                  setDisplaySearch(false);
                  setInput("");
                }}
                className=" p-2 cursor-pointer hover:bg-neutral-500 transition-all duration-300 ease-in-out w-full"
              >
                <div className="flex py-2">
                  <img src={`https://image.tmdb.org/t/p/original${poster}`} alt="" className="w-14" />

                  <div className="pl-2">
                    <h1>{name}</h1>

                    <h1>{year[0]}</h1>
                  </div>
                </div>
              </div>
            );
          })}

        {searchRecommend &&
          searchRecommend.results.length !== 0 &&
          searchRecommend.results.map((value: any, index: number) => {
            const title: string = value.title;
            const movieId: number = value.id;
            const poster: string = value.poster_path;
            const releaseDate: string = value.release_date;
            const year = releaseDate.split("-");

            return (
              <div
                key={index}
                onClick={() => {
                  toFilmDetail("movie", movieId);
                  setDisplaySearch(false);
                  setInput("");
                }}
                className="bg-neutral-900 p-2 cursor-pointer hover:bg-neutral-500 transition-all duration-300 ease-in-out w-full"
              >
                <div className="flex py-2">
                  <img src={`https://image.tmdb.org/t/p/original${poster}`} alt="" className="w-14" />

                  <div className="pl-2">
                    <h1>{title}</h1>

                    <h1>{year[0]}</h1>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Navbar;
