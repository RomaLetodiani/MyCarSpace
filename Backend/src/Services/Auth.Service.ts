import { User } from "../Models/User.Model"
import { CustomError } from "../Error/CustomError"
import { decodeToken, generateTokens, verifyToken } from "../Utils/Auth"

interface Credentials {
  username: string
  password: string
}

interface Tokens {
  accessToken: string
  refreshToken: string
}

class AuthServices {
  createTokens = async ({ username, password }: Credentials): Promise<Tokens> => {
    const user = await User.findOne({ username })

    if (!user) {
      throw new CustomError("User not found", 404)
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      throw new CustomError("Invalid credentials", 401)
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens({
      username: user.username,
      email: user.email,
      role: user.role,
    })

    return { accessToken, refreshToken }
  }

  refreshTokens = async (refreshToken: string): Promise<Tokens> => {
    const decodedUser = await this.verifyAndDecodeRefreshToken(refreshToken)

    const user = await User.findOne({ username: decodedUser.username })

    if (!user) {
      throw new CustomError("User not found", 404)
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokens({
      username: user.username,
      email: user.email,
      role: user.role,
    })

    return { accessToken, refreshToken: newRefreshToken }
  }

  private verifyAndDecodeRefreshToken = async (token: string) => {
    try {
      const verifiedToken = await verifyToken(token)

      if (
        typeof verifiedToken === "string" ||
        !verifiedToken.exp ||
        Date.now() / 1000 > verifiedToken.exp
      ) {
        throw new CustomError("Invalid or expired refresh token", 401)
      }

      return decodeToken(token)
    } catch (error) {
      throw new CustomError("Invalid refresh token", 401)
    }
  }
}

export default AuthServices
