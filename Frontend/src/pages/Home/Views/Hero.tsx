import { slider1, slider2, slider3 } from '../../../assets'
import Slider from '../../../components/Slider/Slider'

const sliderImages = [slider1, slider2, slider3]

const Hero = () => {
  return (
    <div>
      <Slider images={sliderImages} />
    </div>
  )
}

export default Hero
