import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../component/navbar';
import Footer from '../component/footer';
import { Link } from 'react-router-dom';
import "./movie.css";
import Slider from "../component/slider";
const SingleMovie = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [userRating, setUserRating] = useState(null);
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`http://localhost:8888/getflixProject/api/get_movie_by_id.php?id=${id}`);
                const data = response.data;
                console.log(data.movie);
                setMovie(data.movie);
            }
            catch (error) {
                console.error('Error fetching movie:', error);
            }
        };
        fetchMovie();
    }, [id]);
    const handleRatingChange = async (newRating) => {
        try {
            // Send the rating to your PHP endpoint
            await axios.post('http://localhost:8888/getflixProject/api/rating_movie.php', {
                movie_id: id,
                rating: newRating,
            });
            // Update the local state with the new rating
            setUserRating(newRating);
        }
        catch (error) {
            console.error('Error rating movie:', error);
        }
    };
    if (!movie) {
        return _jsx("div", { children: "Loading..." });
    }
    const renderStars = (rating) => {
        const starCount = Math.floor(rating / 2);
        const fullStars = Array.from({ length: starCount }, (_, index) => (_jsx("span", { className: "gold-star", children: "\u2605" }, index)));
        return _jsx("div", { className: "stars", children: fullStars });
    };
    return (_jsxs(_Fragment, { children: [_jsx(Navbar, {}), _jsx("div", { className: "container2", children: _jsxs("div", { className: "row", children: [_jsx("div", { className: "col-md-6 d-flex align-items-center", children: _jsxs("div", { className: "d-flex flex-column", children: [_jsx("h2", { className: 'mov', children: movie.title }), _jsxs("p", { children: ["Release Date: ", _jsx("span", { className: 'date', children: movie.release_date })] }), _jsxs("p", { children: ["Rating: ", renderStars(userRating !== null ? userRating : movie.vote_average)] }), _jsx("p", { children: movie.overview }), _jsx(Link, { to: `/movie/trailer/${movie.id}`, className: "btn m-2", children: "Watch Trailer" }), _jsx("div", { children: _jsxs("p", { children: ["Rate this movie: ", [1, 2, 3, 4, 5].map((rating) => (_jsx("span", { className: `star ${userRating !== null && userRating >= rating ? 'selected' : ''}`, onClick: () => handleRatingChange(rating), children: "\u2605" }, rating)))] }) })] }) }), _jsx("div", { className: "col-md-6", children: movie.poster_path && movie.poster_path !== "" && (_jsx("img", { src: `http://image.tmdb.org/t/p/w500${movie.poster_path}`, alt: movie.title, style: { width: '100%', borderRadius: '10%' } })) })] }) }), _jsx(Slider, {}), _jsx(Footer, {})] }));
};
export default SingleMovie;
