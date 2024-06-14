import express from "express"
import { authenticateUser } from "../Middlewares/Auth.Middleware"
import { authenticateAdmin } from "../Middlewares/Admin.middleware"
import CategoryController from "../Controllers/Category.Controller"

const router = express.Router()

// Get all category with optional filters in the query string
router.get("/", CategoryController.getCategories)

// Get a specific category by its ID
router.get("/:id", CategoryController.getCategory)

// Create a new category (authentication and admin rights required)
router.post("/", authenticateUser, authenticateAdmin, CategoryController.createCategory)

// Update a specific category by its ID (authentication and admin rights required)
router.put("/:id", authenticateUser, authenticateAdmin, CategoryController.updateCategory)

// Archive specific categories by their IDs (authentication and admin rights required)
router.patch("/", authenticateUser, authenticateAdmin, CategoryController.archiveCategories)

// Delete specific categories by their IDs (authentication and admin rights required)
router.delete("/", authenticateUser, authenticateAdmin, CategoryController.deleteCategories)

export default router
