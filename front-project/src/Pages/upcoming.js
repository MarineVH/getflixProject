import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './upcoming.css';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from '../component/navbar';
import Footer from '../component/footer';
function Upcoming() {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        const apiUrl = 'http://localhost:8888/getflixProject/api/upcoming.php';
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl);
                const data = response.data;
                console.log('Response data:', data);
                if (data && data.upcoming) {
                    setMovies(data.upcoming);
                }
                else {
                    console.error('Invalid data structure received from the server');
                }
            }
            catch (error) {
                console.error('Error fetching movies:', error);
            }
        };
        fetchData();
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(Navbar, {}), _jsxs("body", { className: 'bodyMovie', children: [_jsx("h1", { className: 'mov titreMovies', style: { textAlign: 'center', marginTop: '2rem' }, children: "Upcoming" }), _jsx(Container, { fluid: true, children: _jsx(Row, { xs: 1, sm: 2, md: 3, lg: 4, xl: 5, className: 'g-4', children: movies.map((movie) => (_jsx(Col, { children: _jsxs(Link, { to: `/movie/${movie.id}`, className: 'card movie-link', children: [_jsx("img", { src: `https://image.tmdb.org/t/p/w300${movie.poster_path}`, alt: movie.title, className: 'img' }), _jsx("h5", { className: 'movie-title', children: movie.title })] }) }, movie.id))) }) })] }), _jsx(Footer, {})] }));
}
export default Upcoming;
