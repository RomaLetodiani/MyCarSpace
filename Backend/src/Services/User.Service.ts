import { User } from "../Models/User.Model"
import { CustomError } from "../Error/CustomError"
import { currentUserDTO } from "../DTO/User.dto"

class UserServices {
  findOne = async ({ username }: currentUserDTO) => {
    const user = await User.findOne({ username })

    if (!user) {
      throw new CustomError("User not found", 404)
    }

    return user
  }
}

export default UserServices
