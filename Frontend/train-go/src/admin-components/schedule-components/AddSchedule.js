import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

export default function AddSchedule() {

    let urlParameters = useParams()
    let trainId = urlParameters.trainId

    console.log(trainId);
    
    const { register, handleSubmit, formState } = useForm()
    const navigate = useNavigate()

    const collectFormData = async (formData) => {
        console.log('Train Data:', formData)

        let response = await fetch(`http://localhost:8080/schedules/${trainId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })

        const responseData = await response.json()
        console.log(formData);
        navigate('/admin/trains/')
    }


    return (
        <div className="mt-3 d-flex flex-column align-items-center"> <br /> <br />
            <h3>Add New Schedule</h3>
            <form className="w-50 mt-4" onSubmit={handleSubmit(collectFormData)}>


                <div className="mb-3">
                    <input
                        type="date"
                        className="form-control"
                        placeholder="Travel Date"
                        {...register('travelDate', { required: true })}
                    />
                    <div className="form-text text-danger text-center">
                        {formState.errors && formState.errors.travelDate && formState.errors.travelDate.type == "required" && 'Train travelDate is required'}
                    </div>
                </div>


                <div className="mb-3">
                    <input
                        type="time"
                        className="form-control"
                        placeholder="Departure Time"
                        {...register('departureTime', { required: true })}
                    />
                    <div className="form-text text-danger text-center">
                        {formState.errors && formState.errors.departureTime && formState.errors.departureTime.type === 'required' && 'Train Departure Time is required'}
                    </div>
                </div>


                <div className="mb-3">
                    <input
                        type="time"
                        className="form-control"
                        placeholder="Arrival Time"
                        {...register('arrivalTime', { required: true })}
                    />
                    <div className="form-text text-danger text-center">
                        {formState.errors && formState.errors.arrivalTime && formState.errors.arrivalTime.type === 'required' && 'Train Arrival Time is required'}
                    </div>
                </div>

                <div className="mb-3">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Base Fare"
                        {...register('baseFare', { required: true, min: 100 })}
                    />
                    <div className="form-text text-danger text-center">
                        {formState.errors && formState.errors.baseFare && formState.errors.baseFare.type === 'required' && 'Train baseFare is required'}
                        {formState.errors && formState.errors.baseFare && formState.errors.baseFare.type === 'min' && 'Train baseFare must be greater than 100'}
                    </div>
                </div>


                <button type="submit" className="btn btn-primary w-100">Submit</button>
            </form>
        </div>
    )
}
