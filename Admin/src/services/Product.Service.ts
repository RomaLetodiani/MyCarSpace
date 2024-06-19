import api from '../utils/api'

const productService = {
  allProducts: async (params: any) => api.get('/product', params),
  getProduct: async (id: string) => api.get(`/product/${id}`),
  createProduct: async (body: {
    title: string
    description: string
    price: number
    salePrice?: number | null
    countInStock: number
    imageUrls?: string[]
    category: string
  }) => api.post('/product', body),
  updateProduct: async (id: string, body: any) => api.put(`/product/${id}`, body),
  archiveProducts: async (ids: string[]) => api.patch(`/product/archive`, { ids }),
  restoreProducts: async (ids: string[]) => api.patch(`/product/restore`, { ids }),
  deleteProducts: async (ids: string[]) => api.delete(`/product`, { data: { ids } }),
}

export default productService
