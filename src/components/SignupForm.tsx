'use client'
import { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { toast, Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
const SignupForm = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // You can add your signup logic here
    try {
      const response = await axios.post('/api/users/signup', formData)
      console.log('sign success', response.data)

      if (response.status === 200) {
        router.push('/login')
        toast.success('User created successfully')
        const form = e.target as HTMLFormElement
        form.reset()
      }
      if (response.status === 400) {
        toast.error('user already exist')
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  return (
    <div className='p-6 w-full max-w-md bg-gray-200 border rounded-lg shadow-lg mx-auto'>
      <h2 className='text-2xl font-bold mb-4'>Sign Up</h2>
      <form onSubmit={handleSubmit} className='space-y-4 w-full'>
        <Toaster />
        <div>
          <label htmlFor='username' className='block'>
            Username
          </label>
          <input
            type='text'
            id='username'
            name='username'
            value={formData.username}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded px-3 py-2'
            required
          />
        </div>
        <div>
          <label htmlFor='email' className='block'>
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded px-3 py-2'
            required
          />
        </div>
        <div>
          <label htmlFor='password' className='block'>
            Password
          </label>
          <input
            type='password'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded px-3 py-2'
            required
          />
        </div>
        <button
          type='submit'
          className='w-full bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600'
        >
          Sign Up
        </button>
      </form>
      <div className='mt-4 text-right'>
        <Link href='/login'>
          {' '}
          <span>Already have an account? </span>
          <span className='text-blue-500 hover:underline'>Log In</span>
        </Link>
      </div>
    </div>
  )
}

export default SignupForm
