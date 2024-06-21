import { useEffect, useState } from 'react'
import Pagination from '../../components/Pagination/Pagination'
import Loading from '../Loading/Loading'
import FilterStore from '../../Stores/Filter.Store'
import ProductCard from './ProductCard'
import useMediaQuery from '../../hooks/useMediaQuery'
import { twMerge } from 'tailwind-merge'

const Products = () => {
  const [page, setPage] = useState(1)
  const { setFilterParams, totalProducts, loading, filteredProducts } = FilterStore()
  const isNotMobile = useMediaQuery('(min-width: 768px)')

  useEffect(() => {
    setFilterParams({ page })
  }, [page])

  return (
    <div className="flex flex-col flex-1">
      {!isNotMobile && totalProducts > 12 ? (
        <div className="border-b py-1">
          <Pagination page={page} pageSize={12} totalProducts={totalProducts} setPage={setPage} />
        </div>
      ) : null}
      <div className={twMerge('flex flex-col flex-1')}>
        {loading ? (
          <Loading />
        ) : filteredProducts.length ? (
          <div className="grid grid-cols-1 min-[500px]:grid-cols-2 min-[1000px]:grid-cols-3 min-[1200px]:grid-cols-4 gap-8 md:gap-4 justify-items-center p-8 md:p-4">
            {filteredProducts.map((p, index) => (
              <ProductCard key={index} product={p} />
            ))}
          </div>
        ) : null}
        {!loading && !totalProducts && (
          <div className="flex-1 h-full w-full text-primary flex justify-center items-center">
            <div className="text-center border-dotted border-4 border-primary px-10 py-10 rounded-full">
              <p>პროდუქტი არ მოიძებნა</p>
              <p>გთხოვთ სცადოთ</p>
              <p>განსხვავებული ფილტრით</p>
            </div>
          </div>
        )}
      </div>
      {totalProducts > 12 && (
        <div className="border-t">
          <Pagination page={page} pageSize={12} totalProducts={totalProducts} setPage={setPage} />
        </div>
      )}
    </div>
  )
}

export default Products
