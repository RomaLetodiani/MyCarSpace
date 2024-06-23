import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { logo } from '../../assets'
import SliderArrow from '../../components/SliderArrow'
import useMediaQuery from '../../hooks/useMediaQuery'

type ImagesProps = {
  images: string[]
}

const Images = ({ images }: ImagesProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const isNotMobile = useMediaQuery('(min-width: 640px)')
  useEffect(() => {
    setCurrentImageIndex(0)
  }, [images])
  return (
    <div className="flex flex-col sm:flex-row md:flex-col gap-5">
      <div className="flex sm:block w-full relative justify-center items-center px-16 sm:px-0">
        {images.length > 1 && !isNotMobile && (
          <>
            <SliderArrow
              disabled={currentImageIndex === 0}
              direction="left"
              onClick={() => setCurrentImageIndex((prev) => prev - 1)}
            />
            <SliderArrow
              disabled={currentImageIndex === images.length - 1}
              direction="right"
              onClick={() => setCurrentImageIndex((prev) => prev + 1)}
            />
          </>
        )}
        <div className="min-w-[200px] max-w-[300px] max-h-[300px] md:max-w-[500px] md:max-h-[500px] border overflow-hidden rounded-2xl shadow-lg mb-5 p-5">
          <img
            className="w-full h-full"
            src={images[currentImageIndex] ?? logo}
            alt="current-image"
          />
        </div>
      </div>
      {images.length ? (
        <div className="w-full gap-5 flex flex-wrap px-2">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`product-image-${index}`}
              className={twMerge(
                'rounded-md shadow-sm cursor-pointer border-2 object-cover w-16 h-16',
                'transition-all duration-300 ease-in-out transform hover:scale-110 hover:border-secondary/20',
                currentImageIndex === index
                  ? 'border-secondary hover:border-primary scale-110'
                  : 'border-transparent',
              )}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default Images
