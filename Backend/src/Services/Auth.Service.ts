import { User } from "../Models/User.Model"
import { CustomError } from "../Error/CustomError"
import { decodeToken, generateTokens, verifyToken } from "../Utils/Auth"
import { refreshTokenDTO } from "../DTO/Auth.dto"

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

  refreshTokens = async ({ refreshToken }: refreshTokenDTO): Promise<Tokens> => {
    const decodedUser = await this.verifyAndDecodeRefreshToken({ refreshToken })

    const user = await User.findOne({ username: decodedUser?.username })

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

  private verifyAndDecodeRefreshToken = async ({ refreshToken }: refreshTokenDTO) => {
    try {
      const verifiedToken = await verifyToken(refreshToken)

      if (
        typeof verifiedToken === "string" ||
        !verifiedToken.exp ||
        Date.now() / 1000 > verifiedToken.exp
      ) {
        throw new CustomError("Invalid or expired refresh token", 404)
      }

      return decodeToken(refreshToken)
    } catch (error) {
      throw new CustomError("Invalid refresh token", 404)
    }
  }
}

export default AuthServices
