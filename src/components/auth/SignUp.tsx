import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { createUserAsync } from './authSlice';


type FormData = {
  email: string;
  password: string;
  confirm_password: string;
};

const Signup = () => {

  const { handleSubmit, register, formState: { errors } } = useForm<FormData>()

  const dispatch=useDispatch<AppDispatch>()

  // const submitHandler=(e)=>{
  //   e.preventDefault()
  //   console.log("loda");
    
  //   handleSubmit(data=>{
  //     const userData={
  //       email:data.email,
  //       password:data.password
  //     }
  //     console.log(userData);
      
  //     dispatch(createUserAsync(userData))
  //   })
  // }

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
            Create an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form noValidate className="space-y-6" onSubmit={handleSubmit(data=>{
            console.log(data);
            dispatch(createUserAsync({email:data.email,password:data.password}))
          })}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email",{required:'email is required',pattern:{value:/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,message:"enter a valid email"}})}
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <p className="text-red-500">{errors?.email?.message}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password", {
                    required: 'password is required', pattern: {
                      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                      message: `- at least 8 characters
                  - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
                  - Can contain special characters`}
                  })}
                  type="password"
                 
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                  <p className="text-red-500">{errors?.password?.message}</p>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirm-password"
                  {...register("confirm_password",{required:"confirm password is required",
                   validate:(value,formValues)=>value===formValues.password ||"password not matched"
                })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <p className="text-red-500">{errors?.confirm_password?.message}</p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            alredy have account?{' '}
            <Link to='/signin' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              signin
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Signup