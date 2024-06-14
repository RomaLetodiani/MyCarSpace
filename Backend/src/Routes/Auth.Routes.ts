import express from "express"
import AuthController from "../Controllers/Auth.Controller"
import { authenticateUser } from "../Middlewares/Auth.Middleware"
import { validateDTO } from "../Middlewares/Validate.middlware"
import { loginUserDTO, refreshTokenDTO } from "../DTO/Auth.dto"

const router = express.Router()
// Register a user (No Authentication required)
router.post("/register", AuthController.registerUser)

// Login a user (No Authentication required)
router.post("/login", validateDTO(loginUserDTO), AuthController.loginUser)

// Logout a user (Authentication required)
router.post("/logout", authenticateUser, AuthController.logoutUser)

// Refresh tokens (No Authentication required)
router.post("/refresh-tokens", validateDTO(refreshTokenDTO), AuthController.refreshTokens)

export default router
