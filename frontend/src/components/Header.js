

import React from 'react';

function Header() {
  return (
    <header
      className="d-flex justify-content-between align-items-center py-3 px-4"
      style={{ backgroundColor: '#198754', color: '#fff' }}
    >
      <div>
      <a href="/" className="text-decoration-none">
  <h2 className="text-white fw-bold">PVMMS</h2>
</a>
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
