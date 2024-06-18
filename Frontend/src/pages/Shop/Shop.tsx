import SectionWrapper from '../../components/SectionWrapper'
import Filters from './Filters'
import Products from './Products'

const Shop = () => {
  return (
    <SectionWrapper>
      <div className="flex">
        <Filters />
        <Products />
      </div>
    </SectionWrapper>
  )
}

export default Shop
