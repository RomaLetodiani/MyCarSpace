import asyncHandler from "express-async-handler"
import { Request, Response } from "express"
import AuthServices from "../Services/Auth.Service"

class AuthController {
  private readonly authServices: AuthServices
  constructor() {
    this.authServices = new AuthServices()
  }

  // Reusable method for handling unimplemented endpoints
  private handleNotImplemented = (req: Request, res: Response) => {
    res.status(501).json({
      message: "Not Implemented Yet",
    })
  }

  registerUser = asyncHandler(this.handleNotImplemented)
  logoutUser = asyncHandler(this.handleNotImplemented)

  loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body
    const { accessToken, refreshToken } = await this.authServices.createTokens({
      username,
      password,
    })

    res.status(200).json({
      accessToken,
      refreshToken,
    })
  })

  refreshTokens = asyncHandler(async (req: Request, res: Response) => {
    const { refreshToken } = req.body
    const { accessToken, refreshToken: newRefreshToken } = await this.authServices.refreshTokens({
      refreshToken,
    })

    res.status(200).json({
      accessToken,
      refreshToken: newRefreshToken,
    })
  })
}

export default new AuthController()
