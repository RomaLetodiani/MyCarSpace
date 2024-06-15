import api from '../utils/api'

const categoryService = {
  allCategories: async (params: { isArchived?: boolean }) =>
    api.get('/category', { params: { isArchived: false, ...params } }),
  getCategory: async (id: string) => api.get(`/category/${id}`),
  createCategory: async (body: { name: string }) => api.post('/category', body),
  updateCategory: async (id: string, body: any) => api.put(`/category/${id}`, body),
  archiveCategories: async (ids: string[]) => api.patch(`/category/archive`, { ids }),
  restoreCategories: async (ids: string[]) => api.patch(`/category/restore`, { ids }),
  deleteCategories: async (ids: string[]) => api.delete(`/category`, { data: { ids } }),
}

export default categoryService
