'use client'
import React, { useEffect, useState } from 'react'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { signUp } from 'next-auth-sanity/client';
import { signIn, useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const defaultData = {
    email: "",
    password: "",
    name: "",
}
const Auth = () => {
    const [formData, setFormData] = useState(defaultData)
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,[name]: value
        })
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          const user = await signUp(formData)
          if (user) {
            toast.success('Success. Please sign in');
          }
        } catch (error) {
           console.log(error);
      toast.error("Something wen't wrong");
    } finally {
      setFormData(defaultData);
    }
        }
    const {data: session} = useSession();
    const router = useRouter();
    useEffect(() => {
      if (session) router.push('/');
    },[router,session])
    const loginHandler = async () => {
      try {
        await signIn();
      } catch (error) {
        console.log(error)
        toast.error("Something wen't wrong");
      }
    }
    const inputStyles = "border border-gray-300 sm:text-sm text-black rounded:lg block w-full p-2.5 focus:outline-none";
  return (
    <section className='container mx-auto'>
        <div className="p-6 space-y-4 md:space-y6 sm:p-8 w-80 md:w-[70%] mx-auto">
            <div className="flex mb-8 flex-col md:flex-row items-center justify-between">
                <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
                    Create Account
                </h1>
                <p>Or</p>
                <span className="inline-flex items-center">
                    <AiFillGithub onClick={loginHandler} className='mr-3 text-4xl cursor-pointer text-black dark:text-white'/>
                    <FcGoogle onClick={loginHandler} className='ml-3 text-4xl cursor-pointer'/>
                </span>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <input onChange={handleInputChange} value={formData.email} id='email' type='email' placeholder='Email' className={inputStyles} required name='email'/>
            <input onChange={handleInputChange} value={formData.name} id='name' type='text' placeholder='nguyen le' className={inputStyles} required name='name'/>
            <input onChange={handleInputChange} value={formData.password} id='password' type='password' placeholder='password' className={inputStyles} required name='password' minLength={6}/>
            <button
            type='submit'
            className='w-full bg-tertiary-dark focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center'
          >
            Sign Up
          </button>
        </form>
        <button onClick={loginHandler} className='text-blue-700 underline'>
          Login
        </button>
        </div>
    </section>
  )
}

export default Auth