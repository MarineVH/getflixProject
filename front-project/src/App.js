import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/navbar';
import Login from './Pages/login';
import Signup from './Pages/signup';
import Jumbotron from './component/jumbotron';
import 'bootstrap/dist/css/bootstrap.min.css';
import Presentation from './Pages/streamify';
import Footer from './component/footer';
import Privacy from './Pages/privacy';
import Home from './Pages/home';
import Profile from './Pages/profile';
import './App.css';
import ForgotPassword from './Pages/forgotPassword';
import ResetPassword from './Pages/resetPassword';
import Movies from './Pages/movies';
import SingleMovie from './Pages/movie';
import Slider from './component/slider';
import Series from './Pages/series';
import SingleSerie from './Pages/serie';
import SeriesSlider from './component/series_component';
import TopRatedSeries from './component/top_rated';
import TrailerPage from './Pages/trailer';
import TopRatedMovies from './component/top_rated_movies';
import Upcoming from './Pages/upcoming';
import AccessData from './Pages/change_access_data';
import Subscribe from './Pages/subscribe';
import PrivateRoute from './component/PrivateRoute';
/*
function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route path="/update-data/:username" element={<AccessData/>} />
        <Route path="/top_rated_movies" element={<TopRatedMovies/>} />
        <Route path="/top_rated" element={<TopRatedSeries/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/serie_slider" element={<SeriesSlider />} />
        <Route path="/slider" element={<Slider />} />
          <Route path="/" element={<Presentation />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<Home />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/footer" element={<Footer />} />
          <Route path='/movies' element={<Movies /> } />
          <Route path='/series' element={<Series /> } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/movie/:id" element={ <SingleMovie /> } />
          <Route path="/serie/:id" element={ <SingleSerie /> } />
          <Route path="/movie/trailer/:id" element={ <TrailerPage /> } />
          <Route path="/upcoming" element={<Upcoming /> } />
          <Route path="/subscribe" element={<Subscribe /> } />
          <Route path="/other" element={
              <>
              <Navbar />
              <Jumbotron />
            </>
          } />
        </Routes>
      </Router>
    </>
  )
}

export default App;
*/
/*  Private routes  */
function App() {
    return (_jsx(_Fragment, { children: _jsx(Router, { basename: '/getflixProject', children: _jsxs(Routes, { children: [_jsxs(Route, { element: _jsx(PrivateRoute, {}), children: [_jsx(Route, { path: "/getflixProject/streamify", element: _jsx(Presentation, {}) }), _jsx(Route, { path: '/getflixProject/home', element: _jsx(Home, {}) }), _jsx(Route, { path: "/getflixProject/profile", element: _jsx(Profile, {}) }), _jsx(Route, { path: "/getflixProject/privacy", element: _jsx(Privacy, {}) }), _jsx(Route, { path: "/getflixProject/footer", element: _jsx(Footer, {}) }), _jsx(Route, { path: '/getflixProject/movies', element: _jsx(Movies, {}) }), _jsx(Route, { path: "/getflixProject/movie/:id", element: _jsx(SingleMovie, {}) }), _jsx(Route, { path: "/getflixProject/upcoming", element: _jsx(Upcoming, {}) }), _jsx(Route, { path: '/getflixProject/series', element: _jsx(Series, {}) }), _jsx(Route, { path: "/getflixProject/serie/:id", element: _jsx(SingleSerie, {}) }), _jsx(Route, { path: "/getflixProject/serie/trailer/:id", element: _jsx(TrailerPage, {}) }), _jsx(Route, { path: "/getflixProject/top_rated", element: _jsx(TopRatedSeries, {}) }), _jsx(Route, { path: "/getflixProject/top_rated_movies", element: _jsx(TopRatedMovies, {}) }), _jsx(Route, { path: "/getflixProject/update-data/:username", element: _jsx(AccessData, {}) }), _jsx(Route, { path: "/getflixProject/subscribe", element: _jsx(Subscribe, {}) }), _jsx(Route, { path: "/getflixProject/slider", element: _jsx(Slider, {}) }), _jsx(Route, { path: "/getflixProject/serie_slider", element: _jsx(SeriesSlider, {}) }), _jsx(Route, { path: "/getflixProject/movie/trailer/:id", element: _jsx(TrailerPage, {}) }), _jsx(Route, { path: "/other", element: _jsxs(_Fragment, { children: [_jsx(Navbar, {}), _jsx(Jumbotron, {})] }) })] }), _jsx(Route, { path: "/", element: _jsx(Presentation, {}) }), _jsx(Route, { path: "/getflixProject/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/getflixProject/signup", element: _jsx(Signup, {}) }), _jsx(Route, { path: "/getflixProject/forgot-password", element: _jsx(ForgotPassword, {}) }), _jsx(Route, { path: "/getflixProject/reset-password", element: _jsx(ResetPassword, {}) })] }) }) }));
}
export default App;
