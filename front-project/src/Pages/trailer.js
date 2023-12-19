import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../component/navbar';
import Footer from '../component/footer';
import "./movie.css";
const TrailerPage = () => {
    const { id } = useParams();
    const [trailer, setTrailer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchTrailer = async () => {
            try {
                const response = await axios.get(`http://localhost:8888/getflixProject/api/trailer.php?id=${id}`);
                const data = response.data;
                console.log(data);
                setTrailer(data);
            }
            catch (error) {
                console.error('Error fetching trailer:', error);
                setError('Error fetching trailer. Please try again later.');
            }
            finally {
                setLoading(false);
            }
        };
        fetchTrailer();
    }, [id]);
    return (_jsxs(_Fragment, { children: [_jsx(Navbar, {}), _jsx("h2", { className: 'text-center m-5 ', children: trailer?.trailerName }), _jsxs("div", { className: "trailer-page d-flex justify-content-center mb-5", children: [loading && _jsx("div", { children: "Loading..." }), error && _jsxs("div", { children: ["Error: ", error] }), !loading && !error && !trailer && _jsx("div", { children: "No trailer available." }), !loading && !error && trailer && (_jsx("div", { children: _jsx("iframe", { width: "1200", height: "650", src: `https://www.youtube.com/embed/${trailer.trailerKey}?autoplay=1&mute=1&`, title: "Trailer", allowFullScreen: true }) }))] }), _jsx(Footer, {})] }));
};
export default TrailerPage;
