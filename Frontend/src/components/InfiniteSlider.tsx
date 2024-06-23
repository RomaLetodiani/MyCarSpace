import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
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
      <div className="absolute inset-0 z-20 before:absolute before:left-0 before:top-0 before:w-1/4 before:h-full before:bg-gradient-to-r before:from-white before:to-transparent before:filter before:blur-3 after:absolute after:right-0 after:top-0 after:w-1/4 after:h-full after:bg-gradient-to-l after:from-white after:to-transparent after:filter after:blur-3"></div>
      <motion.div
        className="flex"
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
