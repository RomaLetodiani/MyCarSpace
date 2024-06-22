import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { logo } from '../../assets'

type ImagesProps = {
  images: string[]
}

const Images = ({ images }: ImagesProps) => {
  const [currentImage, setCurrentImage] = useState(images[0] ?? logo)

  useEffect(() => {
    setCurrentImage(images[0] ?? logo)
  }, [images])
  return (
    <div className="min-w-[200px] max-w-[300px] md:max-w-[500px]">
      <div className="border overflow-hidden rounded-2xl shadow-lg mb-5 p-5">
        <img className="w-full h-full" src={currentImage} alt="current-image" />
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
                currentImage === image
                  ? 'border-secondary hover:border-primary scale-110'
                  : 'border-transparent',
              )}
              onClick={() => setCurrentImage(image)}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default Images
