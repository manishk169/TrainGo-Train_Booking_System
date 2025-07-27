import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export default function AddTrain() {
  const { register, handleSubmit, watch, formState } = useForm()
  const navigateTo = useNavigate()

  let [stations, setStation] = useState(null)

  const getAllStations = async () => {
    let response = await fetch("http://localhost:8080/stations", { method: "GET" })
    let responseObject = await response.json()
    console.log(responseObject.data)
    setStation(responseObject.data)
    console.log(responseObject.data);

  }

  const collectFormData = async (formData) => {
    console.log('Train Data:', formData)

    const dataToSubmit = {
      trainNumber: formData.trainNumber,
      trainName: formData.trainName,
      trainType: formData.trainType,
      source: { id: parseInt(formData.sourceId) },
      destination: { id: parseInt(formData.destinationId) }
    }

    const response = await fetch("http://localhost:8080/trains", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSubmit)
    })

    const data = await response.json()
    console.log(dataToSubmit);
    
    navigateTo('/admin/trains/')
  }

  useEffect(() => {
    getAllStations()
  }, []);

  return (
    <div className="mt-3 d-flex flex-column align-items-center"> <br /> <br />
      <h3>Add New Train</h3>
      <form className="w-50 mt-4" onSubmit={handleSubmit(collectFormData)}>


        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Train Name"
            {...register('trainName', { required: true, minLength: 3, maxLength: 50 })}
          />
          <div className="form-text text-danger text-center">
            {formState.errors && formState.errors.trainName && formState.errors.trainName.type == "required" && 'Train Name is required'}
            {formState.errors && formState.errors.trainName && formState.errors.trainName.type === 'minLength' && 'Train Name must be at least 10 characters'}
            {formState.errors && formState.errors.trainName && formState.errors.trainName.type === 'maxLength' && 'Train Name must be less than 50 characters'}
          </div>
        </div>


        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Train Number"
            {...register('trainNumber', { required: true, minLength: 5, maxLength: 5 })}
          />
          <div className="form-text text-danger text-center">
            {formState.errors && formState.errors.trainNumber && formState.errors.trainNumber.type === 'required' && 'Train number is required'}
            {formState.errors && formState.errors.trainNumber && formState.errors.trainNumber.type === "minLength"  && 'Train number should not be less than 5 digits'}
            {formState.errors && formState.errors.trainNumber && formState.errors.trainNumber.type ===  "maxLength" && 'Train number must not be greater than 5 digits'}

          </div>
        </div>


        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Train Type (e.g., Express)"
            {...register('trainType', { required: true, minLength: 3, maxLength: 50 })}
          />
          <div className="form-text text-danger text-center">
            {formState.errors && formState.errors.trainType && formState.errors.trainType.type === 'required' && 'Train type is required'}
            {formState.errors && formState.errors.trainType && formState.errors.trainType.type === 'minLength' && 'Train type must be at least 5 characters'}
            {formState.errors && formState.errors.trainType && formState.errors.trainType.type === 'maxLength' && 'Train type must be less than 50 characters'}
          </div>
        </div>

        <div className="mb-3">
          <select className="form-select" {...register('sourceId', { required: true })}>
            <option value="">-- Select Source Station --</option>
            {stations && stations.map(station => (
              <option key={station.id} value={station.id}>
                {station.stationCode} - {station.stationName}
              </option>
            ))}
          </select>
          <div className="form-text text-danger text-center">
            {formState.errors && formState.errors.sourceId && formState.errors.sourceId.type === 'required' && 'Source station is required'}
          </div>
        </div>


        <div className="mb-3">
          <select className="form-select" {...register('destinationId', {
            required: true, validate: (value) => value !== watch('sourceId')  
          })}>
            <option value="">-- Select Destination Station --</option>
            {stations && stations.map(station => (
              <option key={station.id} value={station.id}>
                {station.stationCode} - {station.stationName}
              </option>
            ))}
          </select>
          <div className="form-text text-danger text-center">
            {formState.errors && formState.errors.destinationId && formState.errors.destinationId.type =='required' && 'Destination station is required'}
            {formState.errors && formState.errors.destinationId && formState.errors.destinationId.type =='validate' && 'Destination station should not be same as Source station'}
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100">Add</button>
      </form>
    </div>
  )
}
