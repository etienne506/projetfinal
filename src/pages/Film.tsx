import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';

const API_KEY = '659ef929b9973214a653513e0e90b796';
interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
}

const Films: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllPages = async () => {
      try {
        const allMovies: Movie[] = [];

        for (let page = 1; page <= 5; page++) {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=fr-FR&page=${page}`
          );
          const data = await response.json();
          allMovies.push(...data.results);
        }

        setMovies(allMovies);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des films:', error);
      }
    };

    fetchAllPages();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" /> Chargement...
      </div>
    );
  }

  return (
    <Container fluid className="background">
      <h2>Films</h2>
      <Row>
        {movies.map(movie => (
          <Col key={movie.id} xs={6} md={3} lg={2}>
            <div className='film-card'>
            <Link to={`/film/${movie.id}`} style={{ textDecoration: 'none' }}>
              <Card>
                <Card.Img
                  variant="top"
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : '/noxa.png'
                  }
                  alt={movie.title}
                />
              </Card>
            </Link>
            </div>
          </Col>
        ))}
      </Row>
      <Row className='footer mt-5'>
        <Col>
          <h3>Suivez-nous !</h3>
          <i className="fa-brands fa-facebook fa-3x m-2"></i>
          <i className="fa-brands fa-instagram fa-3x m-2"></i>
          <i className="fa-brands fa-twitter fa-3x m-2"></i>
          <i className="fa-brands fa-youtube fa-3x m-2"></i>
        </Col>
        <Col>
          <img src='/logo-noxa.png' className='logo'></img>
        </Col>
        <Col>
          <h3>Besoin d'aide ?</h3>
          <Link to={`/about`}>
            <button className='second-costum-button'>Nous joindre</button>
          </Link>
        </Col>
        <Col className="col-12">
          <p>© 2020-2025 NOXA Networks Entertainment LLC. Droits réservés</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Films;
