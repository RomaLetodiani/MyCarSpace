import BottomFooter from '../../Layout/BottomFooter'
import Hero from './Views/Hero'
import Parts from './Views/Parts'
import RenderProducts from './Views/RenderProducts'

const Home = () => {
  return (
    <div>
      <Hero />
      <Parts />
      <RenderProducts />
      <BottomFooter />
    </div>
  )
}

export default Home
