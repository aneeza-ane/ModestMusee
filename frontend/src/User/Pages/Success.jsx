import React from "react";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // redirect to home page or products page
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        background: "#fdfcfb",
        padding: "20px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "40px",
          borderRadius: "14px",
          boxShadow: "0 0 15px rgba(0,0,0,0.08)",
          background: "#fff",
          maxWidth: "400px",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "700",
            color: "#222",
            marginBottom: "15px",
          }}
        >
          ✅ Payment Successful
        </h1>
        <p
          style={{
            fontSize: "16px",
            color: "#555",
            marginBottom: "25px",
            lineHeight: "1.5",
          }}
        >
          Thank you for your purchase! <br />
          Your payment has been successfully processed.
        </p>

        <button
          onClick={handleGoHome}
          style={{
            padding: "12px 25px",
            fontSize: "16px",
            background: "#222",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          Go to Shop
        </button>
      </div>
    </div>
  );
}

export default Success;
