import api from '../utils/api'

const userService = {
  currentUser: async () => api.get(`/user/current`),
  updateUser: async (body: any) => api.put(`/user`, body),
}

export default userService
