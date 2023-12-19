import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './slider.css';
import { useCallback } from 'react';
function MovieSlider() {
    const [movies, setMovies] = useState([]);
    const scrollContainerRef = useRef(null); // Specifica il tipo di riferimento
    useEffect(() => {
        const apiUrl = 'http://localhost:8888/getflixProject/api/get_movies.php';
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl);
                const data = response.data;
                if (data && data.movies) {
                    setMovies(data.movies);
                }
            }
            catch (error) {
                console.error('Error fetching movies:', error);
            }
        };
        fetchData();
    }, []);
    const handleWheel = useCallback((e) => {
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
        };
    }, [handleWheel]);
    const renderStars = (rating) => {
        const roundedRating = Math.round(rating);
        const starCount = Math.floor(roundedRating / 2);
        const fullStars = Array.from({ length: starCount }, (_, index) => (_jsx("span", { className: "gold-star", children: "\u2605" }, index)));
        return [fullStars];
    };
    return (_jsxs(_Fragment, { children: [_jsx("h1", { className: 'titreMovies mov', style: { textAlign: 'center', marginTop: '2rem', color: '#53bb90', fontSize: '40px', zIndex: 6 }, children: "Movies" }), _jsx("div", { className: 'd-flex  align-items-center mx-auto', style: { overflowX: 'auto' }, ref: scrollContainerRef, children: movies.map((movie) => (_jsx(Link, { to: `/movie/${movie.id}`, children: _jsxs("div", { className: 'card  d-flex justify-content-center h-50 container1', children: [_jsx("img", { src: `https://image.tmdb.org/t/p/w780${movie.poster_path}`, alt: movie.title, className: 'img fadex' }), _jsx("h5", { className: 'movie-title', children: movie.title }), _jsxs("p", { className: 'rating', children: ["Rating: ", renderStars(movie.vote_average)] })] }) }, movie.id))) })] }));
}
export default MovieSlider;
