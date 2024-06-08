import { Request, Response, NextFunction } from "express"
import { CustomError } from "../Error/CustomError"

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"

  res.status(statusCode).json({
    success: false,
    message,
  })
}
