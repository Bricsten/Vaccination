import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="container-fluid container-md h-100 flex flex-column flex-1 justify-content-center">
            <div className="row h-100 align-items-center">
                <div className="col-md-6 offset-md-3">
                    <div className="card shadow-sm border border-1 rounded-3 p-5 text-center">
                        <div className="mb-4">
                            <i className="bi bi-exclamation-triangle-fill text-danger" style={{ fontSize: '4rem' }}></i>
                        </div>
                        <h1 className="text-danger mb-3">404</h1>
                        <p className="mb-4">Oops! The page you're looking for doesn't exist.</p>
                        <Link to="/" className="btn btn-success">
                            Take me home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;