import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    </footer>
  );
};

export default Footer;