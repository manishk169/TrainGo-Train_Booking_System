import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

export default function Login() {
   let {isLogin, setIsLogin, user, setUser} = useContext(AuthContext);
    const { register, handleSubmit, formState } = useForm();
    const navigateTo = useNavigate();
    let [message, setMessage] = useState(null);

    const handleLoginForm = async (formData) => {
        console.log("Login Form data :", formData);
        let response = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        let responseObject = await response.json();
        console.log(responseObject.data);

        if(responseObject.data != null)
        {
          setIsLogin(true)
          setUser(responseObject.data)
          navigateTo("/")
        }
        else{
          setMessage(responseObject.message)
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center mt-5 pt-5">
            <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '500px' }}>
                <h3 className="text-center mb-4">Login</h3>

                {message && (
                    <div className="alert alert-warning text-center">
                        {message}
                    </div>
                )}
                <form onSubmit={handleSubmit(handleLoginForm)}>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your Email"
                            {...register('email', {
                                required: true,
                                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }
                            })}
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
                            {...register('password', { required: true })}
                        />
                        <div className="form-text text-danger text-center">
                            {formState.errors && formState.errors.password && formState.errors.password.type == "required" && 'Password is required'}
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
            </div>
        </div>
    );
}
