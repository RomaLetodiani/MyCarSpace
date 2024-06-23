import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import productService from '../../../services/Product.Service'
import { IProduct } from '../../../Stores/Filter.Store'

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
