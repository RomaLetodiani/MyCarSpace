import api from '../utils/api'

const productService = {
  allProducts: async (params: any) => api.get('/product', params),
  getProduct: async (id: string) => api.get(`/product/${id}`),
  createProduct: async (body: any) => api.post('/product', body),
  updateProduct: async (id: string, body: any) => api.put(`/product/${id}`, body),
  archiveProducts: async (ids: string[]) => api.patch(`/product`, { ids }),
  deleteProducts: async (ids: string[]) => api.delete(`/product`, { data: { ids } }),
}

export default productService
