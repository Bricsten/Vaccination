import React from 'react'
import { useLocation } from 'react-router-dom'
function Header() {

    //ROUNTING VARIABLE
    const loc = useLocation()
    const pathname = loc.pathname
    /* if (pathname.slice(0, 10) === '/dashboard') {
        return null
    } */
    return (
        <>
            <header className={pathname.slice(0, 10) === '/dashboard' ? 'pt-3 ps-5 ms-4 d-lg-none' : 'pt-3 container-fluid container-md'}>
                <h2 className="text-success fw-bold">PVMS</h2>
                <hr className='shadow-sm' style={{ opacity: 0.2 }}></hr>
            </header>
        </>
    )
}
export default Header