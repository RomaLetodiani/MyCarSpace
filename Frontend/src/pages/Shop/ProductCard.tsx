import { twMerge } from 'tailwind-merge'
import { logo } from '../../assets'
import { IProduct } from '../../Stores/Filter.Store'
import { sliceText } from '../../utils/Helpers'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }: { product: IProduct }) => {
  return (
    <Link to={product._id}>
      <div
        className={twMerge(
          'border-2 border-b-4 border-r-4 rounded-lg text-secondary cursor-pointer border-secondary',
          'hover:scale-105',
          'transition-all duration-300 ease-in-out',
          'bg-gradient-to-br from-cyan-50 to-slate-100',
          !!product.salePrice && 'bg-gradient-to-tl from-rose-200 to-red-50',
          'flex flex-col gap-2',
          'min-h-[320px] max-w-[250px] p-3',
        )}
      >
        <div className="overflow-hidden rounded-xl bg-white border-secondary border-2 border-t-4 border-l-4 shadow-inner p-5">
          <img
            className="w-full h-full aspect-square"
            src={product.imageUrls[0] ?? logo}
            alt={product.title}
          />
        </div>
        <div>
          {product.salePrice && <h6 className="text-danger font-bold">ფასდაკლება</h6>}
          <h5 className="font-semibold">{product.title}</h5>
          <p className={twMerge('text-base', product.salePrice && 'line-through text-sm')}>
            ფასი: {product.price}₾
          </p>
          {product.salePrice && (
            <p className="text-lg leading-5 font-semibold">ფასდაკლებით: {product.salePrice}₾</p>
          )}
          <p className="text-sm mt-2">{sliceText(product.description, 40)}</p>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
