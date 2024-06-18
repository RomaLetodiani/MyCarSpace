import api from '../utils/Api'

const categoryService = {
  allCategories: async (params?: { isArchived?: boolean }) =>
    api.get('/category', { params: { isArchived: false, ...params } }),
  getCategory: async (id: string) => api.get(`/category/${id}`),
}

export default categoryService
