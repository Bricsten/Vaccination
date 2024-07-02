import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from "axios"

import Patient from './Components/Patient';
import Modal from 'react-modal'
import styled from 'styled-components';

const StyledModal = styled(Modal)`
  .ReactModal__Content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    max-width: 600px;
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  }
`;

function VaccinatedPeople() {
    const backendUrl = 'http://localhost:4000/api/patients'
    const [patients, setPatients] = useState([]);


    /* GETTING PATIENTS */
    useEffect(() => {
        axios.get(`${backendUrl}?region=${localStorage.getItem('region')}`).then(res => setPatients(res.data)).catch(err => console.log(err))
    }, [])

    /* UPDATING PATIENTS */
    const [editingPatient, setEditingPatient] = useState(null);
    function handleEditPatient(data) {
        setEditingPatient(data)
        setPatientData({
            sn: data.sn,
            name: data.name,
            dateVaccinated: data.dateVaccinated,
            dosesLeft: data.dosesLeft
        })
        setIsModalOpen(true)
    }

    /* DELETING PATIENT */
    const [deletePatient, setDeletePatient] = useState([]);
    const updateDeletePatient = (e, id) => {
        if (e) {
            if (e.target.checked === true) {
                setDeletePatient([...deletePatient, id]);
            } else {
                setDeletePatient(deletePatient.filter(e => e !== id))
            }
        } else {
            if (!deletePatient.includes(id)) {
                axios.delete(`${backendUrl}`, {
                    data: {
                        ids: [id]
                    }
                })
                    .then(response => {
                        console.log(response.data.message);
                        // Remove the successfully deleted IDs from the deletePatient array
                        setDeletePatient(deletePatient.filter(id => !deletePatient.includes(id)));
                        setPatients(patients.filter(e => e._id !== id))
                    })
                    .catch(error => {
                        console.error(error.response.data.message);
                        // Add the IDs that were not found to the deletePatient array
                        setDeletePatient([...deletePatient, ...error.response.data.notFoundIds]);
                    });
            }
        }
    }
    const handleDeletePatient = (data) => {
        axios.delete(`${backendUrl}`, {
            data: {
                ids: deletePatient
            }
        })
            .then(response => {
                console.log(response.data.message);
                // Remove the successfully deleted IDs from the deletePatient array
                setDeletePatient(deletePatient.filter(id => !deletePatient.includes(id)));
                deletePatient.forEach(id => {
                    setPatients(patients.filter(e => e._id !== id))
                })
            })
            .catch(error => {
                console.error(error.response.data.message);
                // Add the IDs that were not found to the deletePatient array
                setDeletePatient([...deletePatient, ...error.response.data.notFoundIds]);
            });
    }

    /* SELECT */
    const selectAllPatient = (e) => {
        if (e.target.checked) {
            const newDeletePatient = patients.map(patient => patient._id);
            setDeletePatient(newDeletePatient);
        } else {
            setDeletePatient([]);
        }
    };

    /* SEARCH */
    const [search, setSearch] = useState('');
    const handleSearch = (e) => {
        setSearch(e.target.value);
        axios.get(`${backendUrl}?search=${e.target.value}&region=${localStorage.getItem('region')}`)
            .then(res => {
                console.log(res.data)
                setPatients(res.data)
            })
            .catch(err => console.log(err));
    }

    /*  MODAL */
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [patientData, setPatientData] = useState({
        sn: '',
        name: '',
        dateVaccinated: '',
        dosesLeft: 2,
    });
    const handleModalSubmit = (e) => {
        e.preventDefault();
        if (editingPatient) {
            axios.put(`${backendUrl}/${editingPatient._id}`, patientData).then(res => {
                const updatedPatients = patients.map(patient => {
                    if (patient._id === editingPatient._id) {
                        return res.data;
                    }
                    return patient;
                });
                setPatients(updatedPatients);
                setEditingPatient(null);
                setIsModalOpen(false);
            }).catch(err => console.log(err))
        } else {
            axios.post(backendUrl, { ...patientData, region: localStorage.getItem('region') }).then(res => {
                setPatients([...patients, res.data]);
                setIsModalOpen(false);
            }).catch(err => console.log(err))
        }
    }
    const isFormValid = () => {
        return (
            patientData.sn.trim() !== '' &&
            patientData.name.trim() !== '' &&
            patientData.dateVaccinated.trim() !== ''
        );
    };
    return (
        <>
            <div className=' pt-1 px-4  pt-lg-5'>
                <div className='fs-2 fw-bold'>
                    Vaccinated List
                </div>

                <div className='mt-4 border border-1 border-secondary rounded-2 pt-5 pb-5 shadow-sm container-fluid'>
                    <div className=' w-50 ms-auto pe-3'>
                        <input placeholder='Search a patient' value={search} onChange={handleSearch} className='form-control py-2' />
                    </div>

                    <div className='d-flex justify-content-between mt-5 px-3'>
                        <button className='btn btn-success' onClick={() => {
                            setPatientData({
                                sn: '',
                                name: '',
                                dateVaccinated: '',
                                dosesLeft: 2,
                            }); setIsModalOpen(true)
                        }}>Add a patient</button>
                        <button
                            onClick={handleDeletePatient}
                            className={`btn btn-danger ${deletePatient.length === 0 ? 'disabled' : ''}`}
                        >
                            Delete Selected
                        </button>
                    </div>
                    <div className='row fw-bold mt-4 border border-0 border-secondary border-bottom p-2 pt-3 shadow-sm mb-3 bg-secondary bg-opacity-10 rounded-top-'>
                        <div className='col-1'><input type='checkbox' onChange={e => { selectAllPatient(e) }} /></div>
                        <div className='col-2'>SN</div>
                        <div className='col-2'>NAME</div>
                        <div className='col-2'>DATE VACCINATED</div>
                        <div className='col-2'>DOSES LEFT</div>
                        <div className='col-2'>ACTION</div>
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            {
                                patients.map((e, index) => {
                                    return (
                                        <Patient key={e._id} sn={index + 1} data={e} handleEditPatient={handleEditPatient} deletePatient={deletePatient} updateDeletePatient={updateDeletePatient} />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <StyledModal
                appElement={document.getElementById('root')}
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Add Patient"
            >
                <h2>{editingPatient ? 'Edit' : 'Add'} Patient</h2>
                <form
                    className='flex flex-column'
                    onSubmit={handleModalSubmit}
                >
                    <div>
                        <label className='w-full '>
                            SN (Serial Number):
                        </label>
                        <input
                            type="text"
                            className='form-control'
                            value={patientData.sn}
                            onChange={(e) =>
                                setPatientData({ ...patientData, sn: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label>
                            Name:
                        </label>
                        <input
                            type="text"
                            className='form-control'
                            value={patientData.name}
                            onChange={(e) =>
                                setPatientData({ ...patientData, name: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label>
                            Date Vaccinated:
                        </label>
                        <input
                            type="date"
                            className='form-control'
                            value={patientData.dateVaccinated}
                            onChange={(e) =>
                                setPatientData({ ...patientData, dateVaccinated: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label>Doses Left:</label>
                        <select
                            className="form-control"
                            value={patientData.dosesLeft}
                            onChange={(e) => { setPatientData({ ...patientData, dosesLeft: e.target.value }) }}
                        >
                            <option value="1">1 left</option>
                            <option value="2">2 left</option>
                            <option value="0">Completed</option>
                        </select>
                    </div>
                    <div className=' d-flex justify-content-between mt-3'>
                        <button disabled={!isFormValid()} className={'btn btn-success ' + (!isFormValid() ? 'disabled' : '')} type="submit">Save</button>
                        <button className='btn btn-danger' onClick={() => setIsModalOpen(false)}>Cancel</button>
                    </div>
                </form>
            </StyledModal>
        </>
    )
}
export default VaccinatedPeople