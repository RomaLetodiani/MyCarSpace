import api from '../utils/Api'

const productService = {
  allProducts: async (params: any) => api.get('/product', params),
  getProduct: async (id: string) => api.get(`/product/${id}`),
}

export default productService
