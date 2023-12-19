import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
function NavScrollExample() {
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");
    const searchRef = useRef(null);
    const navigate = useNavigate();
    const fetchMovies = async () => {
        try {
            const response = await axios.get("http://localhost:8888/getflixProject/api/get_movies.php");
            const data = response.data;
            if (Array.isArray(data.movies)) {
                setMovies(data.movies);
            }
            else {
                console.error('Invalid data structure received from the server');
            }
        }
        catch (error) {
            console.error('Error fetching movies:', error);
        }
    };
    const fetchSeries = async () => {
        try {
            const response = await axios.get("http://localhost:8888/getflixProject/api/get_series.php");
            const data = response.data;
            if (Array.isArray(data.series)) {
                setSeries(data.series);
            }
            else {
                console.error('Invalid data structure received for series from the server');
            }
        }
        catch (error) {
            console.error('Error fetching series:', error);
        }
    };
    useEffect(() => {
        fetchMovies();
        fetchSeries();
    }, []);
    useEffect(() => {
        setFiltered([
            ...movies.filter((item) => item.title.toLowerCase().includes(search.toLowerCase())),
            ...series.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())),
        ]);
    }, [search, movies, series]);
    const handleInputChange = (e) => {
        const inputText = e.target.value;
        setSearch(inputText);
    };
    const renderStars = (rating) => {
        const roundedRating = Math.round(rating);
        const starCount = Math.floor(roundedRating / 2);
        const fullStars = Array.from({ length: starCount }, (_, index) => (_jsx("span", { className: "gold-star", children: "\u2605" }, index)));
        return fullStars;
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        navigate('/login');
    };
    return (_jsx(Navbar, { expand: "lg", className: "cl ", children: _jsxs(Container, { fluid: true, className: "cl p-0 m-0", children: [_jsx(Navbar.Brand, { href: "", children: _jsx("span", { className: "streamify mx-3", children: "Streamify" }) }), _jsx(Navbar.Toggle, { "aria-controls": "navbarScroll", className: "rounded-5 mx-3 p-3 border", style: { backgroundColor: "rgba(83, 187, 144, 0.7)" } }), _jsxs(Navbar.Collapse, { id: "navbarScroll", role: 'navigation', children: [_jsxs(Nav, { className: "me-auto my-2 my-lg-0 bg-transparent", style: { maxHeight: "100px" }, navbarScroll: true, children: [_jsx(Nav.Link, { className: "dim mx-3", href: "/home", style: { color: "#53bb90" }, children: "HOME" }), _jsx(Nav.Link, { className: "dim mx-3", href: "/movies", style: { color: "#53bb90" }, children: "MOVIES" }), _jsx(Nav.Link, { className: "dim mx-3  bg-transparent", href: "/series", style: { color: "#53bb90" }, children: "SERIES" }), _jsx(Nav.Link, { className: "dim mx-3 ", href: "/upcoming", style: { color: "#53bb90" }, children: "UPCOMING" })] }), _jsxs("div", { className: "container-fluid w-25", children: [_jsxs("form", { className: "d-flex", children: [_jsx("input", { type: "text", id: "search", className: "input form-control  me-2  rounded-pill border-1 min", placeholder: "Search ...", onChange: handleInputChange, ref: searchRef }), search.length > 0 && (_jsx("button", { type: "button", className: "closeSearch ", onClick: () => {
                                                setSearch("");
                                                if (searchRef.current)
                                                    searchRef.current.value = "";
                                            }, children: _jsx(IoClose, {}) }))] }), search.length > 0 && (_jsx("div", { className: "dropdown", children: filtered.length > 0 ? (filtered.map((item, index) => (_jsx("div", { className: "result", onClick: () => { }, children: ("title" in item) ? (_jsxs(Link, { to: `/movie/${item.id}`, className: 'card movie-link', children: [_jsx("img", { src: `https://image.tmdb.org/t/p/w780${item.poster_path}`, alt: item.title, className: 'img' }), _jsx("h5", { className: 'movie-title', children: item.title }), _jsxs("p", { className: 'rating', children: ["Rating: ", renderStars(item.vote_average)] })] }, item.id)) : (_jsxs(Link, { to: `/serie/${item.id}`, className: 'card series-link', children: [_jsx("img", { src: `https://image.tmdb.org/t/p/w780${item.poster_path}`, alt: item.name, className: 'img' }), _jsx("h5", { className: 'series-title', children: item.name }), _jsxs("p", { className: 'rating', children: ["Rating: ", renderStars(item.vote_average)] })] }, item.id)) }, index)))) : (_jsx("h3", { style: { textAlign: 'center' }, children: "No match" })) }))] }), _jsxs("div", { className: "d-flex", children: [_jsx("button", { className: "registration px-3", type: "button", onClick: handleLogout, children: "Log Out" }), _jsx(Link, { className: "nav-link", to: "/profile", children: _jsx(FontAwesomeIcon, { icon: faUser, className: "mx-4" }) })] })] })] }) }));
}
export default NavScrollExample;
