import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './slider.css';
function SeriesSlider() {
    const [series, setSeries] = useState([]);
    const scrollContainerRef = useRef(null); // Specifica il tipo di riferimento
    useEffect(() => {
        const apiUrl = 'http://localhost:8888/getflixProject/api/get_series.php';
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl);
                const data = response.data;
                if (data && data.series) {
                    setSeries(data.series);
                }
            }
            catch (error) {
                console.error('Error fetching series:', error);
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        const handleWheel = (e) => {
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollLeft += e.deltaY;
            }
        };
        if (scrollContainerRef.current) {
            scrollContainerRef.current.addEventListener('wheel', handleWheel);
        }
        return () => {
            if (scrollContainerRef.current) {
                scrollContainerRef.current.removeEventListener('wheel', handleWheel);
            }
        };
    }, []);
    const renderStars = (rating) => {
        const roundedRating = Math.round(rating);
        const starCount = Math.floor(roundedRating / 2);
        const fullStars = Array.from({ length: starCount }, (_, index) => (_jsx("span", { className: "gold-star", children: "\u2605" }, index)));
        return [fullStars];
    };
    return (_jsxs(_Fragment, { children: [_jsx("h1", { className: 'titreSeries mov', style: { textAlign: 'center', marginTop: '2rem', color: '#0071b8', fontSize: '40px', zIndex: 6 }, children: "Series" }), _jsx("div", { className: 'd-flex align-items-center mx-auto ', style: { overflowX: 'auto' }, ref: scrollContainerRef, children: series.map((serie) => (_jsx(Link, { to: `/serie/${serie.id}`, children: _jsxs("div", { className: 'card d-flex justify-content-center h-50 container1', children: [_jsx("img", { src: `https://image.tmdb.org/t/p/w780${serie.poster_path}`, alt: serie.name, className: 'img fadex' }), _jsx("h5", { className: 'movie-title', children: serie.name }), _jsxs("p", { className: 'rating', children: ["Rating: ", renderStars(serie.vote_average)] })] }) }, serie.id))) })] }));
}
export default SeriesSlider;
