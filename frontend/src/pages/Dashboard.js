import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaAngleDoubleLeft, FaHome, FaUserCheck, FaSignOutAlt, FaCog } from 'react-icons/fa';

function Dashboard() {
    const [isOpen, setIsOpen] = useState(false);


    const loc = useLocation()
    function isRoute(route) {
        return loc.pathname === route
    }
    const navigate = useNavigate()
    if (!localStorage.getItem('country') || !localStorage.getItem('population') || !localStorage.getItem('user')) {
        navigate('/')
    }
    return (
        <div className=" flex-grow-1 d-flex bg-success">
            <button onClick={() => { setIsOpen(true) }} className='btn btn-outline-success d-lg-none menu-btn z-2'>
                <FaBars size={27} />
            </button>
            <div className='d-none d-lg-block' style={{ minWidth: '300px' }}></div>
            <div className={'overflow-y-auto panel z-3 bg-success ' + (isOpen ? 'openPanel' : '')}>
                <div className='d-flex justify-content-end d-lg-none mt-2 pe-3'>
                    <button className="btn btn-outline-danger p-1 px-2 py-2" onClick={() => { setIsOpen(false) }}>
                        <FaAngleDoubleLeft size={23} />
                    </button>
                </div>
                <div className='bg-white rounded-circle mx-auto mt-1=2 mt-lg-3 d-flex justify-content-center align-items-center' style={{ width: '170px', height: '170px' }}>
                    <h2 className="text-success fw-bold">PVMS</h2>
                </div>
                <div className='text-white bg fw-bold bg-info py-2 text-center rounded-2 mt-4 mx-auto' style={{ fontSize: 17, width: '190px' }}>Control Panel</div>
                <Link to="/dashboard" className={'ms-auto mt-4 text-white fw-bolder d-flex align-items-center gap-3 ps-2 py-2 text-decoration-none ' + (isRoute('/dashboard') ? 'border-info border-2 border-start bg-info bg-opacity-25 rounded-start-1' : '')} style={{ fontSize: 17, width: '260px' }}>
                    <FaHome />
                    <span >Dashboard</span>
                </Link>
                <Link to="/dashboard/vaccinatedpeople" className={'ms-auto mt-3 text-white fw-bolder d-flex align-items-center gap-3 ps-2 py-2 text-decoration-none ' + (isRoute('/dashboard/vaccinatedpeople') ? 'border-info border-2 border-start bg-info bg-opacity-25 rounded-start-1' : '')} style={{ fontSize: 17, width: '260px' }}>
                    <FaUserCheck />
                    <span>Vaccinated People</span>
                </Link>
                <Link to="/dashboard/settings" className={'ms-auto mt-3 text-white fw-bolder d-flex align-items-center gap-3 ps-2 py-2 text-decoration-none ' + (isRoute('/dashboard/settings') ? 'border-info border-2 border-start bg-info bg-opacity-25 rounded-start-1' : '')} style={{ fontSize: 17, width: '260px' }}>
                    <FaCog />
                    <span>Settings</span>
                </Link>
                <Link to="/" onClick={() => { localStorage.clear() }} className={'ms-auto btn mt-3 text-white fw-bolder d-flex align-items-center gap-3 ps-2 py-2 text-decoration-none '} style={{ fontSize: 17, width: '260px' }}>
                    <FaSignOutAlt />
                    <span>Log Out</span>
                </Link>
            </div>
            {
                isOpen && <button className='overlay z-1 d-lg-none' onClick={() => { setIsOpen(false) }}></button>
            }
            <div className='flex-grow-1 bg-white rounded-start-5 shadow-sm x-rounded z-0' style={{ height: '100vh' }}>
                <Outlet />
            </div>

        </div>
    );
}

export default Dashboard;