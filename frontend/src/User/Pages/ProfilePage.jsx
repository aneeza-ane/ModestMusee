import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import styles from "../Styles/ProfilePage.module.css";
import Navigation from "../Components/Navigation"
import Footer from "../Components/Footer"

// Zod schema
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\d{10,15}$/, "Phone number must be 10-15 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
});

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState(null);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(profileSchema),
  });

  const getToken = () => localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getToken();
        const res = await axios.get("http://localhost:5000/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data);
        reset(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch profile. Please login again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [reset]);

  const onSubmit = async (data) => {
    try {
      const token = getToken();
      const res = await axios.put("http://localhost:5000/user/profile", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(res.data);
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    }
  };

  if (loading) return <p className={styles.loading}>Loading...</p>;

  return (<>
  <Navigation/>
    <div className={styles.container}>
      <h2 className={styles.title}>My Profile</h2>

      {!editing ? (
        <div className={styles.profileCard}>
          <div className={styles.row}><span>Name:</span> <span>{userData.name}</span></div>
          <div className={styles.row}><span>Email:</span> <span>{userData.email}</span></div>
          <div className={styles.row}><span>Phone:</span> <span>{userData.phone}</span></div>
          <div className={styles.row}><span>Address:</span> <span>{userData.address}</span></div>
          <button className={styles.editBtn} onClick={() => setEditing(true)}>Edit Profile</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Name</label>
            <input type="text" {...register("name")} />
            {errors.name && <p className={styles.error}>{errors.name.message}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label>Email</label>
            <input type="email" {...register("email")} />
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label>Phone Number</label>
            <input type="text" {...register("phone")} />
            {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label>Address</label>
            <textarea {...register("address")} rows={3}></textarea>
            {errors.address && <p className={styles.error}>{errors.address.message}</p>}
          </div>

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Save Changes"}
            </button>
            <button type="button" className={styles.cancelBtn} onClick={() => { reset(userData); setEditing(false); }}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default ProfilePage;