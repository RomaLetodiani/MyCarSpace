import { useState } from 'react'
import Pagination from '../../components/Pagination/Pagination'

const Products = () => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalProducts, setTotalProducts] = useState(100)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  return (
    <div>
      <div></div>
      <Pagination page={1} pageSize={10} totalProducts={100} setPage={() => {}} />
    </div>
  )
}

export default Products
