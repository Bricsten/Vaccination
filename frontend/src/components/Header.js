
import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { FaSignOutAlt } from 'react-icons/fa'

function Header() {

  /* ROUTING VARIABLE */
  const loc = useLocation()
  const pathname = loc.pathname
  /* if (pathname.slice(0, 10) === '/dashboard') {
      return null
  } */
  return (
    <header
      className={'d-flex justify-content-between align-items-center ' + (pathname.slice(0, 10) === '/dashboard' ? 'pt-3 ps-5 ms-4 d-lg-none text-success' : ' py-3 px-4 bg-success text-white')}
    >
      <div>
        <h2 className="fw-bold">PVMMS</h2>
      </div>
      <nav>
        <ul className="list-unstyled d-flex gap-4">
          {
            !localStorage.getItem('user') ?
              <><li>
                <Link to="/login" className={'text-decoration-none ' + (pathname.slice(0, 10) === '/dashboard' ? 'text-success' : ' text-white')}>
                  Login
                </Link>
              </li>
                <li>
                  <Link to="/register" className={'text-decoration-none ' + (pathname.slice(0, 10) === '/dashboard' ? 'text-success' : ' text-white')}>
                    Register
                  </Link>
                </li></> :
              <>
                <li>
                  <Link to="/dashboard" className={'text-decoration-none ' + (pathname.slice(0, 10) === '/dashboard' ? 'text-success' : ' text-white')}>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/" onClick={() => { localStorage.clear() }} className={'text-decoration-none ' + (pathname.slice(0, 10) === '/dashboard' ? 'text-success' : ' text-white')}>
                    <FaSignOutAlt />
                    <span> Log Out</span>
                  </Link>
                </li></>
          }
        </ul>
      </nav>
    </header>)
}

export default Header; 