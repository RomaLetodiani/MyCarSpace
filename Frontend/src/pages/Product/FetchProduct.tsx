import { useEffect, useState } from 'react'
import { IProduct } from '../../Stores/Filter.Store'
import productService from '../../services/Product.Service'
import { useParams } from 'react-router-dom'

const FetchProduct = () => {
  const { id } = useParams()
  const [product, setProduct] = useState<IProduct | null>(null)

  useEffect(() => {
    if (!id) return
    productService.getProduct(id).then(({ data }) => {
      setProduct(data)
    })
  }, [id])
  return { product }
}

export default FetchProduct
