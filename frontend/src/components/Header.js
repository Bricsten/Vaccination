
import React from 'react'
import { useLocation,Link } from 'react-router-dom'

function Header() {

    const loc = useLocation()
    const pathname = loc.pathname
    /* if (pathname.slice(0, 10) === '/dashboard') {
        return null
    } */
  return (
    <header
    className={pathname.slice(0, 10) === '/dashboard' ? 'pt-3 ps-5 ms-4 d-lg-none' : 'container-fluid d-flex justify-content-between align-items-center py-3 px-4'}
    style={{ backgroundColor: '#198754', color: '#fff' }}
  >
      <div>
      <h2><a href="/" class="text-white text-decoration-none text-white fw-bold">PVMMS</a></h2>
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
    </header>)
}

export default Header; 