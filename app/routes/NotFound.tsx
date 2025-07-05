import React from "react";

const NotFound: React.FC = () => (
  <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
    <h1 style={{ fontSize: "3rem", color: "#a855f7", marginBottom: 16 }}>404</h1>
    <h2 style={{ fontSize: "1.5rem", color: "#fff", marginBottom: 8 }}>Page Not Found</h2>
    <p style={{ color: "#aaa", marginBottom: 24 }}>Sorry, the page you are looking for does not exist.</p>
    <a href="/" style={{ color: "#a855f7", textDecoration: "underline" }}>Go Home</a>
  </div>
);

export default NotFound;
