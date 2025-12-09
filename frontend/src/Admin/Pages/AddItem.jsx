import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import styles from "../Styles/AddItem.module.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminAddItem } from "../../Service/api";

// Zod Schema
const itemSchema = z.object({
  title: z.string().min(2, "Title is required"),
  category: z.string().nonempty("Select a category"),
  description: z.string().min(5, "Description too short"),
  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .positive("Price must be positive"),
  quantity: z
    .number({ invalid_type_error: "Quantity must be a number" })
    .int()
    .positive("Must be at least 1"),
  image: z.any().optional(),
});

const AddItem = () => {
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(itemSchema),
  });

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("quantity", data.quantity);

    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    try {
      const res = await adminAddItem(formData);
      alert("Item added successfully!");
      reset();
      setPreview(null);
    } catch (err) {
      console.log(err);
      alert("Error adding item");
    }
  };

  return (
    <div className={styles.layout}>
      <Sidebar />

      <main className={styles.main}>
        <h1 className={styles.pageTitle}>Add New Item</h1>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          
          {/* Title */}
          <div className={styles.formGroup}>
            <label>Title</label>
            <input type="text" placeholder="Enter item title" {...register("title")} />
            {errors.title && <p className={styles.error}>{errors.title.message}</p>}
          </div>

          {/* Category */}
          <div className={styles.formGroup}>
            <label>Category</label>
            <select {...register("category")}>
              <option value="">Select category</option>
              <option value="Abayas">Abayas</option>
              <option value="Hijabs">Hijabs</option>
              <option value="Niqabs">Niqabs</option>
              <option value="Undercaps">Undercaps</option>
              <option value="Gloves">Gloves</option>
             <option value="Scrunchies">Scrunchies</option>
            </select>
            {errors.category && <p className={styles.error}>{errors.category.message}</p>}
          </div>

          {/* Image Upload */}
          <div className={styles.formGroup}>
            <label>Product Image</label>

            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              className={styles.hiddenInput}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setValue("image", file);
                  setPreview(URL.createObjectURL(file));
                }
              }}
            />

            <div className={styles.uploadBox}>
              {preview ? (
                <img src={preview} className={styles.previewImage} alt="Preview" />
              ) : (
                <div className={styles.uploadContent}>
                  <div className={styles.uploadIcon}>🖼</div>
                  <p className={styles.uploadText}>No image uploaded</p>
                </div>
              )}

              <button
                type="button"
                className={styles.uploadButton}
                onClick={() => document.getElementById("imageUpload").click()}
              >
                Upload Image
              </button>
            </div>

            {errors.image && <p className={styles.error}>{errors.image.message}</p>}
          </div>

          {/* Description */}
          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea
              rows="3"
              placeholder="Enter a brief description"
              {...register("description")}
            ></textarea>
            {errors.description && <p className={styles.error}>{errors.description.message}</p>}
          </div>

          {/* Price and Quantity */}
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label>Price (PKR)</label>
              <input
                type="number"
                placeholder="e.g. 2500"
                {...register("price", { valueAsNumber: true })}
              />
              {errors.price && <p className={styles.error}>{errors.price.message}</p>}
            </div>

            <div className={styles.formGroup}>
              <label>Quantity</label>
              <input
                type="number"
                placeholder="e.g. 10"
                {...register("quantity", { valueAsNumber: true })}
              />
              {errors.quantity && <p className={styles.error}>{errors.quantity.message}</p>}
            </div>
          </div>

          <button type="submit" className={styles.btn}>
            ➕ Add Item
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddItem;
