import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';

const API_KEY = '659ef929b9973214a653513e0e90b796';

interface MovieDetail {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    genres: { id: number; name: string }[];
    release_date: string;
    runtime: number;
    vote_average: number;
}

interface Person {
    id: number;
    name: string;
    job?: string;
    character?: string;
    profile_path: string | null;
}

interface Movie {
    id: number;
    title: string;
    poster_path: string;
}

const FilmDetail: React.FC = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState<MovieDetail | null>(null);
    const [cast, setCast] = useState<Person[]>([]);
    const [crew, setCrew] = useState<Person[]>([]);
    const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovieData = async () => {
            setLoading(true);

            const resMovie = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=fr-FR`);
            const dataMovie = await resMovie.json();
            setMovie(dataMovie);

            const resCredits = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=fr-FR`);
            const dataCredits = await resCredits.json();
            setCast(dataCredits.cast.slice(0, 6));
            setCrew(dataCredits.crew);

            const resSimilar = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=fr-FR&page=1`);
            const dataSimilar = await resSimilar.json();
            setSimilarMovies(dataSimilar.results.slice(0, 6));

            setLoading(false);
        };

        fetchMovieData();
    }, [id]);

    if (loading || !movie) {
        return <div className="text-center my-5"><Spinner animation="border" /> Chargement...</div>;
    }

    const director = crew.find(person => person.job === 'Director');
    const writer = crew.find(person => person.job === 'Writer' || person.job === 'Screenplay');

    return (
        <Container fluid className="background">
            <Row
                style={{
                    backgroundImage: `linear-gradient(to right, #480082, rgba(0, 0, 0, 0.6)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'top',
                    color: 'white',
                    padding: '150px 30px',
                    marginBottom: '2rem'
                }}>
                <Col md={4}>
                    <Card>
                        <Card.Img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                    </Card>
                </Col>
                <Col md={8}>
                    <h2>{movie.title}</h2>
                    <p><strong>Date de sortie :</strong> {movie.release_date}</p>
                    <p><strong>Durée :</strong> {movie.runtime} min</p>
                    <p><strong>Note moyenne :</strong> {movie.vote_average}/10</p>
                    <p><strong>Genres :</strong> {movie.genres.map(g => g.name).join(', ')}</p>
                    <p><strong>Synopsis :</strong> {movie.overview}</p>
                    <hr />
                    {director && <p><strong>Réalisateur :</strong> {director.name}</p>}
                    {writer && <p><strong>Scénario :</strong> {writer.name}</p>}
                </Col>
            </Row>

            <h4 className="mt-5">Acteurs principaux</h4>
            <Row>
                {cast.map(actor => (
                    <Col key={actor.id} xs={6} md={4} lg={2}>
                        <div className="film-card">
                            <Link to={`/acteur/${actor.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Card>
                                    <Card.Img
                                        src={
                                            actor.profile_path
                                                ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                                                : '/noxa.png'
                                        }
                                    />
                                </Card>
                            </Link>
                        </div>
                    </Col>
                ))}
            </Row>

            <h4 className="mt-5">Vous aimerez aussi</h4>
            <Row>
                {similarMovies.map(similar => (
                    <Col key={similar.id} xs={6} md={4} lg={2}>
                        <div className="film-card">
                            <Link to={`/film/${similar.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Card>
                                    <Card.Img
                                        src={
                                            similar.poster_path
                                                ? `https://image.tmdb.org/t/p/w500${similar.poster_path}`
                                                : '/noxa.png'
                                        }
                                    />
                                </Card>
                            </Link>
                        </div>
                    </Col>
                ))}
                <Link to={`/films`}>
                    <button className='costum-button'>Voir plus</button>
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
                    <img src='/logo-noxa.png' className='logo'></img>
                </Col>
                <Col>
                    <h3>Besoin d'aide ?</h3>
                    <button>Nous joindre</button>
                </Col>
                <Col className="col-12">
                    <p>© 2020-2025 NOXA Networks Entertainment LLC. Droits réservés</p>
                </Col>
            </Row>
        </Container>
    );
};

export default FilmDetail;
