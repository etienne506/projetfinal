import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { fetchMoviesByGenre, fetchGenres } from '../api/tmdb';
import type { TMDBMovieListItem } from '../types/TMDBMovieListItem';
import './Categorie.css';
import { Container, Spinner, Alert, Pagination, Row, Col } from 'react-bootstrap';

const Categorie: React.FC = () => {
  const { genreId } = useParams<{ genreId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get('page') ?? '1', 10);

  const [movies, setMovies] = useState<TMDBMovieListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [genreName, setGenreName] = useState<string | null>(null);
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    fetchGenres().then(setGenres).catch(console.error);
  }, []);

  useEffect(() => {
    if (!genreId) return;
    setLoading(true);
    setError(null);
    fetchMoviesByGenre(genreId, pageFromUrl)
      .then(response => {
        setMovies(response.results);
        setTotalPages(response.total_pages);
        setTotalResults(response.total_results);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [genreId, pageFromUrl]);


  useEffect(() => {
    if (!genreId) return;
    fetchGenres()
      .then(genres => {
        const found = genres.find(g => String(g.id) === String(genreId));
        setGenreName(found?.name ?? `#${genreId}`);
      })
      .catch(() => setGenreName(`#${genreId}`));
  }, [genreId]);

  const goToPage = (p: number) => {
    setSearchParams({ page: String(p) });
  };


  const paginationItems = [];
  const maxButtons = 7;
  const half = Math.floor(maxButtons / 2);
  let start = Math.max(1, pageFromUrl - half);
  let end = Math.min(totalPages, pageFromUrl + half);

  if (end - start < maxButtons - 1) {
    if (start === 1) {
      end = Math.min(totalPages, start + maxButtons - 1);
    } else if (end === totalPages) {
      start = Math.max(1, end - maxButtons + 1);
    }
  }

  if (start > 1) {
    paginationItems.push(
      <Pagination.Item key={1} onClick={() => goToPage(1)}>{1}</Pagination.Item>
    );
    if (start > 2) {
      paginationItems.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
    }
  }
  for (let i = start; i <= end; i++) {
    paginationItems.push(
      <Pagination.Item
        key={i}
        active={i === pageFromUrl}
        onClick={() => goToPage(i)}
      >
        {i}
      </Pagination.Item>
    );
  }
  if (end < totalPages) {
    if (end < totalPages - 1) {
      paginationItems.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
    }
    paginationItems.push(
      <Pagination.Item key={totalPages} onClick={() => goToPage(totalPages)}>
        {totalPages}
      </Pagination.Item>
    );
  }

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status" />
        <div>Chargement des films...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="background">
      <>
        <div>
          <h2 className="text-white text-center">Catégories</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              gap: "15px",
              padding: "20px",
              maxWidth: "1000px",
              margin: "0 auto",
            }}
          >
            {genres.map((genre) => (
              <Link
                to={`/categorie/${genre.id}`}
                key={genre.id}
                style={{
                  textDecoration: "none",
                  backgroundColor:
                    String(genre.id) === genreId ? "#480082" : "#292b38",
                  color: "white",
                  padding: "12px",
                  borderRadius: "10px",
                  textAlign: "center",
                  fontWeight: "bold",
                  transition: "0.2s",
                }}
              >
                {genre.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="demo-title" style={{ marginTop: 30 }}>{genreName ?? genreId}</h2>
          <p className="mb-3 text-end" style={{ marginRight: 20 }}>
            {totalResults} films trouvés — page {pageFromUrl} sur {totalPages}
          </p>

          <div className="film-grid">
            {movies.map((film) => (
              <div className="film-card" key={film.id}>
                <Link to={`/film/${film.id}`}>
                  <img
                    src={
                      film.poster_path
                        ? `https://image.tmdb.org/t/p/w342${film.poster_path}`
                        : '/noxa.png'
                    }
                    alt={film.title}
                  />
                </Link>
              </div>
            ))}
          </div>


          {totalPages > 1 && (
            <div className="my-4">
              <Pagination className="justify-content-center align-items-center">
                <Pagination.Prev
                  disabled={pageFromUrl <= 1}
                  onClick={() => goToPage(pageFromUrl - 1)}
                />
                {paginationItems}
                <Pagination.Next
                  disabled={pageFromUrl >= totalPages}
                  onClick={() => goToPage(pageFromUrl + 1)}
                />
              </Pagination>
            </div>
          )}
        </div>
      </>
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

export default Categorie;
