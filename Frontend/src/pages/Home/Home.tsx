import BottomFooter from '../../Layout/BottomFooter'
import Hero from './Views/Hero'
import Products from './Views/Products'
import Sales from './Views/Sales'

const Home = () => {
  return (
    <div>
      <Hero />
      <Sales />
      <Products />
      <BottomFooter />
    </div>
  )
}

export default Home
