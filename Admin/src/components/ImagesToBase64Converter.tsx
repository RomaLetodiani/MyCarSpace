import { useEffect, useState } from 'react'

type Props = {
  handleChange: (base64Images: string[]) => void
  initialImages: string[]
  id: string
}

const ImageToBase64Converter = ({ handleChange, initialImages = [], id }: Props) => {
  const [base64Images, setBase64Images] = useState(initialImages)

  useEffect(() => {
    handleChange(base64Images.map((base64) => base64.split(',')[1]))
  }, [base64Images])
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const files = Array.from(e.target.files)

    const promises = files.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = (error) => reject(error)
      })
    })

    Promise.all(promises)
      .then((base64Images) => {
        setBase64Images((prev) => [...prev, ...base64Images])
      })
      .catch((error) => {
        throw error
      })
  }

  const handleRemoveImage = (index: number) => {
    const updatedBase64Images = base64Images.filter((_, i) => i !== index)
    setBase64Images(updatedBase64Images)
  }
  return (
    <div className="w-full flex flex-col gap-2 p-5 rounded-xl border bg-white">
      <label htmlFor={id} className="cursor-pointer">
        <p>აირჩიეთ ფოტოები</p>
      </label>
      <input
        id={id}
        accept="image/png, image/jpeg, image/gif"
        className="hidden"
        type="file"
        multiple
        onChange={handleChangeInput}
      />
      {base64Images && (
        <div className="flex flex-wrap gap-5">
          {base64Images.map((base64, index) => (
            <div key={index} className="relative">
              <img src={base64} alt="base64" className="w-20 h-20 rounded-md" />
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageToBase64Converter
