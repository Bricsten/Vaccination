

import React from 'react';

function Header() {
  return (
    <header
      className="d-flex justify-content-between align-items-center py-3 px-4"
      style={{ backgroundColor: '#198754', color: '#fff' }}
    >
      <div>
        <h2 className="text-white fw-bold">PVMMS</h2>
      </div>
      <nav>
        <ul className="list-unstyled d-flex gap-4">
          <li>
            <a href="/login" className="text-white text-decoration-none">
              Login
            </a>
          </li>
          <li>
            <a href="/register" className="text-white text-decoration-none">
              Register
            </a>
          </li>
        </ul>
      </nav>
    </header>
    
  );
}

export default Header;
/**import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router

function Header() {
  return (
    <header
      className="d-flex justify-content-between align-items-center py-3 px-4"
      style={{ backgroundColor: '#198754', color: '#fff' }}
    >
      <div>
        <h2 className="text-white fw-bold">PVMMS</h2>
      </div>
      <nav>
        <ul className="list-unstyled d-flex gap-4">
          <li>
            <Link to="/login" className="text-white text-decoration-none">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="text-white text-decoration-none">
              Register
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header; */