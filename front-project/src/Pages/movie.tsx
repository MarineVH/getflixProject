import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../component/navbar';
import Footer from '../component/footer';
import { Link } from 'react-router-dom';
import "./movie.css"
import Slider from "../component/slider";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

const SingleMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [userRating, setUserRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:8888/getflixProject/api/get_movie_by_id.php?id=${id}`);
        const data = response.data;
        console.log(data.movie);
        setMovie(data.movie);        
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };

    fetchMovie();
  }, [id]);

  const handleRatingChange = async (newRating: number) => {
    try {
      // Send the rating to your PHP endpoint
      await axios.post('http://localhost:8888/getflixProject/api/rating_movie.php', {
        movie_id: id,
        rating: newRating,
      });

      // Update the local state with the new rating
      setUserRating(newRating);
    } catch (error) {
      console.error('Error rating movie:', error);
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

const renderStars = (rating: number) => {
  const starCount = Math.floor(rating / 2);

  const fullStars = Array.from({ length: starCount }, (_, index) => (
    <span key={index} className="gold-star">&#9733;</span>
  ));

  return <div className="stars">{fullStars}</div>;
};
  return (
    <>
      <Navbar />
      <div className="container2">
        <div className="row">
          <div className="col-md-6 d-flex align-items-center">
            <div className="d-flex flex-column">
              <h2 className='mov'>{movie.title}</h2>
              <p>Release Date: <span className='date'>{movie.release_date}</span></p>
              <p>
                Rating: {renderStars(userRating !== null ? userRating : movie.vote_average)}
              </p>
              <p>{movie.overview}</p>
              <Link to={`/movie/trailer/${movie.id}`} className="btn m-2">
                Watch Trailer
              </Link>
              <div>
              <p>Rate this movie: {[1, 2, 3, 4, 5].map((rating) => (
                <span
                  key={rating}
                  className={`star ${userRating !== null && userRating >= rating ? 'selected' : ''}`}
                  onClick={() => handleRatingChange(rating)}
                >
                  &#9733;
                </span>
              ))}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            {movie.poster_path && movie.poster_path !== "" && (
              <img
                src={`http://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{ width: '100%', borderRadius: '10%' }}
              />
            )}
          </div>
        </div>
      </div>
      <Slider />
      <Footer />
    </>

  );
};

export default SingleMovie;
