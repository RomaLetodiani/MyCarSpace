// middlewares/validate.ts
import { plainToInstance } from "class-transformer"
import { validate, ValidationError } from "class-validator"
import { Request, Response, NextFunction } from "express"

export function validateDTO(dtoClass: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(dtoClass, req.body)
    const errors = await validate(dtoInstance)

    if (errors.length > 0) {
      const errorMessages = errors.map((error: ValidationError) =>
        Object.values(error.constraints || {}).join(", "),
      )
      return res.status(400).json({ errors: errorMessages })
    }

    req.body = dtoInstance
    next()
  }
}
