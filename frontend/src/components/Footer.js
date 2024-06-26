import React from 'react';
import { useLocation } from 'react-router-dom'
const Footer = () => {
  //ROUNTING VARIABLE
  const loc = useLocation()
  const pathname = loc.pathname
  if (pathname.slice(0, 10) === '/dashboard') {
    return null
  }
  return (
    <footer className="bg-success text-white py-4">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 mb-3 mb-md-0">
            <p className="mb-0">&copy; 2024 Polio Vaccination Monitoring System. All rights reserved.</p>
          </div>
          <div className="col-md-6 d-flex justify-content-between">
            <li className="list-inline-item mr-3">
              <a href="#" className="text-white text-decoration-none">Privacy Policy</a>
            </li>
            <li className="list-inline-item mr-3">
              <a href="#" className="text-white text-decoration-none">Terms of Service</a>
            </li>
            <li className="list-inline-item">
              <a href="#" className="text-white text-decoration-none">Contact Us</a>
            </li>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;