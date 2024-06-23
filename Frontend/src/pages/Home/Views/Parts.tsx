import { Link } from 'react-router-dom'
import Button from '../../../components/UI/Button'
import { PartsArray } from '../../../utils/Parts'
import InfiniteSlider from '../../../components/InfiniteSlider'

const Parts = () => {
  return (
    <div className="max-w-[1440px] m-auto p-5 text-center">
      <h2 className="text-3xl font-semibold">ჩვენ გვაქვს ის რაც შენს ავტომობილს სჭირდება</h2>
      <div className="flex gap-8 my-8">
        <InfiniteSlider images={PartsArray} className="my-4" />
      </div>
      <Link to="/shop">
        <Button>მაღაზია</Button>
      </Link>
    </div>
  )
}

export default Parts
