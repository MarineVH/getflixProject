


import "./navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from 'axios';


interface Movie {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
}

interface Series {
  id: number;
  name: string;
  vote_average: number;
  poster_path: string;
}

function NavScrollExample() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [series, setSeries] = useState<Series[]>([]);
  const [filtered, setFiltered] = useState<(Movie | Series)[]>([]);
  const [search, setSearch] = useState<string>("");
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

const fetchMovies = async () => {
    try {
      const response = await axios.get<{ movies: Movie[] }>("http://localhost:8888/getflixProject/api/get_movies.php");
      const data = response.data;
      if (Array.isArray(data.movies)) {
        setMovies(data.movies);
      } else {
        console.error('Invalid data structure received from the server');
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
};

const fetchSeries = async () => {
    try {
      const response = await axios.get<{ series: Series[] }>("http://localhost:8888/getflixProject/api/get_series.php");
      const data = response.data;
      if (Array.isArray(data.series)) {
        setSeries(data.series);
      } else {
        console.error('Invalid data structure received for series from the server');
      }
    } catch (error) {
      console.error('Error fetching series:', error);
    }
};

useEffect(() => {
    fetchMovies();
    fetchSeries();
  }, []);

  useEffect(() => {
    setFiltered([
      ...movies.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      ),
      ...series.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      ),
    ]);
  }, [search, movies, series]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    setSearch(inputText);
  };

  const renderStars = (rating: number): JSX.Element[] => {
    const roundedRating = Math.round(rating);
    const starCount = Math.floor(roundedRating / 2);

    const fullStars = Array.from({ length: starCount }, (_, index) => (
      <span key={index} className="gold-star">&#9733;</span>
    ));

    return fullStars;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <Navbar expand="lg" className="cl ">
      <Container fluid className="cl p-0 m-0">
        <Navbar.Brand href="">
          <span className="streamify mx-3">Streamify</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" className="rounded-5 mx-3 p-3 border" style={{ backgroundColor: "rgba(83, 187, 144, 0.7)" }} />
        <Navbar.Collapse id="navbarScroll" role='navigation'>
          {/* <Nav*/}
          <Nav className="me-auto my-2 my-lg-0 bg-transparent" style={{ maxHeight: "100px" }} navbarScroll>
            <Nav.Link className="dim mx-3" href="/home" style={{ color: "#53bb90" }}>
              HOME
            </Nav.Link>
            <Nav.Link className="dim mx-3" href="/movies" style={{ color: "#53bb90" }}>
              MOVIES
            </Nav.Link>
            <Nav.Link className="dim mx-3  bg-transparent" href="/series" style={{ color: "#53bb90" }}>
              SERIES
            </Nav.Link>
            <Nav.Link className="dim mx-3 " href="/upcoming" style={{ color: "#53bb90" }}>
              UPCOMING
            </Nav.Link>
          </Nav>
          <div className="container-fluid w-25">
            <form className="d-flex">
              <input
                type="text"
                id="search"
                className="input form-control  me-2  rounded-pill border-1 min"
                placeholder="Search ..."
                onChange={handleInputChange}
                ref={searchRef}
              />
              {search.length > 0 && (
                <button type="button" className="closeSearch "
                  onClick={() => {
                    setSearch("");
                    if (searchRef.current)
                    searchRef.current.value = "";
                  }}
                >
                  <IoClose />
                </button>
              )}
            </form>
            {search.length > 0 && (
              <div className="dropdown">
              {filtered.length > 0 ? (
                filtered.map((item, index) => (
                  <div className="result"
                    key={index}
                    onClick={() => { /* ... */ }}>
                      {("title" in item) ? (
                        <Link key={item.id} to={`/movie/${item.id}`} className='card movie-link'>
                          <img src={`https://image.tmdb.org/t/p/w780${item.poster_path}`} alt={item.title} className='img' />
                          <h5 className='movie-title'>{item.title}</h5>
                          <p className='rating'>Rating: {renderStars(item.vote_average)}</p>  
                        </Link>
                      ) : (
                        <Link key={item.id} to={`/serie/${item.id}`} className='card series-link'>
                          <img src={`https://image.tmdb.org/t/p/w780${item.poster_path}`} alt={item.name} className='img' />
                          <h5 className='series-title'>{item.name}</h5>
                          <p className='rating'>Rating: {renderStars(item.vote_average)}</p>
                        </Link>
                      )}
                  </div>
                ))
              ) : (
                <h3 style={{ textAlign: 'center' }}>No match</h3>
              )}
            </div>
            )}
          </div>
          <div className="d-flex">
            <button className="registration px-3" type="button" onClick={handleLogout}>
              Log Out
            </button>
            <Link className="nav-link" to="/profile">
              <FontAwesomeIcon icon={faUser} className="mx-4" />
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;

