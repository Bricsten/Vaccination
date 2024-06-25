import React from 'react';
import { FaPencilAlt, FaTrashAlt, FaCheckCircle, FaCircleNotch } from 'react-icons/fa';

function Patient({ data, sn, handleEditPatient, deletePatient, updateDeletePatient }) {
    const date = new Date(data.dateVaccinated);
    return (
        <div className='row border border-0 border-secondary border-bottom border-opacity-50 p-2 shadow-sm mb-3'>
            <div className='col-1'>
                <input
                    type='checkbox'
                    checked={deletePatient.includes(data._id)}
                    onChange={(e) => updateDeletePatient(e, data._id)}
                />
            </div>
            <div className='col-2'>{data.sn}</div>
            <div className='col-2'>{data.name}</div>
            <div className='col-2'>{date.toLocaleDateString()}</div>
            <div className='col-2'>{data.dosesLeft === 0 ? <div className='btn btn-success  fw-semibold align-items-center'><FaCheckCircle /> Completed</div> : <div className='btn btn-warning px-4 fw-semibold '><FaCircleNotch /> {data.dosesLeft} left</div>}</div>
            <div className='col-2 d-flex justify-content-around'>
                <FaPencilAlt
                    cursor={'pointer'}
                    color='#198754'
                    onClick={() => handleEditPatient(data)}
                />
                <FaTrashAlt
                    color='red'
                    cursor={'pointer'}
                    onClick={() => updateDeletePatient(undefined, data._id)}
                />
            </div>
        </div>
    );
}

export default Patient;