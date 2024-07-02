import React, { useEffect, useState } from 'react';
import { FaUserPlus, FaUserCheck, FaUserFriends, FaFlag, FaCheckCircle, FaCircleNotch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts';
import axios from 'axios'
function Overview() {

    const formatViews = (num) => {
        if (num >= 1000000000) {
            return `${(num / 1000000000).toFixed(1)}B`;
        } else if (num >= 1000000) {
            return `${(num / 1000000).toFixed(1)}M`;
        } else if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}K`;
        } else {
            return num.toLocaleString();
        }
    };

    const data = [
        { date: '2024-01-01', value: 100 },
        { date: '2024-02-01', value: 120 },
        { date: '2024-03-01', value: 150 },
        { date: '2024-04-01', value: 180 },
        { date: '2024-05-01', value: 220 },
        { date: '2024-06-01', value: 250 },
    ];
    const backendUrl = 'http://localhost:4000/api/patients'
    const [recentlyVaccinated, setRecentlyVaccinated] = useState([]);
    const [patients, setPatients] = useState([]);

    /* GETTING PATIENTS */
    useEffect(() => {
        console.log('getPatients')
        axios.get(`${backendUrl}?region=${localStorage.getItem('region')}`)
            .then(res => {
                setPatients(res.data);
                const data = res.data.reverse()
                if (data.length > 5) {
                    setRecentlyVaccinated(data.slice(0, 5));
                } else {
                    setRecentlyVaccinated(data);
                }
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <>
            <div className=' d-flex justify-content-between pe-5 align-items-end'>
                <h1 className="text-3xl mt-0 fw-semibold pt-1  pt-lg-5 px-4">Overview </h1>
                <div className="d-flex align-items-center">
                    <FaFlag className="text-muted me-2" />
                    <div className="text-sm text-muted">{localStorage.getItem('region')}</div>
                </div>
            </div>
            <section className='container-fluid pt-4 px-4'>
                <div className="row g-3">
                    <div className="col-md-4">
                        <div
                            className="rounded-3 p-5 shadow-sm h-100 d-flex flex-column justify-content-between"
                            style={{
                                backgroundImage:
                                    'linear-gradient(to right, #07bc0c, #1dde2b)',
                            }}
                        >
                            <div className="d-flex align-items-center">
                                <FaUserPlus className="text-white fs-1 me-3" />
                                <div className="flex-grow-1">
                                    <div className="fw-bold fs-3 text-white">
                                        {formatViews(patients.length)}
                                    </div>
                                    <div className="text-white fw-semibold">Vaccinated</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div
                            className=" rounded-3 p-5 shadow-sm h-100 d-flex flex-column justify-content-between"
                            style={{
                                backgroundImage:
                                    'linear-gradient(to right, #fb7ba2, #fd9fb0)',
                            }}
                        >
                            <div className="d-flex align-items-center">
                                <FaUserCheck className="text-white fs-1 me-3" />
                                <div className="flex-grow-1">
                                    <div className="fw-bold fs-3 text-white">
                                        {formatViews(localStorage.getItem('population') - patients.length)}
                                    </div>
                                    <div className="text-white">Remaining Population</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div
                            className="rounded-3  p-5 shadow-sm h-100 d-flex flex-column justify-content-between"
                            style={{
                                backgroundImage:
                                    'linear-gradient(to right, #2f9df0, #5cb0f3)',
                            }}
                        >
                            <div className="d-flex align-items-center">
                                <FaUserFriends className="text-white fs-1 me-3" />
                                <div className="flex-grow-1">
                                    <div className="fw-bold fs-3 text-white">
                                        {formatViews(localStorage.getItem('population'))}
                                    </div>
                                    <div className="text-white">Total Population</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='container-fluid pt-4 px-4'>
                <h2 className="text-2xl mt-5 fw-semibold">Vaccination Trends</h2>
                <div>The graph show the progress of Polio Vaccination for the last <b>6 months</b> </div>
                <div className="rounded-3 shadow-sm h-100 mt-3">
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={data} >
                            <XAxis dataKey="date" label={{ value: 'Date', position: 'bottom' }} />
                            <YAxis label={{ value: 'People Vaccinated', angle: -90, position: 'insideLeft' }} />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="value" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </section>

            <section className="container-fluid py-4 px-4">
                <h2 className="text-2xl mt-5 fw-semibold">Recently Vaccinated</h2>
                <div>If you wish to add, edit, or delete a patient on the table <Link className='text-success text' to={'/dashboard/vaccinatedpeople'}>Click here</Link> </div>
                <div className="table-responsive rounded-3 px-2 border py-3 border-1 shadow-sm h-100 mt-4">
                    <table className="table">
                        <thead className='bg-dark'>
                            <tr>
                                <th>SN</th>
                                <th>Name</th>
                                <th>Date Vaccinated</th>
                                <th>Doses Left</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentlyVaccinated.map((patient) => {
                                const date = new Date(patient.dateVaccinated)
                                return (
                                    <tr key={patient.sn}>
                                        <td>{patient.sn}</td>
                                        <td>{patient.name}</td>
                                        <td>{date.toLocaleDateString()}</td>
                                        <td>
                                            {patient.dosesLeft === 0 ? <div className='btn btn-success  fw-semibold align-items-center'><FaCheckCircle /> Completed</div> : <div className='btn btn-warning px-4 fw-semibold '><FaCircleNotch /> {patient.dosesLeft} left</div>}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
}

export default Overview;