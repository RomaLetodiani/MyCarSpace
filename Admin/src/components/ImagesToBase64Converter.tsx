import { useState } from 'react'

type Props = {
  handleChange: (base64Images: string[]) => void
  initialImage: string[]
}

const ImageToBase64Converter = ({ handleChange, initialImage = [] }: Props) => {
  const [base64Images, setBase64Images] = useState(initialImage)
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
        handleChange(base64Images)
      })
      .catch((error) => {
        throw error
      })
  }
  return (
    <div className="w-full flex flex-col gap-2">
      <input type="file" onChange={handleChangeInput} />
      {base64Images && (
        <div>
          {base64Images.map((base64, index) => (
            <img key={index} src={base64} alt="base64" className="w-20 h-20" />
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageToBase64Converter
