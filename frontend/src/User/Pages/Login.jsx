import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "../Styles/Login.module.css";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../Service/api";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

function Login() {
  const nav = useNavigate();
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

 
  const onSubmit = async (data) => {
  const res = await userLogin(data);
  console.log(res.data);
  localStorage.setItem("token",res.data.token);
  if(res.data.token)
    nav('/');
    
};

  return (
    <div className={styles.loginContainer}>
      <div className={styles.leftHalf}>
        <div className={styles.overlayText}>
          <span className={styles.modest}>MODEST</span>
          <span className={styles.muse}>MUSE</span>
        </div>
      </div>

      <div className={styles.rightHalf}>
        <div className={styles.loginCard}>
          <h2>LOGIN</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputBox}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                {...register("email")}
              />
              {errors.email && (
                <p className={styles.error}>{errors.email.message}</p>
              )}
            </div>

            <div className={styles.inputBox}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && (
                <p className={styles.error}>{errors.password.message}</p>
              )}
            </div>

            <button type="submit" className={styles.btn}>
              LOGIN
            </button>
          </form>

          <a href="/" className={styles.forgot}>
            Forgot Password?
          </a>

          <div className={styles.registerLink}>
            <p>
              Don’t have an account? <a href="/signup">Register</a>
            </p>
          </div>

          <div className={styles.registerLink}>
            <p>
              Login as an Admin? <a href="/admin/login">Admin Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
