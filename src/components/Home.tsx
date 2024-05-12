import HeroComponent from "./HeroComponent";
import AboutUs from "./AboutUs";
import Section from "./Section";
import { useState, useEffect } from "react";

function Home() {
  // INTERFACES
  interface topRatedType {
    results: {
      title: string;
      poster_path: string;
      id: number;
      vote_average: number;
    }[];
  }

  interface optionType {
    method: string;
    headers: {
      accept: string;
      Authorization: string;
    };
  }

  interface popularTvProps {
    results: {
      id: number; // movieId
      name: string;
      poster_path: string;
    }[];
  }

  // HANDLE FETCH
  const option: optionType | null = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YzRiMzg3MGYyNTc4YmM3MzcxNGQwNjQ2ZjNmMWZmNSIsInN1YiI6IjY2MDU2ZDMwZWNhZWY1MDE3YWIwMmZiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bmRrtceW7SjatLLrlFFngGtA0N6Bw3vxh8kBgs-1u3I",
    },
  };

  // TOP RATED
  const [topRated, setTopRated] = useState<topRatedType | undefined>();

  useEffect(() => {
    const fetchData = async (): Promise<any> => {
      try {
        const response = await fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", option);

        if (!response.ok) {
          console.log(`Response failed with status : ${response.status}`);
        }

        const data = await response.json();

        if (data.results) {
          setTopRated(data); // Set topRated state with the entire data object
          data && console.log("TOP RATED: ", data);
        } else {
          console.error("Invalid data format: data.results is undefined");
        }
      } catch (err) {
        console.error("Error fetching data: ", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    topRated ? console.log("This is the data:", topRated) : console.log("No data");
    console.log(typeof topRated);
  }, [topRated]);

  // POPULAR TV SHOWS
  const [popularTv, setPopularTv] = useState();

  useEffect(() => {
    const fetchPopularTv = async (): Promise<any> => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1`, option);

        if (!response.ok) {
          throw new Error(`Response failed : ${response.status}`);
        } else {
          const data = await response.json();

          data ? console.log("Popular TV : ", data) : console.log("No Popular TV");
          data && setPopularTv(data);
        }
      } catch (error) {
        console.error("Error fetch data: ", error);
      }
    };

    fetchPopularTv();
  }, []);

  return (
    <>
      <div className="laptops:my-16 w-screen laptops:w-3/4-screen laptops:mx-auto my-14 backgroundComponent">
        <HeroComponent />
        {/* <AboutUs /> */}
        {topRated && <Section data={topRated} />}
        {popularTv && <Section data={popularTv} />}
      </div>
    </>
  );
}

export default Home;
