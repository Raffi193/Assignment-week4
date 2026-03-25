const { pool } = require("../config/db");

/**
 * POST /api/products
 * Menerima data produk dari request body, lalu menyimpannya ke database.
 */
const createProduct = async (req, res) => {
  // Destructuring body — ambil field yang dibutuhkan
  const { name, price, stock } = req.body;

  // --- Validasi Input ---
  if (!name || price === undefined || stock === undefined) {
    return res.status(400).json({
      success: false,
      message: "Fields 'name', 'price', and 'stock' are required.",
    });
  }

  if (typeof price !== "number" || price < 0) {
    return res.status(400).json({
      success: false,
      message: "'price' must be a non-negative number.",
    });
  }

  if (!Number.isInteger(stock) || stock < 0) {
    return res.status(400).json({
      success: false,
      message: "'stock' must be a non-negative integer.",
    });
  }

  try {
    // Parameterized query ($1, $2, $3) untuk mencegah SQL Injection
    const query = `
      INSERT INTO products (name, price, stock)
      VALUES ($1, $2, $3)
      RETURNING id, name, price, stock, created_at;
    `;
    const values = [name, price, stock];

    const result = await pool.query(query, values);
    const newProduct = result.rows[0];

    // Kembalikan 201 Created beserta data yang baru diinput
    return res.status(201).json({
      success: true,
      message: "Berhasil Menambahkan Produk.",
      data: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

module.exports = { createProduct };
