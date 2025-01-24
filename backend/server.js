import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js"; // Ensure this path matches your file structure

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

// Serve frontend assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));  // Update this path if needed
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Start the server and connect to the database
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
