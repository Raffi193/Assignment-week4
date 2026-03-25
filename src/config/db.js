const { Pool } = require("pg");

// Pooling: Menggunakan connection pooling dari library 'pg'
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Fungsi untuk membuat tabel products jika belum ada / auto-migrate
const initializeDatabase = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS products (
      id        SERIAL PRIMARY KEY,
      name      VARCHAR(255) NOT NULL,
      price     NUMERIC(10, 2) NOT NULL,
      stock     INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log("Database connected & table 'products' is ready.");
  } catch (error) {
    console.error("Failed to initialize database:", error.message);
    process.exit(1);
  }
};

module.exports = { pool, initializeDatabase };