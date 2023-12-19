import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Navbar from "../component/navbar";
import Jumbotron from "../component/jumbotron";
import Footer from "../component/footer";
import MovieSlider from "../component/slider";
import SeriesSlider from "../component/series_component";
import TopRatedSeries from '../component/top_rated';
import TopRatedMovies from "../component/top_rated_movies";
function home() {
    return (_jsx(_Fragment, { children: _jsxs("div", { children: [_jsx(Navbar, {}), _jsx(Jumbotron, {}), _jsxs("div", { className: "", style: { position: 'relative', zIndex: 6, marginTop: '200px' }, children: [_jsx(MovieSlider, {}), _jsx("div", { style: { marginBottom: '100px', marginTop: '100px' }, children: _jsx(TopRatedMovies, {}) }), _jsx(SeriesSlider, {}), _jsx("div", { style: { marginBottom: '100px', marginTop: '100px' }, children: _jsx(TopRatedSeries, {}) })] }), _jsx(Footer, {})] }) }));
}
export default home;
