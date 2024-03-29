import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiFillLock } from 'react-icons/ai';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Signup = () => {
  const router = useRouter()
  const [userinfo, setUserinfo] = useState({
    name: '',
    email: '',
    password: '',
  })

  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/')
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserinfo({ ...userinfo, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const configs = {
      "Content-Type": "application/json"
    }
    let api = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, userinfo, configs)
    if (api.data.success === "success") {
      toast.success("Your account has been created")
    } else {
      toast.error("Please fill valid data")
    }
    setUserinfo({
      name: '',
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
              className="mx-auto h-12 w-auto mt-3"
              src="/codeswearcircle.png"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign up for an account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <Link href={'/login'} className="font-medium text-pink-600 hover:text-pink-500">
                Login
              </Link>
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6" method="POST">
            <div className="space-y-5 rounded-md shadow-sm">
              <div>
                <input
                  id="name"
                  name="name"
                  onChange={handleChange}
                  value={userinfo.name}
                  type="text"
                  autoComplete="name"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                  placeholder="Enter you name"
                />
              </div>
              <div>
                <input
                  id="email"
                  name="email"
                  onChange={handleChange}
                  value={userinfo.email}
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  onChange={handleChange}
                  value={userinfo.password}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group flex w-full justify-center rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup