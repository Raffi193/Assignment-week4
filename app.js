// Muat environment variables dari .env SEBELUM modul lain
require("dotenv").config();

const express = require("express");
const { initializeDatabase } = require("./src/config/db");
const productRoutes = require("./src/routes/productRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware ---
// Parsing JSON body agar req.body bisa dibaca
app.use(express.json());

// --- Health Check Endpoint ---
app.get("/", (req, res) => {
  res.json({ success: true, message: "API is running!" });
});

// --- Routes ---
// Semua route produk akan diawali dengan /api/products
app.use("/api/products", productRoutes);

// --- 404 Handler ---
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Endpoint not found." });
});

// --- Start Server (setelah DB siap) ---
const startServer = async () => {
  await initializeDatabase(); // Pastikan DB & tabel sudah siap
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
