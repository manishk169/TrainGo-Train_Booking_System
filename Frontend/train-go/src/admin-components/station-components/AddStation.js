import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export default function AddStation() {
  const { register, handleSubmit, formState } = useForm()
  const navigateTo = useNavigate()

  const collectFormData = async (formData) => {
    console.log('Station Data:', formData)

    const response = await fetch("http://localhost:8080/stations", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })

    //const data = await response.json()
    //console.log(formData);
    
    navigateTo('/admin/stations/')
  }

  return (
    <div className="mt-3 d-flex flex-column align-items-center"> <br /> <br />
      <h3>Add New Train</h3>
      <form className="w-50 mt-4" onSubmit={handleSubmit(collectFormData)}>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Station Code"
            {...register('stationCode', { required: true, minLength: 2, maxLength: 10 })}
          />
          <div className="form-text text-danger text-center">
            {formState.errors && formState.errors.stationCode && formState.errors.stationCode.type == "required" && 'Station Code is required'}
            {formState.errors && formState.errors.stationCode && formState.errors.stationCode.type === 'minLength' && 'Station Code must be at least 2 characters'}
            {formState.errors && formState.errors.stationCode && formState.errors.stationCode.type === 'maxLength' && 'Station Code must be less than 10 characters'}
          </div>
        </div>


        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Station Name"
            {...register('stationName', { required: true, minLength: 5, maxLength: 25 })}
          />
          <div className="form-text text-danger text-center">
            {formState.errors && formState.errors.stationName && formState.errors.stationName.type === 'required' && 'stationName is required'}
            {formState.errors && formState.errors.stationName && formState.errors.stationName.type === "minLength"  && 'stationName should not be less than 5 digits'}
            {formState.errors && formState.errors.stationName && formState.errors.stationName.type ===  "maxLength" && 'stationName must not be greater than 25 digits'}

          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100">Add</button>
      </form>
    </div>
  )
}
