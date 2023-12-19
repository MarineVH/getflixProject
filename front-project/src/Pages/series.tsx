import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './series.css';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from '../component/navbar';
import Footer from '../component/footer';

interface Serie {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

function Series() {
  const [series, setSeries] = useState<Serie[]>([]);

  useEffect(() => {
    const apiUrl = 'http://localhost:8888/getflixProject/api/get_series.php';

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        if (data && data.series) {
          setSeries(data.series);
        } else {
          console.error('Invalid data structure received from the server');
        }
      } catch (error) {
        console.error('Error fetching series:', error);
      }
    };

    fetchData();
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
    <Navbar />
    <div className='bodySerie'>
      <h1 className='mov titreSeries' style={{ textAlign: 'center', marginTop: '2rem' }}>Series</h1>
      <Container fluid>
        <Row xs={1} sm={2} md={3} lg={4} xl={5} className='g-4'>
          {series.map((serie) => (
            <Col key={serie.id}>
              <Link to={`/serie/${serie.id}`} className='card serie-link'>
                <img src={`https://image.tmdb.org/t/p/w300${serie.poster_path}`} alt={serie.name} className='img' />
                <h5 className='serie-title'>{serie.name}</h5>
                <p className='rating'>Rating: {renderStars(serie.vote_average)}</p>          
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
    <Footer />
  </>
  );
}

export default Series;