import { twMerge } from 'tailwind-merge'
import { useEffect, useState } from 'react'
import Button from '../../../components/UI/Button'
import { Link } from 'react-router-dom'
import usePreloadImages from '../../../hooks/usePreloadImages'
import bgHero1 from '../../../assets/Images/Slider/1.jpg'
import bgHero2 from '../../../assets/Images/Slider/2.jpg'
import bgHero3 from '../../../assets/Images/Slider/3.jpg'
import bgHero4 from '../../../assets/Images/Slider/4.jpg'
import bgHero5 from '../../../assets/Images/Slider/5.jpg'
import bgHero6 from '../../../assets/Images/Slider/6.jpg'

const imageUrls = [bgHero1, bgHero2, bgHero3, bgHero4, bgHero5, bgHero6]

const Hero = () => {
  const [bgIndex, setBgIndex] = useState(0)
  const heroBgs = ['bg-hero-1', 'bg-hero-2', 'bg-hero-3', 'bg-hero-4', 'bg-hero-5', 'bg-hero-6']

  usePreloadImages(imageUrls)

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % heroBgs.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="max-w-[1440px] mx-auto relative overflow-hidden min-[1441px]:rounded-b-3xl">
      <div
        className={twMerge(
          'h-full bg-no-repeat bg-center bg-cover min-h-[500px] overflow-hidden',
          'transition-all duration-500 ease-in-out',
          heroBgs[bgIndex],
        )}
      >
        <div className="absolute inset-0 backdrop-blur-sm md:backdrop-blur-0 bg-black/50"></div>
        <div className="absolute left-1/2 lg:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:-translate-x-0 min-w-[330px] lg:w-[40%] p-5 rounded-lg bg-white/80">
          <p className="font-semibold">დაზოგე 30% ზე მეტი</p>
          <h1 className="text-4xl lg:text-5xl tracking-wider lg:leading-normal mb-5 font-bold">
            ყველა ნაწილი ერთ სივრცეში
          </h1>
          <Link to={'/shop'}>
            <Button>იხილეთ პროდუქტი</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero
