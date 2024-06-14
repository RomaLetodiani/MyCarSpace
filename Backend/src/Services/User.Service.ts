import { User } from "../Models/User.Model"
import { CustomError } from "../Error/CustomError"

class UserServices {
  findOne = async ({ username }: { username: string }) => {
    const user = await User.findOne({ username })

    if (!user) {
      throw new CustomError("User not found", 404)
    }

    return user
  }
}

export default UserServices
