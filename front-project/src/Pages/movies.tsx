import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './movies.css';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from '../component/navbar';
import Footer from '../component/footer';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const apiUrl = 'http://localhost:8888/getflixProject/api/get_movies.php';
  

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        //console.log('Response data:', data);
        if (data && data.movies) {
          setMovies(data.movies);
        } else {
          console.error('Invalid data structure received from the server');
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchData();
  }, []);

  const renderStars = (rating: number) => {
    const roundedRating = Math.round(rating); // Arrondir à l'entier le plus proche
    const starCount = Math.floor(roundedRating / 2); // Divise par 2 pour obtenir un maximum de 5 étoiles
  
    const fullStars = Array.from({ length: starCount }, (_, index) => (
      <span key={index} className="gold-star">&#9733;</span>
    ));
    
    return [fullStars];
  };
  
  
  return (
    <>
    <Navbar />
    <body className='bodyMovie'>
      <h1 className='mov titreMovies' style={{ textAlign: 'center', marginTop: '2rem' }}>Movies</h1>
      <Container fluid>
        <Row xs={1} sm={2} md={3} lg={4} xl={5} className='g-4'>
          {movies.map((movie) => (
            <Col key={movie.id}>
              <Link to={`/movie/${movie.id}`} className='card movie-link'>
                <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} className='img' />
                <h5 className='movie-title'>{movie.title}</h5>
                <p className='rating'>Rating: {renderStars(movie.vote_average)}</p>          
              </Link>
            </Col>
          ))}
        </Row>
      </Container>

    </body>
    <Footer />
  </>
  );
}


export default Movies;
