import React, { FormEvent, useState } from 'react';
import { signUp } from '../services/authService';
import { SignUpForm } from '../utils/Definitions';
import {message} from 'antd'
import { AlreadyLoggedIn } from '../secured_routes/AuthRoute';
import { useNavigate } from 'react-router-dom';
function Register() {
  const nav = useNavigate()
  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData.entries()) as SignUpForm
    // Make an API request to your backend for user registration
    // You can add validation and error handling here

    try {
      const user = await signUp(data)
      nav("/Login")
      message.info("REgistration successful")
    } catch(e:any) {
      message.error(e.detail)
      console.error(e)
    }
    
  }

  return (
    <div className="container">
      <form className="row justify-content-center"  onSubmit={handleRegister}>
        <div className="col-md-4">
          <h2>Register</h2>
          {/*(<div className="form-group">
            <label>Username</label>
            <input
              type="text"
            
              className="form-control"
              placeholder="Username"
            />
  </div>*/}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              required
              name='email'
              className="form-control"
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name='password'
              required
              className="form-control"
              placeholder="Password"
            />
          </div>
          <button className="btn btn-primary">Register</button>
        </div>
      </form>
    </div>
  );
}



export default AlreadyLoggedIn(Register)