import React, { useState } from 'react';
import regions from './regions/regions.json';

import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';

function GettingStarted() {
    const [selectedRegion, setSelectedRegion] = useState('');
    const [isCustomRegion, setIsCustomRegion] = useState(false);
    const [customRegionName, setCustomRegionName] = useState('');
    const [customRegionPopulation, setCustomRegionPopulation] = useState('');

    const handleRegionSelect = (event) => {
        setSelectedRegion(event.target.value);
    };

    const handleCustomRegion = () => {
        setIsCustomRegion(prevState => !prevState);
    };

    const handleCustomRegionNameChange = (event) => {
        setCustomRegionName(event.target.value);
    };

    const handleCustomRegionPopulationChange = (event) => {
        setCustomRegionPopulation(event.target.value);
    };

    const navigate = useNavigate();
    const handleContinue = () => {
        if (!isCustomRegion) {
            localStorage.setItem('region', selectedRegion);
            localStorage.setItem('population', regions[selectedRegion]);
            navigate('/dashboard');
        } else {
            localStorage.setItem('region', customRegionName);
            localStorage.setItem('population', customRegionPopulation);
            navigate('/dashboard');
        }
    };

    const isSubmitDisabled = () => {
        if (selectedRegion !== '' && !isCustomRegion) {
            return false
        } else {
            if (isCustomRegion && customRegionName && customRegionPopulation) {
                return false;
            }
        }
        return true;
    };

    return (
        <div className="container my-5">
            <h1 className="mb-4 fw-semibold">Get Started <span className='text-success'>Polio Monitoring System</span></h1>

            <div className="form-group">
                <label htmlFor="region-select" className="form-label">Select a region in cameroon:</label>
                <select
                    id="region-select"
                    className={`form-control ${isCustomRegion ? 'bg-secondary text-white disabled' : ''}`}
                    value={selectedRegion}
                    onChange={handleRegionSelect}
                    disabled={isCustomRegion}
                >
                    <option value="">Select a region</option>
                    {Object.keys(regions).map((key) => (
                        <option key={key} value={key}>{key}</option>
                    ))}
                </select>
            </div>
            <div className="form-check my-3">
                <input
                    type="checkbox"
                    id="custom-region-checkbox"
                    className="form-check-input"
                    checked={isCustomRegion}
                    onChange={handleCustomRegion}
                />
                <label htmlFor="custom-region-checkbox" className="form-check-label">Custom</label>
            </div>

            {isCustomRegion && (
                <div>
                    <div className="form-group">
                        <label htmlFor="custom-region-name" className="form-label">Custom Region Name:</label>
                        <input
                            type="text"
                            id="custom-region-name"
                            className="form-control"
                            value={customRegionName}
                            onChange={handleCustomRegionNameChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="custom-region-population" className="form-label">Custom Region Population:</label>
                        <input
                            type="number"
                            id="custom-region-population"
                            className="form-control"
                            value={customRegionPopulation}
                            onChange={handleCustomRegionPopulationChange}
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