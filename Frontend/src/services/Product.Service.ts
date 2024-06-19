import { FilterData } from '../Stores/Filter.Store'
import api from '../utils/Api'

const productService = {
  allProducts: async (params: FilterData) =>
    api.get('/product', { params: { isArchived: false, ...params } }),
  getProduct: async (id: string) => api.get(`/product/${id}`),
}

export default productService
