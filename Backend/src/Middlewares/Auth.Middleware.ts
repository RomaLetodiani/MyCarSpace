import { Request, Response, NextFunction } from "express"
import asyncHandler from "express-async-handler"
import { CustomError } from "../Error/CustomError"
import { verifyToken } from "../Utils/Auth"

export const authenticateUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization

    if (!header) {
      throw new CustomError("Not authorized, no token provided", 401)
    }

    const parts = header.split(" ")

    if (parts.length !== 2) {
      throw new CustomError("Not authorized, token format should be 'Bearer <token>'", 401)
    }

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme)) {
      throw new CustomError("Not authorized, token format should be 'Bearer <token>'", 401)
    }

    // Verify the token
    try {
      const user = await verifyToken(token)
      if (!user) {
        throw new CustomError("Not authorized, invalid token", 401)
      }

      req.user = user
      next()
    } catch (error) {
      throw new CustomError("Not authorized, token verification failed", 401)
    }
  },
)
