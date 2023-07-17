import { useForm } from "react-hook-form";

interface SignupFormInputs {
  email: string;
  password: string;
}

export function SigninForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>();
  //   const dispatch = useAppDispatch();
  const onSubmit = (data: SignupFormInputs) => {
    console.log(data);
    // dispatch(createUser({ email: data.email, password: data.password }));
  };

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
            id="password"
            placeholder="your password"
            type="password"
            autoCapitalize="none"
            autoCorrect="off"
            {...register("password", { required: "Password is required" })}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.password && <p>{errors.password.message}</p>}
          <button className="mt-7 btn btn-successS">Signin With Email</button>
        </div>
        {/* </div> */}
        {/* </div> */}
      </form>
    </div>
  );
}
