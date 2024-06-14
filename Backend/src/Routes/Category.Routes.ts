import express from "express"
import { authenticateUser } from "../Middlewares/Auth.Middleware"
import { authenticateAdmin } from "../Middlewares/Admin.middleware"
import CategoryController from "../Controllers/Category.Controller"
import { validateDTO } from "../Middlewares/Validate.middlware"
import { idsDTO } from "../DTO/Shared.dto"
import { categoryCreateDTO, categoryUpdateDTO } from "../DTO/Category.dto"

const router = express.Router()

// Get all category with optional filters in the query string
router.get("/", CategoryController.getCategories)

// Get a specific category by its ID
router.get("/:id", CategoryController.getCategory)

// Create a new category (authentication and admin rights required)
router.post(
  "/",
  validateDTO(categoryCreateDTO),
  authenticateUser,
  authenticateAdmin,
  CategoryController.createCategory,
)

// Update a specific category by its ID (authentication and admin rights required)
router.put(
  "/:id",
  validateDTO(categoryUpdateDTO),
  authenticateUser,
  authenticateAdmin,
  CategoryController.updateCategory,
)

// Archive specific categories by their IDs (authentication and admin rights required)
router.patch(
  "/archive",
  validateDTO(idsDTO),
  authenticateUser,
  authenticateAdmin,
  CategoryController.archiveCategories,
)

// Restore specific categories by their IDs (authentication and admin rights required)
router.patch(
  "/restore",
  validateDTO(idsDTO),
  authenticateUser,
  authenticateAdmin,
  CategoryController.restoreCategories,
)

// Delete specific categories by their IDs (authentication and admin rights required)
router.delete(
  "/",
  validateDTO(idsDTO),
  authenticateUser,
  authenticateAdmin,
  CategoryController.deleteCategories,
)

export default router
