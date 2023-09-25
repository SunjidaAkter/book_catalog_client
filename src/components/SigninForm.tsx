import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser, setError } from "../redux/features/user/userSlice";
import { useEffect } from "react";
import Swal from "sweetalert2";

interface LoginFormInputs {
  email: string;
  password: string;
}
export function SigninForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const dispatch = useAppDispatch();
  const { user, isLoading, error } = useAppSelector((state) => state.user);
  console.log(error);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";
  const onSubmit = (data: LoginFormInputs) => {
    console.log(data);
    dispatch(loginUser({ email: data.email, password: data.password }));
  };
  useEffect(() => {
    if (user.email && !isLoading) {
      navigate(from, { replace: true });
      Swal.fire({
        title: "Logged in successfully!",
        icon: "success",
        confirmButtonText: "Cool!",
        confirmButtonColor: "#72865a",
      });
    } else if (!isLoading && error) {
      Swal.fire({
        title: `${error}`,
        icon: "error",
        confirmButtonText: "Oops!",
        confirmButtonColor: "#72865a",
      });
      dispatch(setError(null));
    }
  }, [user.email, isLoading, navigate, from, error]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            required
            id="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            {...register("email", { required: "Email is required" })}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            required
            id="password"
            placeholder="your password"
            type="password"
            {...register("password", { required: "Password is required" })}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.password && <p>{errors.password.message}</p>}
          {/* <span
            className={isLoading ? "loading-dots loading-sm" : "text-green-600"}
          ></span> */}
          <button className="mt-7 btn btn-successS">
            {isLoading ? "Loading..." : "Signin With Email"}
          </button>
        </div>
      </form>
    </div>
  );
}
