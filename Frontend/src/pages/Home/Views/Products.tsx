import { useRef } from 'react'
import GlobalStore from '../../../Stores/Global.Store'
import { logo } from '../../../assets'
import Button from '../../../components/UI/Button'
import useMediaQuery from '../../../hooks/useMediaQuery'
import SliderArrow from '../../../components/SliderArrow'
import { Link } from 'react-router-dom'
import { sliceText } from '../../../utils/Helpers'

const Products = () => {
  const { products } = GlobalStore()
  const isNotMobile = useMediaQuery('(min-width: 768px)')
  const scrollRef = useRef<null | HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -500, // Adjust the scroll distance as needed
        behavior: 'smooth',
      })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 500, // Adjust the scroll distance as needed
        behavior: 'smooth',
      })
    }
  }

  const handleProductClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return products.length ? (
    <div className="max-w-[1440px] m-auto md:p-5 my-8 text-center">
      <h2 className="text-2xl font-semibold">პროდუქტები</h2>
      <div className="relative overflow-hidden md:px-10 p-5">
        <div ref={scrollRef} className="flex overflow-x-auto py-2 gap-5">
          {isNotMobile && (
            <>
              <SliderArrow direction="left" onClick={scrollLeft} />
              <SliderArrow direction="right" onClick={scrollRight} />
            </>
          )}
          {products.map((product, index) => (
            <Link onClick={handleProductClick} key={index} to={`/shop/${product._id}`}>
              <div className="min-w-[200px] p-2 rounded-xl border shadow-md">
                <div className="">
                  <img
                    className="aspect-square"
                    src={product.imageUrls[0] ?? logo}
                    alt={sliceText(product.title, 20)}
                  />
                </div>
                <p className="font-bold">{product.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Link to={'/shop'}>
        <Button className="place-self-center">მეტის ნახვა</Button>
      </Link>
    </div>
  ) : null
}

export default Products
