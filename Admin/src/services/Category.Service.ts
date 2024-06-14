import api from '../utils/api'

const categoryService = {
  allCategories: async (params: any) => api.get('/category', params),
  getCategory: async (id: string) => api.get(`/category/${id}`),
  createCategory: async (body: any) => api.post('/category', body),
  updateCategory: async (id: string, body: any) => api.put(`/category/${id}`, body),
  archiveCategories: async (ids: string[]) => api.patch(`/category`, { ids }),
  deleteCategories: async (ids: string[]) => api.delete(`/category`, { data: { ids } }),
}

export default categoryService
