import api from '../utils/Api'

const ProductServices = {
  allProducts: (params?: any) => api.get('product', { params }),
  getProduct: (productId: string) => api.get(`product/${productId}`),
}

export default ProductServices
