import {Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { LoginFormDataI } from '../../../models/Models';

const ForgotPassword = () => {
const {register,handleSubmit,formState:{errors}}=useForm<LoginFormDataI>()

  return (
    <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form noValidate
           className="space-y-6"onSubmit={handleSubmit(data=>console.log(data)
           )}>
            <div>
              <label htmlFor="email" className="label">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email",{required:"please enter a valid email",pattern:{value:/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,message:'invalid email'}})}
                  type="email"
                  autoComplete="email"
                  
                  className="input"
                />
                <p className="text-red-500">{errors.email?.message}</p>
              </div>
            </div>

           
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Send mail
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Send me back to{' '}
            <Link to="/signin" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          Login
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword;