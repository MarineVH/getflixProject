import  { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './top_rated.css';
import { Link } from 'react-router-dom';
import { useCallback } from 'react';


interface Serie {
  id: number;
  name: string;
  poster_path: string;
  rating: number;
}

function TopRatedSeries() {
  const [series, setSeries] = useState<Serie[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null); // Specifica il tipo di riferimento


  useEffect(() => {
    const apiUrl = 'http://localhost:8888/getflixProject/api/top_rated_series.php';
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        //console.log('Response data:', data);
        if (data && data.top_rated_series) { // Check if data.top_rated_movies exists
          console.log(data.top_rated_series);
          setSeries(data.top_rated_series); // Set data.top_rated_movies as the movies
        } else {
          console.error('Invalid data structure received from the server');
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
    <h1 className='mov  text-center mb-5' style={{color:'#0071b8'}}>Top Rated Series</h1>
    <div className='d-flex w-75  align-items-center mx-auto' style={{ overflowX: 'auto' }} ref={scrollContainerRef}>
      {series.map((serie) => (
        <Link to={`/serie/${serie.id}`} key={serie.id}>
          <div className='d-flex  justify-content-center h-50 container1 '>
            <div className='overlay-1'></div>
            <img className='img-top' src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`} alt={serie.name} />
            <h2 className='h-top'>{serie.name}</h2>
            <p className='p-top'>{renderStars(serie.rating)}</p>
          </div>
        </Link>
      ))}
    </div>
    </>
  );
}

export default TopRatedSeries;