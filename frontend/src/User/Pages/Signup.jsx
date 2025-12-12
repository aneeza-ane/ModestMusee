import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "../Styles/Signup.module.css";
import { userSignup } from "../../Service/api";

const signupSchema = z
  .object({
    name: z.string().min(2, { message: "Full name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(10, { message: "Phone number is required" }),
    address: z.string().min(5, { message: "Address is required" }),
    password: z.string().min(6, { message: "Min 6 characters" }),
    confirm: z.string().min(6, { message: "Confirm your password" }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    const res = await userSignup(data);
    console.log(res);
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupWrapper}>

        {/* Header */}
        <div className={styles.signupHeader}>
          <h2>Create Your Account </h2>
        </div>

        {/* Form area */}
        <div className={styles.signupBody}>
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className={styles.formGrid}>

              <div className={styles.inputBox}>
                <label>Full Name</label>
                <input type="text" {...register("name")} />
                {errors.name && <p className={styles.error}>{errors.name.message}</p>}
              </div>

              <div className={styles.inputBox}>
                <label>Phone</label>
                <input type="text" {...register("phone")} />
                {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
              </div>

              <div className={`${styles.inputBox} ${styles.fullWidth}`}>
                <label>Address</label>
                <input type="text" {...register("address")} />
                {errors.address && <p className={styles.error}>{errors.address.message}</p>}
              </div>

              <div className={`${styles.inputBox} ${styles.fullWidth}`}>
                <label>Email</label>
                <input type="email" {...register("email")} />
                {errors.email && <p className={styles.error}>{errors.email.message}</p>}
              </div>

              <div className={styles.inputBox}>
                <label>Password</label>
                <input type="password" {...register("password")} />
                {errors.password && <p className={styles.error}>{errors.password.message}</p>}
              </div>

              <div className={styles.inputBox}>
                <label>Confirm Password</label>
                <input type="password" {...register("confirm")} />
                {errors.confirm && <p className={styles.error}>{errors.confirm.message}</p>}
              </div>

            </div>

            <button type="submit" className={styles.btn}>
              Create Account
            </button>

          </form>

          <div className={styles.bottomText}>
            Have an account? <a href="/login">Log in here</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;