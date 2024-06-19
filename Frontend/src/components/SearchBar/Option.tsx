import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { logo } from '../../assets'
import { IProduct } from '../../Stores/Filter.Store'

const Option = (product: IProduct) => {
  return (
    <Link to={`/shop/${product._id}`}>
      <div className="flex gap-5 p-5 border shadow-sm">
        <div className="w-14 h-14">
          <img className="w-full h-full" src={product.imageUrls[0] ?? logo} alt={product.title} />
        </div>
        <div>
          <h5>{product.title}</h5>
          <p className={twMerge('text-base', product.salePrice && 'line-through text-sm')}>
            ფასი: {product.price}₾
          </p>
          {product.salePrice && (
            <p className="text-lg tracking-wider leading-5">ფასდაკლებით: {product.salePrice}₾</p>
          )}
        </div>
      </div>
    </Link>
  )
}

export default Option
