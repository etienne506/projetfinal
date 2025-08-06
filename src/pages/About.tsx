import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import etienne from '../assets/etienne.png';
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.0/css/all.min.css" integrity="sha512-DxV+EoADOkOygM4IR9yXP8Sb2qwgidEmeqAEmDKIOfPRQZOWbXCzLC6vjbZyy0vPisbH2SyW27+ddLVCN+OMzQ==" crossOrigin="anonymous" referrerPolicy="no-referrer" />


const About: React.FC = () => {
  return (
    <Container fluid className='background'>
      <div className='header'>
        <h2>Notre projet</h2>
      </div>
      <div className='pb-5'>
        <p>
          Dans le cadre de notre cours de projet d'intégration, nous avons été appelés à
          créer un site web présentant des films à voir. Dès nos premières séances, nous
          nous sommes orientés vers des couleurs sombres et modernes, comme l'indigo.</p>

        <p>Le nom de la plateforme, Noxa, fait référence à la nuit en latin. C'est ainsi que
          notre concept a pris forme. Camille, une experte en design, a dirigé les premières
          étapes du projet, tandis qu'Étienne s'est davantage occupé de la programmation.</p>

        <p>Ensemble, nous avons formé une équipe complémentaire, ce qui nous a permis
          d'aboutir à ce résultat.
        </p>
      </div>
      <Row className='align-items-center'>
        <h2>Étienne</h2>
        <Col md={4} className='image'>
        <img src={etienne} alt='image'></img>
      </Col>
      <Col md={8}>
        <p>J'ai eu la chance de pouvoir travailler
          avec une designer exceptionnelle
          pendant ce projet. Elle s'est
          énormément investie dans le design,
          et j'ai moi-même été impressionné.</p>

          <p>Pour ma part, je me suis davantage
          concentré sur la programmation. Je
          trouve que ce projet a été pertinent
          du début à la fin, de la conception
          au montage.</p>

          <p>J'ai adoré réaliser ce projet en
          collaboration avec une designer
          au talent incroyable !</p>
          </Col>
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
    </Container>
  );
};


export default About;
