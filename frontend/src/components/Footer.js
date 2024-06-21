import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="mb-3 mb-md-0">
            <p className="mb-0">&copy; 2023 Polio Vaccination Monitoring System. All rights reserved.</p>
          </Col>
          <Col md={6} className="text-md-right">
            <ul className="list-inline mb-0">
              <li className="list-inline-item mr-3">
                <a href="#" className="text-white">Privacy Policy</a>
              </li>
              <li className="list-inline-item mr-3">
                <a href="#" className="text-white">Terms of Service</a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-white">Contact Us</a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;