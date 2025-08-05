import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Spinner, Card } from 'react-bootstrap';

const API_KEY = '659ef929b9973214a653513e0e90b796';

interface ActorDetail {
    name: string;
    biography: string;
    birthday: string;
    place_of_birth: string;
    profile_path: string;
    known_for_department: string;
}

interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
}

const ActeurDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [actor, setActor] = useState<ActorDetail | null>(null);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActorDetails = async () => {
            const resActor = await fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=fr-FR`);
            const dataActor = await resActor.json();
            setActor(dataActor);

            const resCredits = await fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${API_KEY}&language=fr-FR`);
            const dataCredits = await resCredits.json();
            setMovies(dataCredits.cast.slice(0, 6)); // Top 12 films

            setLoading(false);
        };
        fetchActorDetails();
    }, [id]);

    if (loading || !actor) {
        return <div className="text-center my-5"><Spinner animation="border" /> Chargement...</div>;
    }

    return (
        <Container fluid className="background">
            <Row>
                <div
                    style={{
                        backgroundImage: `linear-gradient(to right, #480082, rgba(0, 0, 0, 0.6)), url(https://image.tmdb.org/t/p/original${actor.profile_path})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'top',
                        color: 'white',
                        padding: '150px 30px',
                        marginBottom: '2rem'
                    }}
                >
                    <Col md={4}>
                        <Card>
                            <Card.Img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} />
                        </Card>
                    </Col>
                    <Col md={8}>
                        <h3>{actor.name}</h3>
                        <p>{actor.known_for_department}</p>
                        <h4>Biographie</h4>
                        <p>{actor.biography || 'Aucune biographie disponible.'}</p>
                    </Col>
                </div>
            </Row>
            <h4 className="mt-5">Oeuvres principales</h4>
            <Row>
                {movies.map(movie => (
                    <Col key={movie.id} xs={6} md={4} lg={2}>
                        <div className="film-card">
                            <Link to={`/film/${movie.id}`} style={{ textDecoration: 'none' }}>
                                <Card>
                                    <Card.Img
                                        src={
                                            movie.poster_path
                                                ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                                                : '/placeholder.jpg'
                                        }
                                    />
                                </Card>
                            </Link>
                        </div>
                    </Col>
                ))}
                <Link to={`/films`}>
                    <button>Voir plus</button>
                </Link>
            </Row>
            <Row className='footer mt-5'>
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

export default ActeurDetail;
