import asyncHandler from "express-async-handler"
import { Request, Response } from "express"
import AuthServices from "../Services/Auth.Service"

class AuthController {
  private readonly authServices: AuthServices
  constructor() {
    this.authServices = new AuthServices()
  }

  registerUser = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({
      message: "User registered successfully",
    })
  })

  loginUser = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({
      message: "User logged in successfully",
    })
  })

  logoutUser = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({
      message: "User logged out successfully",
    })
  })
}

export default new AuthController()
