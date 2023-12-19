import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../component/navbar';
import Footer from '../component/footer';
import "./movie.css";

interface Trailer {
  trailerKey: string;
  trailerName: string;
}

const TrailerPage: React.FC = () => {
  const { id } = useParams();
  const [trailer, setTrailer] = useState<Trailer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await axios.get(`http://localhost:8888/getflixProject/api/trailer.php?id=${id}`);
        const data = response.data;
        console.log(data);
        setTrailer(data);
      } catch (error) {
        console.error('Error fetching trailer:', error);
        setError('Error fetching trailer. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrailer();
  }, [id]);

  return (
    <>
      <Navbar />
      <h2 className='text-center m-5 '>{trailer?.trailerName}</h2>

      <div className="trailer-page d-flex justify-content-center mb-5">
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {!loading && !error && !trailer && <div>No trailer available.</div>}
        {!loading && !error && trailer && (
          <div>
            <iframe
              width="1200"
              height="650"
              src={`https://www.youtube.com/embed/${trailer.trailerKey}?autoplay=1&mute=1&`}
              title="Trailer"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default TrailerPage;
