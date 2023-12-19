import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './top_rated.css';
import { Link } from 'react-router-dom';
import { useCallback } from 'react';
function TopRatedSeries() {
    const [series, setSeries] = useState([]);
    const scrollContainerRef = useRef(null); // Specifica il tipo di riferimento
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
    return (_jsxs(_Fragment, { children: [_jsx("h1", { className: 'mov  text-center mb-5', style: { color: '#0071b8' }, children: "Top Rated Series" }), _jsx("div", { className: 'd-flex w-75  align-items-center mx-auto', style: { overflowX: 'auto' }, ref: scrollContainerRef, children: series.map((serie) => (_jsx(Link, { to: `/serie/${serie.id}`, children: _jsxs("div", { className: 'd-flex  justify-content-center h-50 container1 ', children: [_jsx("div", { className: 'overlay-1' }), _jsx("img", { className: 'img-top', src: `https://image.tmdb.org/t/p/w500${serie.poster_path}`, alt: serie.name }), _jsx("h2", { className: 'h-top', children: serie.name }), _jsx("p", { className: 'p-top', children: renderStars(serie.rating) })] }) }, serie.id))) })] }));
}
export default TopRatedSeries;
