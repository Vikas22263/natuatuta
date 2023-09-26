import axios from "axios";

import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import Swal from 'sweetalert2'
import { useAuth } from "../context/auth";
function Login() {
  const navigate=useNavigate()
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState("")
  const [auth, setAuth] = useAuth();
  

  const handelsubmit=async(e)=>{
    e.preventDefault()
try {
  const response =await axios.post("http://localhost:8080/api/v1/auth/login",{email,password})
  const data=JSON.stringify(response)
  localStorage.setItem('user',data)

  if(response&&response.data.success){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: response.data.message,
      showConfirmButton: false,
      timer: 1700
    })
    setAuth({
      ...auth,
      user:response.data.user
    })
    navigate("/")
  }
} catch (error) {

  Swal.fire({
    position: 'top-end',
    icon: 'warning',
    title: "invalid credentials ",
    showConfirmButton: false,
    timer: 1500
  })
 

}  
  }  
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-20"
            src="https://www.totalitycorp.com/_next/static/media/logo.f83b3df6.webp"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" on onSubmit={handelsubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                 
                  name="email"
                  type="email"
                  value={email}
                  onChange={((e)=>setEmail(e.target.value))}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={((e)=>setPassword(e.target.value))}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
          Don't Have an Account? {" "}
            <Link
              to="/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
            Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
