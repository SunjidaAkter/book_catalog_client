import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { createUser, setError } from "../redux/features/user/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { usePostStatusMutation } from "../redux/features/book/bookApi";

interface SignupFormInputs {
  email: string;
  password: string;
}

export function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>();
  const { user, error, isLoading } = useAppSelector((state) => state.user);
  const [postStatus] = usePostStatusMutation();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";
  const { status } = useAppSelector((state) => state.book);
  const onSubmit = (data: SignupFormInputs) => {
    dispatch(createUser({ email: data.email, password: data.password }));
    console.log(!isLoading && error);
  };
  useEffect(() => {
    if (user.email && !isLoading) {
      navigate(from, { replace: true });
      Swal.fire({
        title: "Signed up successfully!",
        icon: "success",
        confirmButtonText: "Cool!",
        confirmButtonColor: "#72865a",
      });
      const options = {
        data: { readStatus: [{ user: user.email, status: status }] },
      };
      postStatus(options);
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
        {/* <div className="grid gap-2">
          <div className="grid gap-1"> */}
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
            autoComplete="email"
            autoCorrect="off"
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
            autoCapitalize="none"
            autoCorrect="off"
            {...register("password", { required: "Password is required" })}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.password && <p>{errors.password.message}</p>}
          {/* <p className={error ? "text-red-800" : "text-green-600"}>
            {error ? error : ""}
          </p> */}
          <button className="mt-7 btn btn-successS">
            {isLoading ? "Loading..." : "Signup With Email"}
          </button>
        </div>
      </form>
    </div>
  );
}
