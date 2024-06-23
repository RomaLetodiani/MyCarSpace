import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import LeftRightWhiteGradient from './LeftRightWhiteGradient'
const InfiniteSlider = ({
  images,
  className,
}: {
  images: { img: string; name: string }[]
  className?: string
}) => {
  const sliderRef = useRef<HTMLDivElement>(null)
  let animationFrame: number | null = null

  useEffect(() => {
    const slider = sliderRef.current

    const handleAnimation = () => {
      if (slider) {
        const scrollWidth = slider.scrollWidth
        const threshold = scrollWidth - slider.offsetWidth // Entire width - visible width

        if (slider.scrollLeft >= threshold) {
          slider.scrollLeft = scrollWidth / 2 // Reset to half of the total width (including duplicates)
        } else {
          slider.scrollLeft += 1 // Scroll speed
        }
        animationFrame = requestAnimationFrame(handleAnimation)
      }
    }

    handleAnimation()

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [])
  const duplicatedSlides = [...images, ...images]

  return (
    <div ref={sliderRef} className={`relative overflow-hidden scroll-smooth ${className}`}>
      <LeftRightWhiteGradient />
      <motion.div
        className="flex gap-5"
        animate={{
          x: ['0%', '-100%'],
          transition: {
            ease: 'linear',
            duration: 15,
            repeat: Infinity,
          },
        }}
      >
        {duplicatedSlides.map((slide, index) => (
          <div
            key={index}
            className="flex-shrink-0 min-w-24"
            style={{ width: `${100 / images.length}%` }}
          >
            <div className="flex items-center justify-center  h-full">
              <img className="w-24 h-24" src={slide.img} alt={slide.name} />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default InfiniteSlider
