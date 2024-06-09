import { Request, Response, NextFunction } from "express"
import asyncHandler from "express-async-handler"
import { CustomError } from "../Error/CustomError"
import { Role } from "../Models/User.Model"

export const authenticateAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== Role.ADMIN) {
      throw new CustomError("Admin access required", 403)
    }

    next()
  },
)
