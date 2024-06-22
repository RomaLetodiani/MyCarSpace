import { twMerge } from 'tailwind-merge'

type Props = {
  price: number
  salePrice: number
}

const PriceRender = ({ price, salePrice }: Props) => {
  return (
    <div>
      <p className={twMerge('text-base', salePrice && 'line-through text-sm')}>ფასი: {price}₾</p>
      {salePrice && <p className="text-lg leading-5 font-semibold">ფასდაკლებით: {salePrice}₾</p>}
    </div>
  )
}

export default PriceRender
