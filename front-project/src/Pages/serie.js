import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../component/navbar';
import Footer from '../component/footer';
import "./serie.css";
import SeriesSlider from '../component/series_component';
const SingleSerie = () => {
    const { id } = useParams();
    const [serie, setSerie] = useState(null);
    useEffect(() => {
        const fetchSerie = async () => {
            try {
                const response = await axios.get(`http://localhost:8888/getflixProject/api/get_serie_by_id.php?id=${id}`);
                const data = response.data;
                console.log(data.serie);
                setSerie(data.serie);
            }
            catch (error) {
                console.error('Error fetching movie:', error);
            }
        };
        fetchSerie();
    }, [id]);
    if (!serie) {
        return _jsx("div", { children: "Loading..." });
    }
    const renderStars = (rating) => {
        const starCount = Math.floor(rating / 2);
        const fullStars = Array.from({ length: starCount }, (_, index) => (_jsx("span", { className: "gold-star", children: "\u2605" }, index)));
        return _jsx("div", { className: "stars", children: fullStars });
    };
    return (_jsxs(_Fragment, { children: [_jsx(Navbar, {}), _jsx("div", { className: "container2", children: _jsxs("div", { className: "row", children: [_jsx("div", { className: "col-md-6 d-flex align-items-center", children: _jsxs("div", { className: "d-flex flex-column", children: [_jsx("h2", { className: 'mov', children: serie.name }), _jsxs("p", { children: ["Release Date: ", _jsx("span", { className: 'date', children: serie.first_air_date })] }), _jsxs("p", { children: ["Rating: ", renderStars(serie.vote_average)] }), _jsx("p", { children: serie.overview }), _jsx("button", { className: "btn m-2", children: "Watch Trailer" })] }) }), _jsx("div", { className: "col-md-6", children: serie.poster_path && serie.poster_path !== "" && (_jsx("img", { src: `http://image.tmdb.org/t/p/w780${serie.poster_path}`, alt: serie.name, style: { width: '100%', borderRadius: '10%' } })) })] }) }), _jsx(SeriesSlider, {}), _jsx(Footer, {})] }));
};
export default SingleSerie;
