import { useEffect } from 'react'
import GlobalStore from '../../../Stores/Global.Store'
import productService from '../../../services/Product.Service'

const fetchProducts = () => {
  const { setProducts, setSaleProducts } = GlobalStore()

  useEffect(() => {
    productService.allProducts({ page: 1, pageSize: 8 }).then(({ data }) => {
      setProducts(data.products)
    })

    productService.allProducts({ page: 1, pageSize: 4, onlySales: true }).then(({ data }) => {
      setSaleProducts(data.products)
    })
  }, [])
}

export default fetchProducts
