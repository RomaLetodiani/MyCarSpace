import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import UserServices from "../Services/User.Service"
import { CustomError } from "../Error/CustomError"

class UserController {
  private userServices: UserServices
  // Reusable method for handling unimplemented endpoints
  private handleNotImplemented = (req: Request, res: Response) => {
    res.status(501).json({
      message: "Not Implemented Yet",
    })
  }
  constructor() {
    this.userServices = new UserServices()
  }

  GetCurrentUser = asyncHandler(async (req: Request, res: Response) => {
    const decodedUser = req.user

    if (!decodedUser) {
      throw new CustomError("User not found", 404)
    }

    const user = await this.userServices.findOne({ username: decodedUser.username })
    res.status(200).json(user)
  })

  UpdateCurrentUser = asyncHandler(this.handleNotImplemented)
}

export default new UserController()
