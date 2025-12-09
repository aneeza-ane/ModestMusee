import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userContact } from "../../Service/api";


const contactSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(5, { message: "Message must be at least 5 characters" }),
});

function ContactUs() {
 
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
  const res = await userContact(data);
  console.log(res.data);
  };

  return (
    <>
      <Navigation />

      <div className={styles.contactContainer}>
        <h2>Contact Us</h2>
        <p className={styles.intro}>
          Have a question or feedback? We'd love to hear from you!
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.contactForm}>
          <div className={styles.inputGroup}>
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              {...register("name")}
            />
            {errors.name && (
              <p className={styles.error}>{errors.name.message}</p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label>Message</label>
            <textarea
              placeholder="Write your message..."
              {...register("message")}
            ></textarea>
            {errors.message && (
              <p className={styles.error}>{errors.message.message}</p>
            )}
          </div>

          <button type="submit" className={styles.submitBtn}>
            Send Message
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default ContactUs;
