import React from 'react'
import { useLocation } from 'react-router-dom'
function Header() {

    //ROUNTING VARIABLE
    const loc = useLocation()
    const pathname = loc.pathname
    if (pathname === '/dashboard') {
        return null
    }
    return (
        <>
            <header className='pt-3 container-fluid container-md'>
                <h2 className="text-success fw-bold">PVMS</h2>
            </header>
        </>
    )
}
export default Header