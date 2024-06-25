import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

function Dashboard() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOffcanvas = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className=" flex-grow-1 flex container-lg">
            <div className=' flex-grow-1 overflow-y-auto' style={{ width: '300px' }}>
                Dashboard
            </div>
            <div className='flex-1'>

            </div>
        </div>
    );
}

export default Dashboard;