import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar';

import Home from './pages/Home';
import Film from './pages/Film';
import Categorie from './pages/Categorie';
import Acteurs from './pages/Acteur';
import ActeurDetail from './pages/ActeurDetail';
import Recherche from './pages/Recherche';
import About from './pages/About';
import Demo from './pages/Demo';
import FilmDetail from './pages/FilmDetail';


const App: React.FC = () => {
  return (
    <>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/films" element={<Film />} />
        <Route path="/film/:id" element={<FilmDetail />} />
        <Route path="/categorie/:genreId" element={<Categorie />} />
        <Route path="/acteurs" element={<Acteurs />} />
        <Route path="/acteur/:id" element={<ActeurDetail />} />
        <Route path="/recherche" element={<Recherche />} />
        <Route path="/about" element={<About />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </>
  );
};

export default App;
