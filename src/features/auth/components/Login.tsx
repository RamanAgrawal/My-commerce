import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  loginUserAsync,
  selectAuthStatus,
  selectError,
  selectLoggedInUser,
} from "../authSlice";
import { AppDispatch } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { LoginFormDataI } from "../../../models/Models";
import Button from "../../../components/Button";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormDataI>();
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector(selectError);
  const user = useSelector(selectLoggedInUser);
  const authStatus = useSelector(selectAuthStatus);

  // let route;
  // if (user?.role === 'admin') {
  //   route = <Navigate to={'/admin'} replace={true} />
  // } else {
  //   route = <Navigate to={'/'} replace={true} />
  // }

  // console.log(error);

  return (
    <>
      {user && <Navigate to={"/"} replace={true} />}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="ecommerce.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            noValidate
            className="space-y-6"
            onSubmit={handleSubmit((data) => {
              dispatch(loginUserAsync(data));
            })}
          >
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
                  className="input"
                />
                <p className="text-red-500">{errors.email?.message}</p>
              </div>
            </div>

            <div>
              <div className="flexBetween">
                <label htmlFor="password" className="label">
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-semibold text-primary-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password", {
                    required: "enter your passwoed first",
                  })}
                  type="password"
                  className="input"
                />
                <p className="text-red-500">{errors.password?.message}</p>
                <p className="text-red-500">{error?.message}</p>
              </div>
            </div>

            <Button
              label="Sign in "
              variant="primary"
              loading={authStatus == "loading"}
            />
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              to="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              create account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
