import React, { useState } from 'react';
import country from './country/country.json';

import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';

function GettingStarted() {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [isCustomCountry, setIsCustomCountry] = useState(false);
    const [customCountryName, setCustomCountryName] = useState('');
    const [customCountryPopulation, setCustomCountryPopulation] = useState('');

    const handleCountrySelect = (event) => {
        setSelectedCountry(event.target.value);
    };

    const handleCustomCountry = () => {
        setIsCustomCountry(prevState => !prevState);
    };

    const handleCustomCountryNameChange = (event) => {

        setCustomCountryName(event.target.value);
    };

    const handleCustomCountryPopulationChange = (event) => {

        setCustomCountryPopulation(event.target.value);
    };

    const navigate = useNavigate();
    const handleContinue = () => {
        if (!isCustomCountry) {
            localStorage.setItem('country', selectedCountry);
            localStorage.setItem('population', country[selectedCountry]);
            navigate('/dashboard');
        } else {
            localStorage.setItem('country', customCountryName);
            localStorage.setItem('population', customCountryPopulation);
            navigate('/dashboard');
        }
    };
    const isSubmitDisabled = () => {
        if (selectedCountry !== '' && !isCustomCountry) {
            return false
        } else {
            if (isCustomCountry && customCountryName && customCountryPopulation) {
                return false;
            }
        }
        return true;
    };



    return (
        <div className="container my-5">
            <h1 className="mb-4 fw-semibold">Get Started <span className='text-success'>Polio Monitoring System</span></h1>

            <div className="form-group">
                <label htmlFor="country-select" className="form-label">Select a country:</label>
                <select
                    id="country-select"
                    className={`form-control ${isCustomCountry ? 'bg-secondary text-white disabled' : ''}`}
                    value={selectedCountry}
                    onChange={handleCountrySelect}
                    disabled={isCustomCountry}
                >
                    <option value="">Select a country</option>
                    {Object.keys(country).map((key) => (
                        <option key={key} value={key}>{key}</option>
                    ))}
                </select>
            </div>
            <div className="form-check my-3">
                <input
                    type="checkbox"
                    id="custom-country-checkbox"
                    className="form-check-input"
                    checked={isCustomCountry}
                    onChange={handleCustomCountry}
                />
                <label htmlFor="custom-country-checkbox" className="form-check-label">Custom</label>
            </div>

            {isCustomCountry && (
                <div>
                    <div className="form-group">
                        <label htmlFor="custom-country-name" className="form-label">Custom Country Name:</label>
                        <input
                            type="text"
                            id="custom-country-name"
                            className="form-control"
                            value={customCountryName}
                            onChange={handleCustomCountryNameChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="custom-country-population" className="form-label">Custom Country Population:</label>
                        <input
                            type="number"
                            id="custom-country-population"
                            className="form-control"
                            value={customCountryPopulation}
                            onChange={handleCustomCountryPopulationChange}
                        />
                    </div>
                </div>
            )}



            <button
                className="btn btn-success mt-5"
                onClick={handleContinue}
                disabled={isSubmitDisabled()}
            >
                Head to Dashboard
            </button>
        </div>
    );
}

export default GettingStarted;