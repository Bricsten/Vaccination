import React from 'react'
import { ToastContainer } from 'react-toastify';
import { Outlet } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
function App() {
    return (
        <>
            <ToastContainer />
            <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
                <div className="h-100 flex-grow-1 d-flex flex-column">
                    <Header />
                    <Outlet />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default App