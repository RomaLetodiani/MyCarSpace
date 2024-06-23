import { twMerge } from 'tailwind-merge'
import GlobalStore from '../../../Stores/Global.Store'
import { logo } from '../../../assets'
import PriceRender from '../../../components/PriceRender'
import useMediaQuery from '../../../hooks/useMediaQuery'
import Button from '../../../components/UI/Button'
import { Link } from 'react-router-dom'
import FilterStore from '../../../Stores/Filter.Store'
import { sliceText } from '../../../utils/Helpers'

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
      <div className="border-b">
        <div className="max-w-[1440px] m-auto px-5 py-10 text-center">
          <h2 className="text-2xl font-semibold mb-5">ფასდაკლებები</h2>
          <div
            className={twMerge(
              'grid lg:grid-cols-4 lg:grid-rows-2 gap-5 justify-items-center',
              'md:grid-cols-3 md:grid-rows-3 gap-3',
              'sm:grid-cols-2 sm:grid-rows-2 gap-5',
            )}
          >
            {saleProducts.slice(0, total).map((product, index) => (
              <Link className="max-w-[250px] w-full" key={index} to={`/shop/${product._id}`}>
                <div
                  className={twMerge(
                    'h-full flex flex-col items-center justify-center',
                    'text-danger/50 border-danger/10 border shadow-md rounded-lg p-3',
                  )}
                >
                  <div className="max-w-[150px]">
                    <img
                      className="w-full h-full aspect-square object-cover rounded-lg mb-2"
                      src={product.imageUrls[0] ?? logo}
                      alt={product.title}
                    />
                  </div>
                  <p className="text-primary">{sliceText(product.title, 20)}</p>
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
      </div>
    )
  )
}

export default Sales
