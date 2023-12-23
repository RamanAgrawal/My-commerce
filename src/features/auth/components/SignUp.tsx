import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/store";
import {
  createUserAsync,
  selectAuthStatus,
  selectError,
  selectLoggedInUser,
} from "../authSlice";
import { SignupFormDataI } from "../../../models/Models";
import Button from "../../../components/Button";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { passWordPattern } from "../../../constents";

const Signup = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignupFormDataI>();
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector(selectError);
  const authStatus = useSelector(selectAuthStatus);
  const [showPassword, setShowPassword] = useState(false);


  return (
    <>
      {user && <Navigate to={"/"} replace={true} />}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="/ecommerce.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            noValidate
            className="space-y-6"
            onSubmit={handleSubmit((data) => {
              dispatch(
                createUserAsync({
                  name: data.name,
                  email: data.email,
                  password: data.password,
                  addresses: [],
                  role: "user",
                })
              );
            })}
          >
            <div>
              <label htmlFor="name" className="label">
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="text"
                  {...register("name", { required: "please enter Your name" })}
                  type="text"
                  required
                  className="input"
                />
                <p className="text-red-500">{errors?.name?.message}</p>
              </div>
            </div>
            <div>
              <label htmlFor="email" className="label">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", {
                    required: "please enter a valid email",
                    pattern: {
                      value: /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi,
                      message: "invalid email",
                    },
                  })}
                  type="email"
                  autoComplete="email"
                  required
                  className="input"
                />
                <p className="text-red-500">{errors?.email?.message}</p>
                <p className="text-red-500">{error?.message}</p>
              </div>
            </div>

            <div>
              <div className="flexBetween">
                <label htmlFor="password" className="label">
                  Password
                </label>
              </div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  {...register("password", {
                    required: "password is required",
                    pattern: passWordPattern,
                  })}
                  type={showPassword ? "text" : "password"}
                  className="input"
                />
                <span
                  aria-label="show password"
                  className="h-1 w-1 absolute top-2 right-6 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-6 h-6" />
                  ) : (
                    <EyeIcon className="w-6 h-6" />
                  )}
                </span>
                <p className="text-red-500">{errors?.password?.message}</p>
              </div>
            </div>
            <div>
              <div className="flexBetween">
                <label htmlFor="password" className="label">
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirm-password"
                  {...register("confirm_password", {
                    required: "confirm password is required",
                    validate: (value, formValues) =>
                      value === formValues.password || "password not matched",
                  })}
                  type="text"
                  className="input"
                />
                <p className="text-red-500">
                  {errors?.confirm_password?.message}
                </p>
              </div>
            </div>

            <Button
              label="Sign up "
              variant="primary"
              loading={authStatus == "loading"}
            />
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            alredy have account?{" "}
            <Link
              to="/signin"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              signin
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
