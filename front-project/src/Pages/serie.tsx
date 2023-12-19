import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../component/navbar';
import Footer from '../component/footer';
import "./serie.css"
import SeriesSlider from '../component/series_component';

interface Serie {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
}

const SingleSerie = () => {
  const { id } = useParams();
  const [serie, setSerie] = useState<Serie | null>(null);

  useEffect(() => {
    const fetchSerie= async () => {
      try {
        const response = await axios.get(`http://localhost:8888/getflixProject/api/get_serie_by_id.php?id=${id}`);
        const data = response.data;
        console.log(data.serie);
        setSerie(data.serie);        
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };

    fetchSerie();
  }, [id]);

  if (!serie) {
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
              <h2 className='mov'>{serie.name}</h2>
              <p>Release Date: <span className='date'>{serie.first_air_date}</span></p>
              <p>
                Rating: {renderStars(serie.vote_average)}
              </p>
              <p>{serie.overview}</p>
              <button className="btn m-2">Watch Trailer</button>
            </div>
          </div>
          <div className="col-md-6">
          {serie.poster_path && serie.poster_path !== "" && (
            <img
              src={`http://image.tmdb.org/t/p/w780${serie.poster_path}`}
              alt={serie.name}
              style={{ width: '100%', borderRadius: '10%' }}
            />
          )}
          </div>
        </div>
      </div>
      <SeriesSlider />
      <Footer />
    </>

  );
};

export default SingleSerie;
