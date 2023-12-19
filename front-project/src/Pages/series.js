import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './series.css';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from '../component/navbar';
import Footer from '../component/footer';
function Series() {
    const [series, setSeries] = useState([]);
    useEffect(() => {
        const apiUrl = 'http://localhost:8888/getflixProject/api/get_series.php';
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl);
                const data = response.data;
                if (data && data.series) {
                    setSeries(data.series);
                }
                else {
                    console.error('Invalid data structure received from the server');
                }
            }
            catch (error) {
                console.error('Error fetching series:', error);
            }
        };
        fetchData();
    }, []);
    const renderStars = (rating) => {
        const roundedRating = Math.round(rating);
        const starCount = Math.floor(roundedRating / 2);
        const fullStars = Array.from({ length: starCount }, (_, index) => (_jsx("span", { className: "gold-star", children: "\u2605" }, index)));
        return [fullStars];
    };
    return (_jsxs(_Fragment, { children: [_jsx(Navbar, {}), _jsxs("div", { className: 'bodySerie', children: [_jsx("h1", { className: 'mov titreSeries', style: { textAlign: 'center', marginTop: '2rem' }, children: "Series" }), _jsx(Container, { fluid: true, children: _jsx(Row, { xs: 1, sm: 2, md: 3, lg: 4, xl: 5, className: 'g-4', children: series.map((serie) => (_jsx(Col, { children: _jsxs(Link, { to: `/serie/${serie.id}`, className: 'card serie-link', children: [_jsx("img", { src: `https://image.tmdb.org/t/p/w300${serie.poster_path}`, alt: serie.name, className: 'img' }), _jsx("h5", { className: 'serie-title', children: serie.name }), _jsxs("p", { className: 'rating', children: ["Rating: ", renderStars(serie.vote_average)] })] }) }, serie.id))) }) })] }), _jsx(Footer, {})] }));
}
export default Series;
