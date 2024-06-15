import { useState } from 'react'

type Props = {
  handleChange: (base64Images: string[]) => void
  initialImages: string[]
  id: string
}

const ImageToBase64Converter = ({ handleChange, initialImages = [], id }: Props) => {
  const [base64Images, setBase64Images] = useState(initialImages)
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
        setBase64Images(base64Images)
        handleChange(base64Images.map((base64) => base64.split(',')[1]))
      })
      .catch((error) => {
        throw error
      })
  }
  return (
    <label htmlFor={id}>
      <div className="w-full flex flex-col gap-2 p-5 cursor-pointer rounded-xl border bg-white">
        <p>აირჩიეთ ფოტოები</p>
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
              <img key={index} src={base64} alt="base64" className="w-20 h-20 rounded-md" />
            ))}
          </div>
        )}
      </div>
    </label>
  )
}

export default ImageToBase64Converter
