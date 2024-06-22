import BottomFooter from '../../Layout/BottomFooter'
import fetchProducts from './Views/FetchProducts'
import Hero from './Views/Hero'
import Products from './Views/Products'

const Home = () => {
  fetchProducts()
  return (
    <div>
      <Hero />
      <Products />
      <BottomFooter />
    </div>
  )
}

export default Home
