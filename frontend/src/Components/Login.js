import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import http from ".././http-common";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import useAuth from "../hooks/useAuth";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Please enter your email address" })
    .email({ message: " Invalid email" }),
  password: z
    .string()
    .min(1, { message: "Please enter your password" })
    .min(8, { message: "Please enter a valid password" }),
});

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });
  const { setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    try {
      await login(data);
    } catch (err) {
      console.log(`Error trying to login: ${err}`);
    }
  };

  const login = async (data) => {
    let user = data.email;
    let password = data.password;
    try {
      const response = await http.post("/auth", data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      const accessToken = response?.data?.accessToken;
      setAuth({ user: user, password, accessToken });
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <div className="Login">
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="login-header">Login to Roast Logger</h1>
        {/* register your input into the hook by invoking the "register" function */}
        <div className="lf-item">
          <input
            className="place-holder-text auth-input"
            placeholder="email"
            type="email"
            {...register("email")}
            autoFocus
          />
          {errors["email"] && (
            <span className="error-message">{errors["email"].message}</span>
          )}
        </div>
        {/* include validation with required or other standard HTML validation rules */}
        <div className="lf-item">
          <input
            className="place-holder-text auth-input"
            type="password"
            placeholder="password"
            {...register("password")}
          />
          {/* errors will return when field validation fails  */}
          {errors["password"] && (
            <span className="error-message">{errors["password"].message}</span>
          )}
        </div>
        <div className="lf-item checkbox">
          <label htmlFor="">Remember me: </label>
          <input
            className="lf-item"
            type="checkbox"
            checked={persist}
            onChange={togglePersist}
          />
        </div>
        <input className="primary-authBtn" type="submit" value="Login" />
        <hr />
        <span>
          Don't have an account?{" "}
          <Link to="/signup" className="">
            Sign Up!
          </Link>
        </span>
      </form>
    </div>
  );
}
export default Login;
