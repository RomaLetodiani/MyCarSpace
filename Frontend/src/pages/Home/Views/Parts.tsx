import { Link } from 'react-router-dom'
import Button from '../../../components/UI/Button'
import InfiniteSlider from '../../../components/InfiniteSlider'
import { PartsArray } from '../../../utils/PartsInfo'

const Parts = () => {
  return (
    <div className="max-w-[1440px] m-auto rounded-b-3xl shadow-[0_25px_10px_-20px_rgb(0,0,0,0.1)] mt-10 p-5 text-center">
      <h2 className="text-3xl font-semibold">ჩვენ გვაქვს ის რაც შენს ავტომობილს სჭირდება</h2>
      <div className="flex gap-8 my-8">
        <InfiniteSlider images={PartsArray} />
      </div>
      <Link to="/shop">
        <Button>მეტის ნახვა</Button>
      </Link>
    </div>
  )
}

export default Parts
