import React from "react";
import { Link } from "react-router-dom";
import styles from "../Styles/ManageItems.module.css";
import Sidebar from "../Components/Sidebar";

function ManageItems() {
    const actions = [
        {
            title: "Add Item",
            description: "Add new products to your store catalog.",
            path: "/admin/addItem",
            icon: "➕",
        },
        {
            title: "View Items",
            description: "View all items currently available in your store.",
            path: "/admin/viewItem",
            icon: "👁",
        },
        // {
        //     title: "Update Items",
        //     description: "Modify existing product details and pricing.",
        //     path: "/admin/updateItem/:id",
        //     icon: "✏",
        // },
    ];

    return (
        <div className={styles.container}>
            <Sidebar />
            <main className={styles.main}>
                <h1 className={styles.title}>Manage Items</h1>
                <div className={styles.grid}>
                    {actions.map((item, index) => (
                        <Link key={index} to={item.path} className={styles.card}>
                            <div className={styles.icon}>{item.icon}</div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default ManageItems;