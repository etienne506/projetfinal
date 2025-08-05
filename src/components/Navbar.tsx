import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const AppNavbar: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="md" className='sticky-top'>
      <Container>
        <Navbar.Brand as={Link} to="/">NOXA</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/films">Films</Nav.Link>
            <Nav.Link as={Link} to="/categorie/28">Catégories</Nav.Link>
            <Nav.Link as={Link} to="/acteurs">Acteurs</Nav.Link>
            <Nav.Link as={Link} to="/recherche">Recherche</Nav.Link>
            <Nav.Link as={Link} to="/about">À propos</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
