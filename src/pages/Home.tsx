import React, { useEffect, useState, type ReactNode } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { fetchPopularMovies, fetchUpcomingMovies, fetchGenres } from '../api/tmdb';
import '../components/ScrollCarousel.css';
import { Link } from 'react-router-dom';
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.0/css/all.min.css" integrity="sha512-DxV+EoADOkOygM4IR9yXP8Sb2qwgidEmeqAEmDKIOfPRQZOWbXCzLC6vjbZyy0vPisbH2SyW27+ddLVCN+OMzQ==" crossOrigin="anonymous" referrerPolicy="no-referrer" />


type Movie = {
  backdrop_path: any;
  overview: ReactNode;
  id: number;
  title: string;
  poster_path: string;
};

interface Genre {
  id: number;
  name: string;
}

const Home: React.FC = () => {
  const [popular, setPopular] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    fetchPopularMovies().then(setPopular).catch(console.error);
    fetchUpcomingMovies().then(setUpcoming).catch(console.error);
    fetchGenres().then(setGenres).catch(console.error);
  }, []);

  if (popular.length === 0 || upcoming.length === 0 || genres.length === 0) return <div>Chargement...</div>;

  const mainPopular = popular[0];
  const mainUpcoming = upcoming[0];




  return (
    <Container fluid className='background'>
      <Row>
        <div
          style={{
            backgroundImage: `linear-gradient(to right, #480082, rgba(0, 0, 0, 0.2)), url(https://image.tmdb.org/t/p/original${mainPopular.backdrop_path})`,
            backgroundSize: 'cover',
            backgroundPosition: 'top',
            color: 'white',
            padding: '150px 30px',
          }}
        ><Col className='popular'>
            <h1>Découvrez les meilleurs films</h1>
          </Col>
        </div>

        {/* CARROUSEL AVEC LES AFFICHES */}
        <div className="scroll-container">
          <div className="scroll-track">
            {[...popular, ...popular].map((movie, idx) => (
              <div className="scroll-item" key={idx}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              </div>
            ))}
          </div>
        </div>
        <Link to={`/films`}>
          <button className='costum-button'>Voir plus</button>
        </Link>
      </Row>
      <Row>
        <div
          style={{
            backgroundImage: `linear-gradient(to left, #480082, rgba(0, 0, 0, 0.2)), url(https://image.tmdb.org/t/p/original${mainUpcoming.backdrop_path})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white',
            padding: '150px 30px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
          }}
        >
          <Col className='upcoming'>
            <h1>Films à venir</h1>
          </Col>
        </div>

        {/* CARROUSEL AVEC LES AFFICHES */}
        <div className="scroll-container">
          <div className="scroll-track">
            {[...upcoming, ...upcoming].map((movie, idx) => (
              <div className="scroll-item" key={idx}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                />
              </div>
            ))}
          </div>
        </div>
        <Link to={`/films`}>
          <button className='costum-button'>Voir plus</button>
        </Link>
      </Row>
      <Row>
        <h1>Nos catégories</h1>
        <div className="scroll-container">
          <div className="scroll-track">
            {[...genres, ...genres].map((genre, idx) => (
              <div className="scroll-categorie" key={idx}>
                <span style={{ color: 'white', fontWeight: 'bold' }}>{genre.name}</span>
              </div>
            ))}
          </div>
        </div>
        <Link to={`/categorie/:genreId`}>
          <button className='costum-button'>Voir plus</button>
        </Link>
      </Row>
      <Row className='footer'>
        <Col>
          <h3>Suivez-nous !</h3>
          <i className="fa-brands fa-facebook"></i>
          <i className="fa-brands fa-instagram"></i>
          <i className="fa-brands fa-twitter"></i>
          <i className="fa-brands fa-youtube"></i>
        </Col>
        <Col>
          <h3>NOXA</h3>
        </Col>
        <Col>
          <h3>Besoin d'aide ?</h3>
          <button>Nous joindre</button>
        </Col>
        <Col className="col-12">
          <p>© 2020-2025 NOXA Networks Entertainment LLC. Droits réservés</p>
        </Col>
      </Row>
    </Container >
  );
};

export default Home;
