import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

function Jumbotron() {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);

  // [FIXME]: Hack, a fare con CSS
  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsMobile(window.innerWidth <= 500);
    });

    const apiUrl = "http://localhost:8888/getflixProject/api/get_movies.php";

    // [NOTE]: Loading, Error, Success states 
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        console.log("Response data:", data);

        if (data && data.movies && data.movies.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.movies.length);
          setMovie(data.movies[randomIndex]); // Imposta un film casuale
          console.log(
            `Image URL: https://image.tmdb.org/t/p/w780${data.movies[randomIndex].poster_path}`
          );
        } else {
          console.error("Invalid data structure received from the server");
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchData();
  }, []);

  const renderStars = (rating: number) => {
    const roundedRating = Math.round(rating);
    const starCount = Math.floor(roundedRating / 2);

    return Array.from({ length: starCount }, (_, index) => (
      <span key={index} className="gold-star">
        &#9733;
      </span>
    ));
  };
  return (
    <div 
      className="jumbotron d-flex align-items-center "
      style={{ height: "100vh", position: "relative",  top:'15px',  }}
    >
      <div className="col-10 video-container d-flex justify-content-center">
        {movie && (
          <>
            <div className="row " style={{ position: "absolute", zIndex: 5 }}>
              <h2
                className="mt-3 "
                style={{
                  color: " #53bb90",
                  fontSize: "40px",
                  fontWeight: 600,
                }}
              >
                {movie.title}
              </h2>

              <p
                style={{
                  color: "#0071b8",
                  fontSize: "20px",
                }}
                className="mt-3"
              >
                Release Date: {movie.release_date}
              </p>
              <p style={{ color: "#0071b8", fontSize: "20px" }}>
                Vote Average:{renderStars(movie.vote_average)} <br />
                <Link
                  to={`/movie/${movie.id}`}
                  className="btn btn-primary  mt-2 "
                  style={{
                    width: "200px",
                  }}
                >
                  Play Now
                </Link>
              </p>
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "150%",
                background:
                  "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,9) 35%, rgba(216,216,216,0) 100%)",
                zIndex: 4,
              }}
            ></div>
            {!isMobile && (

              // [FIXME]:
              //  Create Image comopoent
              //  No inline styles customize bootsrap
          
              <img
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "95%",
                  objectFit: "cover",
                  filter: "blur(20px)",
                  zIndex: 1,
                }}
                src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                alt={movie.title}
             />
            )}
             <img
              className="mb-3"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 2,
              }}
              src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
              alt={movie.title}
            /> *
          </>
        )}
      </div>
    </div>
  );
}

export default Jumbotron;
