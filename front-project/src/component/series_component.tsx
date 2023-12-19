import  { useState, useEffect, useRef } from 'react'; 
import axios from 'axios';
import { Link } from 'react-router-dom';
import './slider.css';

interface Serie {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
}

function SeriesSlider() {
    const [series, setSeries] = useState<Serie[]>([]);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null); // Specifica il tipo di riferimento

    useEffect(() => {
      const apiUrl = 'http://localhost:8888/getflixProject/api/get_series.php';
    
      const fetchData = async () => {
        try {
          const response = await axios.get(apiUrl);
          const data = response.data;
  
          if (data && data.series) {
            setSeries(data.series);
          }
        } catch (error) {
          console.error('Error fetching series:', error);
        }
      };
  
      fetchData();
    }, []);

    useEffect(() => {
      const handleWheel = (e: WheelEvent) => { // Specifica il tipo di evento
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollLeft += e.deltaY;
        }
      }

      if (scrollContainerRef.current) {
        scrollContainerRef.current.addEventListener('wheel', handleWheel);
      }

      return () => {
        if (scrollContainerRef.current) {
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

      return [fullStars];
    };

    return (
      <>
        <h1 className='titreSeries mov' style={{ textAlign: 'center', marginTop: '2rem', color:'#0071b8', fontSize:'40px', zIndex:6 }}>Series</h1>
        <div className='d-flex align-items-center mx-auto ' style={{ overflowX: 'auto' }} ref={scrollContainerRef}>
          {series.map((serie) => (
            <Link to={`/serie/${serie.id}`} key={serie.id}>
              <div className='card d-flex justify-content-center h-50 container1'>
                <img src={`https://image.tmdb.org/t/p/w780${serie.poster_path}`} alt={serie.name} className='img fadex' />
                <h5 className='movie-title'>{serie.name}</h5>
                <p className='rating'>Rating: {renderStars(serie.vote_average)}</p>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
}

export default SeriesSlider;