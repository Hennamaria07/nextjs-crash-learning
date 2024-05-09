"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ArrowRight } from 'lucide-react'
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // Initializing useForm hook here
  const navigate = useRouter();
  const onSubmit = async (data: any) => { // removed type annotation as it's not needed in this case
    console.log(data)
    if (data) {
        setLoading(true);
        axios.post('/api/users/login', data)
            .then((res) => {
                setLoading(false)
                toast.success(res.data.message, {duration: 1000});
                setTimeout(()=>{
                  navigate.push('/profile')
                }, 1000)
            })
            .catch((err) => {
                setLoading(false)
                toast.error(err.response.data.error, {duration: 1000})
            })
    }
  };
  return (
    <section className="h-screen">
      <Toaster
        position="top-center"
        reverseOrder={true}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full w-full">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="mx-auto w-full px-5 sm:px-20 lg:px-10">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign in</h2>
            <p className="mt-2 text-sm text-gray-100">
              Don&apos;t have an account?{' '}
              <Link
                href="signup"
                title=""
                className="font-semibold text-white transition-all duration-200 hover:underline"
              >
                Create a free account
              </Link>
            </p>
            <form action="#" method="POST" className="mt-8" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-5">
                <div>
                  <label htmlFor="" className="text-base font-medium text-gray-300">
                    {' '}
                    Email address{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      {...register('email',
                        {
                          pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: "Invalid email format"
                          },
                          required: "Email is required"
                        }
                      )}
                    />
                    {errors?.email && typeof errors.email.message === 'string' && (
                      <p className='text-red-500'>{errors.email.message}</p>)}
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="" className="text-base font-medium text-gray-300">
                      {' '}
                      Password{' '}
                    </label>
                    <Link
                      href="/"
                      title=""
                      className="text-sm font-semibold text-black hover:underline"
                    >
                      {' '}
                      Forgot password?{' '}
                    </Link>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      {...register('password',
                        {
                          pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message: "Password must be at least 8 characters and include at least one lowercase letter, one uppercase letter, one digit, and one special character"
                          },
                          required: "Password is required"
                        })}
                    />
                    {errors?.password && typeof errors.password.message === 'string' && (
                      <p className='text-red-500'>{errors.password.message}</p>)}
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-gray-700 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-gray/80"
                  >
                     {loading ? (<><svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
  </svg>processing...</>) : "Get started"} <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="h-full w-full lg:inline hidden">
          <img
            className="mx-auto h-full w-full rounded-md object-cover"
            src="https://images.unsplash.com/photo-1630673245362-f69d2b93880e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
            alt=""
          />
        </div>
      </div>
    </section>

  )
}

export default LoginPage;
