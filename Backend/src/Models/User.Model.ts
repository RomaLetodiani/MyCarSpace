import mongoose, { Schema, Document } from "mongoose"
import bcrypt from "bcrypt"
import { hashPassword } from "../Utils/Auth"

export enum Role {
  ADMIN = "admin",
  USER = "user",
}

export interface UserDocument extends Document {
  username: string
  email: string
  password: string
  role: Role
  comparePassword(candidatePassword: string): Promise<boolean>
}

const userSchema: Schema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: [Role.ADMIN, Role.USER], default: Role.USER },
  },
  { versionKey: false, timestamps: true },
)

userSchema.pre<UserDocument>("save", async function (next) {
  if (!this.isModified("password")) next()

  try {
    this.password = await hashPassword(this.password)
    next()
  } catch (error) {
    next(new Error("Error hashing password"))
  }
})

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword: string) {
  try {
    return await bcrypt.compare(candidatePassword, this.password)
  } catch (error) {
    console.error("Error comparing passwords:", error) // Log for debugging
    return false
  }
}

export const User = mongoose.model<UserDocument>("User", userSchema)
