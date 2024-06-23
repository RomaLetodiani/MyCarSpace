import { twMerge } from 'tailwind-merge'
import GlobalStore from '../../../Stores/Global.Store'
import { logo } from '../../../assets'
import PriceRender from '../../../components/PriceRender'
import useMediaQuery from '../../../hooks/useMediaQuery'
import Button from '../../../components/UI/Button'
import { Link } from 'react-router-dom'
import FilterStore from '../../../Stores/Filter.Store'

const Sales = () => {
  const { setFilterParams } = FilterStore()
  const handleSeeAll = () => {
    setFilterParams({ onlySales: true })
  }
  const { saleProducts } = GlobalStore()
  const isNotMobile = useMediaQuery('(min-width: 768px)')
  const isNotTablet = useMediaQuery('(min-width: 1024px)')
  const total = isNotTablet ? 8 : isNotMobile ? 9 : 4
  return (
    saleProducts.length > 2 && (
      <div className="max-w-[1440px] m-auto p-5 text-center">
        <h2 className="text-2xl font-semibold mb-5">ფასდაკლებები</h2>
        <div
          className={twMerge(
            'grid lg:grid-cols-4 lg:grid-rows-2 gap-5 justify-items-center',
            'md:grid-cols-3 md:grid-rows-3 gap-3',
            'sm:grid-cols-2 sm:grid-rows-2 gap-5',
          )}
        >
          {saleProducts.slice(0, total).map((product, index) => (
            <Link to={`/shop/${product._id}`}>
              <div
                key={index}
                className={twMerge(
                  'text-danger/50 flex flex-col items-center justify-center',
                  'border-danger/10 border shadow-md rounded-lg p-5',
                  'max-w-[250px] w-full',
                )}
              >
                <div className="max-w-[150px]">
                  <img
                    className="w-full h-full aspect-square object-cover rounded-lg mb-2"
                    src={product.imageUrls[0] ?? logo}
                    alt={product.title}
                  />
                </div>
                <p className="text-primary">{product.title}</p>
                <PriceRender price={product.price} salePrice={product.salePrice} />
              </div>
            </Link>
          ))}
        </div>
        <Link to="/shop">
          <Button
            onClick={handleSeeAll}
            btnType="danger"
            className="mt-5 bg-transparent bg-gradient-to-br from-danger/40 to-danger/80"
          >
            ყველას ნახვა
          </Button>
        </Link>
      </div>
    )
  )
}

export default Sales
