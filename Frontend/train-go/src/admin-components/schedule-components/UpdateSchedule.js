import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';

export default function UpdateSchedule(props) {
    let Urlparameters = useParams()
    let scheduleId = Urlparameters.scheduleId
    let [schedule, setSchedule] = useState(null)

    const { register, handleSubmit, formState } = useForm()
    const navigateTo = useNavigate()

    //get the schedule
 const getScheduleById = async () => {
    let response = await fetch(`http://localhost:8080/schedules/${scheduleId}`, { method: "GET" })
    let responseObject = await response.json()
    setSchedule(responseObject.data)
  }
   useEffect(()=>{
        getScheduleById()
    },[] )

  ///console.log("Schedule data"+schedule.travelDate);

    const collectFormData = async (formData) => {
        console.log('Train Data:', formData)

        let response = await fetch(`http://localhost:8080/schedules/${scheduleId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })

        const responseData = await response.json()
        console.log(formData);
      //  navigate(`/admin/manage-schedules/view/${schedule.train.id}`)

            
    Swal.fire({
      title: 'Updated!',
      text: 'Schedule Updated successfully.',
      icon: 'success',
      timer: 700,
      showConfirmButton: false
    })

    setTimeout(() => {
      navigateTo(`/admin/manage-schedules/view/${schedule.train.id}`)
    }, 700)
    }

    
   
    return (
    <div>
    {schedule &&
   
    <div className="mt-3 d-flex flex-column align-items-center"> <br /> <br />
            <h3>Update Schedule</h3>
            <h5>{schedule.train.trainNumber}-{schedule.train.trainName}</h5>
            <form className="w-50 mt-4" onSubmit={handleSubmit(collectFormData)}>


                <div className="mb-3">
                    <input
                        type="date"
                        className="form-control"
                        defaultValue={schedule.travelDate}
                        {...register('travelDate', { required: true })}
                    />
                    <div className="form-text text-danger text-center">
                        {formState.errors && formState.errors.travelDate && formState.errors.travelDate.type == "required" && 'Train travelDate is required'}
                    </div>
                </div>


                <div className="mb-3">
                    <input type="time" className="form-control" defaultValue={schedule.departureTime}
                        {...register('departureTime', { required: true })}
                    />
                    <div className="form-text text-danger text-center">
                        {formState.errors && formState.errors.departureTime && formState.errors.departureTime.type === 'required' && 'Train Departure Time is required'}
                    </div>
                </div>


                <div className="mb-3">
                    <input type="time" className="form-control" defaultValue={schedule.arrivalTime}
                        {...register('arrivalTime', { required: true })}
                    />
                    <div className="form-text text-danger text-center">
                        {formState.errors && formState.errors.arrivalTime && formState.errors.arrivalTime.type === 'required' && 'Train Arrival Time is required'}
                    </div>
                </div>

                <div className="mb-3">
                    <input type="number" className="form-control" defaultValue={schedule.baseFare}
                        {...register('baseFare', { required: true, min: 100 })}
                    />
                    <div className="form-text text-danger text-center">
                        {formState.errors && formState.errors.baseFare && formState.errors.baseFare.type === 'required' && 'Train baseFare is required'}
                        {formState.errors && formState.errors.baseFare && formState.errors.baseFare.type === 'min' && 'Train baseFare must be greater than 100'}
                    </div>
                </div>


                <button type="submit" className="btn btn-primary w-100">Submit</button>
            </form>
        </div>}
    </div>  
  )
}
