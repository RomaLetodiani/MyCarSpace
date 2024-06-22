import { useEffect, useState } from 'react'
import { IProduct } from '../../Stores/Filter.Store'
import productService from '../../services/Product.Service'
import { useParams } from 'react-router-dom'

const FetchProduct = () => {
  const { id } = useParams()
  const [product, setProduct] = useState<IProduct | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!id) return
    productService
      .getProduct(id)
      .then(({ data }) => {
        setProduct(data)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [id])
  return { product, loading, error }
}

export default FetchProduct
