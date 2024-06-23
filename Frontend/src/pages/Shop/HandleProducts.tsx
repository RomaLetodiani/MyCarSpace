import { useEffect } from 'react'
import productService from '../../services/Product.Service'
import FilterStore from '../../Stores/Filter.Store'
import categoryService from '../../services/Category.Service'

const HandleProducts = () => {
  const {
    filterParams,
    setLoading,
    setFilteredProducts,
    setTotalProducts,
    loading,
    setCategories,
    clearFilters,
  } = FilterStore()

  useEffect(() => {
    if (loading) return
    setLoading(true)
    productService
      .allProducts(filterParams)
      .then(({ data }) => {
        if (data.products) {
          setFilteredProducts(data.products)
          setTotalProducts(data.total)
        }
      })
      .finally(() => setLoading(false))
  }, [filterParams])

  useEffect(() => {
    categoryService.allCategories().then(({ data }) => {
      if (typeof data === 'object' && data) {
        setCategories(data)
      }
    })

    return () => {
      clearFilters()
    }
  }, [])
}

export default HandleProducts
