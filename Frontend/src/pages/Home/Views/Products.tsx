import GlobalStore from '../../../Stores/Global.Store'
import { logo } from '../../../assets'
import Button from '../../../components/UI/Button'

const Products = () => {
  const { products } = GlobalStore()
  return products.length ? (
    <div className="max-w-[1440px] m-auto p-5 my-8 grid text-center">
      <h2 className="text-2xl font-semibold">პროდუქტები</h2>
      <div className="flex overflow-x-auto m-5 py-1 gap-5">
        {products.map((product, index) => (
          <div key={index} className="min-w-[200px] p-2 rounded-xl border">
            <div className="">
              <img src={product.imageUrls[0] ?? logo} alt={product.title} />
            </div>
            <p className="font-bold">{product.title}</p>
          </div>
        ))}
      </div>
      <Button className="place-self-center">მეტის ნახვა</Button>
    </div>
  ) : null
}

export default Products
