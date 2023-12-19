import  { useState, useEffect, useRef } from 'react'; 
import axios from 'axios';
import { Link } from 'react-router-dom';
import './slider.css';
import { useCallback } from 'react';


interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

function MovieSlider() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null); // Specifica il tipo di riferimento


    useEffect(() => {
      const apiUrl = 'http://localhost:8888/getflixProject/api/get_movies.php';
    
      const fetchData = async () => {
        try {
          const response = await axios.get(apiUrl);
          const data = response.data;
  
          if (data && data.movies) {
            setMovies(data.movies);
          }
        } catch (error) {
          console.error('Error fetching movies:', error);
        }
      };
  
      fetchData();
    }, []);

   
   
    
    const handleWheel = useCallback((e: WheelEvent) => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft += e.deltaY;
      }
    }, []);
    
    useEffect(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.addEventListener('wheel', handleWheel);
      }
    
      return () => {
        if (scrollContainerRef.current) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          scrollContainerRef.current.removeEventListener('wheel', handleWheel);
        }
      }
    }, [handleWheel]);
    const renderStars = (rating: number) => {
      const roundedRating = Math.round(rating);
      const starCount = Math.floor(roundedRating / 2);
    
      const fullStars = Array.from({ length: starCount }, (_, index) => (
        <span key={index} className="gold-star">&#9733;</span>
      ));
      
      return [fullStars];
    };

    return (
      <>
        <h1 className='titreMovies mov' style={{ textAlign: 'center', marginTop: '2rem', color:'#53bb90', fontSize:'40px', zIndex:6 }}>Movies</h1>
        <div className='d-flex  align-items-center mx-auto' style={{ overflowX: 'auto' }} ref={scrollContainerRef}>
          {movies.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id}>
              <div className='card  d-flex justify-content-center h-50 container1'>
                <img src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`} alt={movie.title} className='img fadex' />
                <h5 className='movie-title'>{movie.title}</h5>
                <p className='rating'>Rating: {renderStars(movie.vote_average)}</p>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
}
export default MovieSlider;