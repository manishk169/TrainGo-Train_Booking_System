import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export default function Register() {
    const { register, handleSubmit, watch, formState } = useForm()
    const navigateTo = useNavigate();
    let [message, setMessage] = useState('');

    const collectFormData = async (FormData) => {
        console.log("Register Form data :", FormData);

        // Exclude cnfpassword before sending to backend
        const { cnfpassword, ...userData } = FormData;

        let response = await fetch("http://localhost:8080/register", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        let responseObject = await response.json();
        if (response.ok) {
            setMessage(responseObject.message);
            navigateTo("/login");
        } else {
            setMessage(responseObject.message);
        }

    }

    return (
        <div className="container d-flex justify-content-center align-items-center mt-5 pt-5">
            <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '500px' }}>
                <h3 className="text-center mb-4">Register</h3>
                {message && (
                    <div className="alert alert-warning text-center">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit(collectFormData)}>

                    <div className="mb-3">
                        <input
                            type="text" 
                            className="form-control"
                            placeholder="Enter your Name"
                            {...register('name', { required: true, minLength: 5, maxLength: 30 })}
                        />
                        <div className="form-text text-danger text-center">
                            {formState.errors && formState.errors.name && formState.errors.name.type == "required" && 'Full Name is required'}
                            {formState.errors && formState.errors.name && formState.errors.name.type === 'minLength' && ' Name must be at least 5 characters'}
                            {formState.errors && formState.errors.name && formState.errors.name.type === 'maxLength' && ' Name must be less than 30 characters'}
                        </div>
                    </div>

                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your Email"
                            {...register('email', { required: true, pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ } })}
                        />
                        <div className="form-text text-danger text-center">
                            {formState.errors && formState.errors.email && formState.errors.email.type == "required" && 'Email ID is required'}
                            {formState.errors && formState.errors.email && formState.errors.email.type == "pattern" && 'Invalid Email ID Format! should be in "@mail.com" '}
                        </div>
                    </div>

                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter your Password"
                            {...register('password', { required: true, minLength: 8, pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/ } })}
                        />
                        <div className="form-text text-danger text-center">
                            {formState.errors && formState.errors.password && formState.errors.password.type == "required" && 'Password is required'}
                            {formState.errors && formState.errors.password && formState.errors.password.type == "minLength" && 'Password must be at least 8 characters long'}
                            {formState.errors && formState.errors.password && formState.errors.password.type == "pattern" && 'Password must contain at least one uppercase, one lowercase, and one special character'}

                        </div>
                    </div>

                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm your Password"
                            {...register('cnfpassword', {
                                required: true,
                                validate: (value) => value === watch('password')
                            })}
                        />
                        <div className="form-text text-danger text-center">
                            {formState.errors && formState.errors.cnfpassword && formState.errors.cnfpassword.type == "required" && 'Confirm Password is required'}
                            {formState.errors && formState.errors.cnfpassword && formState.errors.cnfpassword.type == "validate" && 'Confirm Password should be exactly same as Password field'}
                        </div>
                    </div>

                    <div className="mb-3">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Enter your Phone Number"
                            {...register('phone', { required: true, minLength: 10, maxLength: 10 })}
                        />
                        <div className="form-text text-danger text-center">
                            {formState.errors && formState.errors.phone && formState.errors.phone.type == "required" && 'Phone Number is required'}
                            {formState.errors && formState.errors.phone && formState.errors.phone.type == "minLength" && 'Phone Number should be exact 10 digits'}
                            {formState.errors && formState.errors.phone && formState.errors.phone.type == "maxLength" && 'Phone Number should be exact 10 digits'}
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Submit</button>
                </form>
            </div>
        </div>
    );
}
