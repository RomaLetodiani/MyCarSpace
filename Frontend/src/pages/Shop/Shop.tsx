import Filters from './Filters'
import Products from './Products'

const Shop = () => {
  return (
    <div className="flex-1 relative z-30 grid grid-cols-1 md:grid-cols-[300px_minmax(300px,_1500px)] overflow-hidden">
      <Filters />
      <Products />
    </div>
  )
}

export default Shop
