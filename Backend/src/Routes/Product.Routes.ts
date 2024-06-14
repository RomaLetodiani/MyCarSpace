import express from "express"
import { authenticateUser } from "../Middlewares/Auth.Middleware"
import ProductController from "../Controllers/Product.Controller"
import { authenticateAdmin } from "../Middlewares/Admin.middleware"
import { validateDTO } from "../Middlewares/Validate.middlware"
import { idDTO, idsDTO } from "../DTO/Shared.dto"
import { productCreateDTO, productUpdateDTO } from "../DTO/Product.dto"

const router = express.Router()

// Get all products with optional filters in the query string
router.get("/", ProductController.getProducts)

// Get a specific product by its ID
router.get("/:id", validateDTO(idDTO), ProductController.getProduct)

// Create a new product (authentication and admin rights required)
router.post(
  "/",
  validateDTO(productCreateDTO),
  authenticateUser,
  authenticateAdmin,
  ProductController.createProduct,
)

// Update a specific product by its ID (authentication and admin rights required)
router.put(
  "/:id",
  validateDTO(productUpdateDTO),
  authenticateUser,
  authenticateAdmin,
  ProductController.updateProduct,
)

// Archive specific products by their IDs (authentication and admin rights required)
router.patch(
  "/archive",
  validateDTO(idsDTO),
  authenticateUser,
  authenticateAdmin,
  ProductController.archiveProducts,
)

// Restore specific products by their IDs (authentication and admin rights required)
router.patch(
  "/restore",
  validateDTO(idsDTO),
  authenticateUser,
  authenticateAdmin,
  ProductController.restoreProducts,
)

// Delete specific products by their IDs (authentication and admin rights required)
router.delete(
  "/",
  validateDTO(idsDTO),
  authenticateUser,
  authenticateAdmin,
  ProductController.deleteProducts,
)

export default router
