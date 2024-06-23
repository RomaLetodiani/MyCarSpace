import { useEffect } from 'react'
import GlobalStore from '../../../../Stores/Global.Store'
import productService from '../../../../services/Product.Service'

const fetchProducts = () => {
  const { setProducts, setSaleProducts, setLoading, loading } = GlobalStore()

  useEffect(() => {
    if (loading) return

    setLoading(true)
    productService
      .allProducts({ page: 1, pageSize: 8 })
      .then(({ data }) => {
        if (data.products) {
          setProducts(data.products)
        }
      })
      .then(async () => {
        await productService
          .allProducts({ page: 1, pageSize: 12, onlySales: true })
          .then(({ data }) => {
            if (data.products) {
              setSaleProducts(data.products)
            }
          })
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])
}

export default fetchProducts
