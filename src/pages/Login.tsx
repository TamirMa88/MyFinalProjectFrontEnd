import React, { FormEvent, useState } from 'react';
import { SignInForm } from '../utils/Definitions';
import { signIn } from '../services/authService';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AlreadyLoggedIn } from '../secured_routes/AuthRoute';
import { useUser } from '../context/UserContext';

function Login() {


  const nav = useNavigate()
  const {setToken} = useUser()
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData.entries()) as SignInForm
    // Make an API request to your backend for user registration
    // You can add validation and error handling here

    try {
      const {access_token} = await signIn(data)
      setToken(access_token)
      message.success("Welcome")
      nav("/")
    } catch(e:any) {
      message.error(e.detail)
    }
    
  }

  return (
    <div className="container">
      <form className="row justify-content-center" onSubmit={handleLogin}>
        <div className="col-md-4">
          <h2>Login</h2>
          <div className="form-group">
            <label>Email</label>
            <input
              required
              type="email"
              className="form-control"
              placeholder="Email"
              name='email'
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              required
              name='password'
              className="form-control"
              placeholder="Password"
            />
          </div>
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  );
}

export default AlreadyLoggedIn(Login)