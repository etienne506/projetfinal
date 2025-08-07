import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';

const API_KEY = '659ef929b9973214a653513e0e90b796';

interface Actor {
  id: number;
  name: string;
  profile_path: string | null;
}

const Acteurs: React.FC = () => {
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActors = async () => {
      const all: Actor[] = [];
      for (let page = 1; page <= 5; page++) {
        const res = await fetch(`https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=fr-FR&page=${page}`);
        const data = await res.json();
        all.push(...data.results);
      }
      setActors(all);
      setLoading(false);
    };
    fetchActors();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" /> Chargement...
      </div>
    );
  }

  return (
    <Container fluid className='background'>
      <h2>Acteurs</h2>
      <Row>
        {actors.map(actor => (
          <Col key={actor.id} xs={6} md={3} lg={2}>
            <div className='film-card'>
            <Link to={`/acteur/${actor.id}`} style={{ textDecoration: 'none' }}>
              <Card>
                <Card.Img
                  variant="top"
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                      : '/noxa.png'
                  }
                  alt={actor.name}
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

export default Acteurs;
