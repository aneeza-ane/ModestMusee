import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Sidebar from "../Components/Sidebar";
import styles from "../Styles/UpdateItem.module.css";
import { useNavigate } from "react-router-dom";
import { adminUpdateItem } from "../../Service/api";
import { ProductContext } from "../Context/ProductContext.jsx";

const updateItemSchema = z.object({
  title: z.string().min(2),
  category: z.string().min(1),
  description: z.string().min(5),
  price: z.number().min(1),
  quantity: z.number().min(1),
  image: z.any().optional(),
});

function UpdateItem() {
  const { selectedProduct } = useContext(ProductContext);
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const { register, handleSubmit, setValue, watch, formState: { errors } } =
    useForm({
      resolver: zodResolver(updateItemSchema),
    });

  const watchedImage = watch("image");

  // Redirect if no product selected
  useEffect(() => {
    if (!selectedProduct) {
      alert("No product selected");
      navigate("/admin/viewItem");
      return;
    }

    setValue("title", selectedProduct.title);
    setValue("category", selectedProduct.category);
    setValue("description", selectedProduct.description);
    setValue("price", selectedProduct.price);
    setValue("quantity", selectedProduct.quantity);

    if (selectedProduct.image) {
      setPreview(`http://localhost:5000/uploads/${selectedProduct.image}`);
    }
  }, [selectedProduct]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("quantity", data.quantity);

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    try {
      await adminUpdateItem(selectedProduct._id, formData);
      alert("Product updated successfully!");
      navigate("/admin/viewItem");
    } catch (err) {
      alert("Error updating product");
    }
  };

  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>
        <h1 className={styles.pageTitle}>Update Item</h1>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.imageBox}>
            {preview ? (
              <img src={preview} alt="Preview" className={styles.previewImage} />
            ) : (
              <div className={styles.placeholder}>No image</div>
            )}

            <input
              type="file"
              accept="image/*"
              {...register("image")}
              style={{ display: "none" }}
              id="imageUpload"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setPreview(URL.createObjectURL(e.target.files[0]));
                }
              }}
            />

            <label htmlFor="imageUpload" className={styles.uploadBtn}>
              Change Image
            </label>
          </div>

          <div className={styles.inputGroup}>
            <label>Title</label>
            <input type="text" {...register("title")} />
            {errors.title && <p className={styles.error}>{errors.title.message}</p>}
          </div>

          <div className={styles.inputGroup}>
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
            {errors.category && (
              <p className={styles.error}>{errors.category.message}</p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label>Description</label>
            <textarea rows="4" {...register("description")}></textarea>
            {errors.description && (
              <p className={styles.error}>{errors.description.message}</p>
            )}
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Price (PKR)</label>
              <input type="number" {...register("price", { valueAsNumber: true })} />
              {errors.price && (
                <p className={styles.error}>{errors.price.message}</p>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label>Quantity</label>
              <input
                type="number"
                {...register("quantity", { valueAsNumber: true })}
              />
              {errors.quantity && (
                <p className={styles.error}>{errors.quantity.message}</p>
              )}
            </div>
          </div>

          <button type="submit" className={styles.saveBtn}>
            Update Item
          </button>
        </form>
      </main>
    </div>
  );
}

export default UpdateItem;
