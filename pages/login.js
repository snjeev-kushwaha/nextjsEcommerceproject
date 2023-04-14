import React, { useState,useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';
import { AiFillLock } from 'react-icons/ai'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const router = useRouter();
  const [logininfo, setLogininfo] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    if(localStorage.getItem('token')){
      router.push('/')
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogininfo({ ...logininfo, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const configs = {
      "Content-Type": "application/json"
    }
    const api = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/login`, logininfo, configs)
    console.log(api)
    if (api.data.success === "true") {
      localStorage.setItem('token', api.data.token)
      toast.success("You are successfully logged in!")
      setTimeout(() => {
        router.push('/')
      }, 3000)
    }
    else {
      toast.error("Invalid credentials")
    }
    setLogininfo({
      email: '',
      password: ''
    })
  }

  return (
    <>
      <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <ToastContainer
          position="top-left"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="/codeswearcircle.png"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <Link href={'/signup'} className="font-medium text-pink-600 hover:text-pink-500">
                Signup
              </Link>
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  onChange={handleChange}
                  value={logininfo.email}
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  onChange={handleChange}
                  value={logininfo.password}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link href={'/forgot'} className="font-medium text-pink-600 hover:text-pink-500">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <AiFillLock className="h-5 w-5 text-pink-500 group-hover:text-pink-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login