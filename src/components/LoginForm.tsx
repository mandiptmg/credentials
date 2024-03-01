'use client'
import { useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'react-hot-toast'
const LoginForm = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
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
    const { email, password } = formData
    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      router.replace('/')
    } catch (error) {
      console.log(error)
    }
    // Handle form submission here, for example, send formData to an API endpoint
    console.log(formData)
  }

  return (
    <div className='p-6 w-full max-w-md bg-gray-200 border rounded-lg shadow-lg mx-auto'>
      <h2 className='text-2xl font-bold mb-4'>Log In</h2>
      <Toaster />
      <form onSubmit={handleSubmit} className='space-y-4 w-full'>
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
          Log In
        </button>
      </form>
      <div className='mt-4 text-right'>
        <Link href='/signup'>
          {' '}
          <span>Don&apos;t have an account? </span>
          <span className='text-blue-500 hover:underline'>Sign Up</span>
        </Link>
      </div>
    </div>
  )
}

export default LoginForm
