import GlobalStore from '../../../Stores/Global.Store'
import Loading from '../../Loading/Loading'
import Products from './Products'
import Sales from './Sales'

const RenderProducts = () => {
  const { loading } = GlobalStore()
  return loading ? (
    <div className="flex justify-center items-center min-h-screen">
      <Loading />
    </div>
  ) : (
    <>
      <Sales />
      <Products />
    </>
  )
}

export default RenderProducts
