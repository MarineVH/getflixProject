import Navbar from "../component/navbar";
import Jumbotron from "../component/jumbotron";
import Footer from "../component/footer";
import MovieSlider from "../component/slider";
import SeriesSlider from "../component/series_component";
import TopRatedSeries from '../component/top_rated';
import TopRatedMovies from "../component/top_rated_movies";

function home() {
  return (
    <>
    <div>
      <Navbar />
      <Jumbotron />
      
      <div className="" style={{position:'relative', zIndex:6, marginTop:'200px'}}>
      
      <MovieSlider  />
      <div style={{marginBottom:'100px', marginTop:'100px'}}>
      <TopRatedMovies />
      </div>

      <SeriesSlider />
      <div style={{marginBottom:'100px', marginTop:'100px'}}>
      <TopRatedSeries />
      </div>
      </div>
      <Footer />
    </div>
    </>
  );
}

export default home;
