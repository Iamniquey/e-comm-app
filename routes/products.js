const express = require("express");
const productsRouter = express.Router();
const db = require("../db/index");

productsRouter.get("/", async (req, res) => {
  try {
    const sql = "SELECT * FROM products";
    const result = await db.query(sql);
    const products = result.rows;
    if (products.length < 1) {
      res.status(404).send("No products found.");
      return;
    }
    res.status(200).json(products);
  } catch (e) {
    console.log("Server error while fetching products: ", e);
    res.status(500).send("Server error while fetching products");
  }
});

productsRouter.get("/:id", async (req, res) => {
  try {
    const sql = "SELECT * FROM products WHERE id = $1";
    const id = req.params.id;
    const result = await db.query(sql, [id]);
    const product = result.rows[0];
    if (!product) {
      res.status(404).send("No such product found.");
      return;
    }
    res.status(200).json(product);
  } catch (e) {
    console.log("Server error while fetching product: ", e);
    res.status(500).send("Server error while fetching product");
  }
});

productsRouter.post("/", async (req, res) => {
  try {
    const { name, price } = req.body;
    if (!name || !price) {
      res.status(400).send("Missing post data");
      return;
    }
    const sql = "INSERT INTO products (name, price) VALUES ($1, $2)";
    const result = await db.query(sql, [name, price]);
    res.status(200).send("Product added successfully");
  } catch (e) {
    console.log("Server error while adding product", e);
    res.status(500).send("Server error while adding product");
  }
});

productsRouter.put("/:id", async (req, res) => {
  try {
    const { price } = req.body;
    if (!price || typeof price !== "number" || price <= 0) {
      res.status(400).send("Missing or invalid data");
      return;
    }

    const id = req.params.id;    
    const sql = "UPDATE products SET price = $1 WHERE id = $2";
    const result = await db.query(sql, [price, id]);
    if (result.rowCount < 1) {
      res.status(400).send("No such product.");
      return;
    }
    res.status(200).send("Product updated successfully");
  } catch (e) {
    console.log("Server error while updating product", e);
    res.status(500).send("Server error while updating product");
  }
});

productsRouter.delete("/:id", async (req, res) => {
  try {
    const sql = "DELETE FROM products WHERE id = $1";
    const id = req.params.id;
    const result = await db.query(sql, [id]);
    if (result.rowCount < 1) {
      res.status(400).send("No product deleted");
      return;
    }
    res.status(200).send("Delete successful");
  } catch (e) {
    console.log("Server error while deleting product: ", e);
    res.status(500).send("Server error while deleting product");
  }
});

module.exports = productsRouter;
