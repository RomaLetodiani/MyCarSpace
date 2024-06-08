import jwt from "jsonwebtoken"
import { Response } from "express"
import bcrypt from "bcrypt"

const generateTokens = (res: Response, user: any) => {
  const jwtSecret = process.env.JWT_SECRET_KEY || ""
  const accessToken = jwt.sign({ ...user }, jwtSecret, { expiresIn: "1h" })
  const refreshToken = jwt.sign({ ...user }, jwtSecret, { expiresIn: "1w" })

  return { accessToken, refreshToken }
}

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

const verifyToken = async (token: string) => {
  const jwtSecret = process.env.JWT_SECRET_KEY || ""
  return jwt.verify(token, jwtSecret)
}

export { generateTokens, verifyToken, hashPassword }
