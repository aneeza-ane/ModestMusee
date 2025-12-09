import React from "react";
import Sidebar from "../Components/Sidebar";
import styles from "../Styles/Dashboard.module.css";

function Dashboard() {
    return (
        <div className={styles.dashboardLayout}>
            <Sidebar />

            <main className={styles.mainContent}>
                <div className={styles.centerContent}>
                    <h1 className={styles.stylishHeading}>Welcome, Admin 👋</h1>
                    <p className={styles.stylishSubheading}>
                        Manage your store effortlessly. Add, update, and view all items from here.
                    </p>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
