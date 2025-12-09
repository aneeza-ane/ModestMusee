import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "../Styles/AdminLogin.module.css";
import { adminLogin } from "../../Service/api";
import { useNavigate } from "react-router-dom";


const loginSchema = z.object({
  email: z.string({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

function AdminLogin() {
  const nav = useNavigate();
  const {register, handleSubmit, formState: { errors },} = useForm({resolver: zodResolver(loginSchema),});

  const onSubmit = async (data) => {
  const res = await adminLogin(data);
  console.log(res.data);
  localStorage.setItem("token", res.data.token);
  if(res.data.token)
    nav('/admin/dashboard');};
  

  return (
    <div className={styles.container}>

      <div className={styles.card}>

        <div className={styles.left}>
          <h1 className={styles.brand}>Modest Muse</h1>
          <p className={styles.tagline}>Admin Dashboard Access</p>
        </div>

        <div className={styles.right}>
          <h2 className={styles.title}>Welcome Back</h2>
          <p className={styles.subtitle}>Sign in to continue managing your store</p>

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputGroup}>
              <label>Email</label>
              <input
                type="email"
                placeholder="admin@example.com"
                {...register("email")}
              />
              {errors.email && <p className={styles.error}>{errors.email.message}</p>}
            </div>

            <div className={styles.inputGroup}>
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                {...register("password")}
              />
              {errors.password && <p className={styles.error}>{errors.password.message}</p>}
            </div>
      
            <button type="submit" className={styles.loginBtn}>
              Login
            </button>

            <p className={styles.forgot}>
              Forgot password? <a href="#">Reset</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;