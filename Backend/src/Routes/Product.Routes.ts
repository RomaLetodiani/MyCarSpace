import express from "express"
import { authenticateUser } from "../Middlewares/Auth.Middleware"
import ProductController from "../Controllers/Product.Controller"
import { authenticateAdmin } from "../Middlewares/Admin.middleware"

const router = express.Router()

// Get all products with optional filters in the query string
router.get("/", ProductController.getProducts)

// Get a specific product by its ID
router.get("/:id", ProductController.getProduct)

// Create a new product (authentication and admin rights required)
router.post("/", authenticateUser, authenticateAdmin, ProductController.createProduct)

// Update a specific product by its ID (authentication and admin rights required)
router.put("/:id", authenticateUser, authenticateAdmin, ProductController.updateProduct)

// Archive specific products by their IDs (authentication and admin rights required)
router.patch("/", authenticateUser, authenticateAdmin, ProductController.archiveProducts)

// Delete specific products by their IDs (authentication and admin rights required)
router.delete("/", authenticateUser, authenticateAdmin, ProductController.deleteProducts)

export default router
