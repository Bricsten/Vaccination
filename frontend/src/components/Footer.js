import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p>&copy; 2024 Polio Vaccination Monitoring System. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-md-right">
            <p>
              Contact Us:
              <a href="mailto:info@poliovaccine.com" className="text-light ml-2">
                info@poliovaccine.com
              </a>
            </p>
            <p>
              Phone: <a href="tel:+1234567890" className="text-light">+1 (234) 567-890</a>
            </p>
          </div>
        </div>
      </div>
=======
import {Container, Row, Col} from 'react-bootstrap';

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
>>>>>>> 2fd0e27 (added the footer i noticed u already added header)
      </footer>
      );
};

      export default Footer;