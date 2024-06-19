import { FormEvent } from 'react'
import Input from '../../components/UI/Input'
import Button from '../../components/UI/Button'
import { InputState } from '../../hooks/useInput'

export type CategoryAddModalProps = {
  handleAdd: (e: FormEvent<HTMLFormElement>) => void
  handleCancel: () => void
  addInput: InputState
}

const CategoryAddModal = ({ handleAdd, handleCancel, addInput }: CategoryAddModalProps) => {
  return (
    <form
      onSubmit={handleAdd}
      className="p-5 mt-5 flex flex-col gap-3 justify-end items-end rounded-lg bg-purple/20 text-primary shadow-2xl"
    >
      <Input {...addInput} label="კატეგორიის სახელი" />
      <div className="flex gap-3">
        <Button type="button" onClick={handleCancel} btnType="secondary" className="px-5">
          გაუქმება
        </Button>
        <Button type="submit" className="px-5">
          შექმნა
        </Button>
      </div>
    </form>
  )
}

export default CategoryAddModal
