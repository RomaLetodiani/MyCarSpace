import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { Role, User } from "../Models/User.Model"

export interface decodedUser {
  username: string
  email: string
  role: Role
  iat: number
  exp: number
}

const generateTokens = (user: { username: string; email: string; role: Role }) => {
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
  return jwt.verify(token, jwtSecret) as decodedUser
}

const decodeToken = (token: string) => {
  return jwt.decode(token) as { username: string; email: string; role: Role }
}

const seedAdmin = async () => {
  const adminUser = await User.findOne({ role: "admin" })

  if (adminUser) {
    console.log("🚀 ~ admin user already Created")
    return
  }

  const admin = new User({
    username: process.env.ADMIN_USERNAME,
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    role: Role.ADMIN,
  })

  await admin.save()
  console.log("🚀 ~ admin user Created")

  return
}

export { generateTokens, decodeToken, verifyToken, hashPassword, seedAdmin }
