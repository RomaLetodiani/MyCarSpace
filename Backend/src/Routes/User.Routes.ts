import express from "express"
import { authenticateUser } from "../Middlewares/Auth.Middleware"
import UserController from "../Controllers/User.Controller"

const router = express.Router()

// Get Current User information (Authentication required)
router.get("/current", authenticateUser, UserController.GetCurrentUser)

// Update Current User information (Authentication required)
router.put("/current", authenticateUser, UserController.UpdateCurrentUser)

export default router
