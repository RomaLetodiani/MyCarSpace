import BottomFooter from '../../Layout/BottomFooter'
import GlobalStore from '../../Stores/Global.Store'
import Loading from '../Loading/Loading'
import Hero from './Views/Hero'
import Products from './Views/Products'
import Sales from './Views/Sales'

const Home = () => {
  const { loading } = GlobalStore()
  return (
    <div>
      <Hero />
      <div className="min-h-screen">
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <Loading />
          </div>
        ) : (
          <>
            <Sales />
            <Products />
          </>
        )}
      </div>
      <BottomFooter />
    </div>
  )
}

export default Home
