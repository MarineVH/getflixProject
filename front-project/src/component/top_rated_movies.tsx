

import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './top_rated.css';
import { Link } from 'react-router-dom';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  rating: number;
}

function TopRatedMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const apiUrl = 'http://localhost:8888/getflixProject/api/top_rated_movies.php';
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        if (data && data.top_rated_movies) {
          setMovies(data.top_rated_movies);
        } else {
          console.error('Invalid data structure received from the server');
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft += e.deltaY;
      }
    }

    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (scrollContainerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        scrollContainerRef.current.removeEventListener('wheel', handleWheel);
      }
    }
  }, []);

  const renderStars = (rating: number) => {
    const roundedRating = Math.round(rating);
    const starCount = Math.floor(roundedRating / 2);

    const fullStars = Array.from({ length: starCount }, (_, index) => (
      <span key={index} className="gold-star">&#9733;</span>
    ));
  
    return fullStars;
  };

  return (
    <> 
      <h1 className='mov  text-center mb-5' style={{color:'#0071b8'}}>Top Rated Movies</h1>
      <div className='d-flex w-75  align-items-center mx-auto' style={{ overflowX: 'auto' }} ref={scrollContainerRef}>
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <div className='d-flex  justify-content-center h-50 container1 '>
              <div className='overlay-1'></div>
              <img className='img-top' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <h2 className='h-top'>{movie.title}</h2>
              <p className='p-top'>{renderStars(movie.rating)}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default TopRatedMovies;
