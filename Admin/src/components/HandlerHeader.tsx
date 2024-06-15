import Button from './UI/Button'

type HandlerHeaderProps = {
  handleRows: (action: 'delete' | 'archive' | 'restore') => void
  turnAddMode: () => void
}

const HandlerHeader = ({ handleRows, turnAddMode }: HandlerHeaderProps) => {
  return (
    <div className="flex justify-center items-center w-full p-2 rounded-xl gap-2 text-sm shadow-lg">
      <Button onClick={turnAddMode}>დამატება</Button>
      <Button onClick={() => handleRows('delete')} btnType="danger">
        წაშლა
      </Button>
      <Button onClick={() => handleRows('archive')} btnType="secondary">
        დაარქივება
      </Button>
      <Button onClick={() => handleRows('restore')} btnType="secondary">
        აღდგენა
      </Button>
    </div>
  )
}

export default HandlerHeader
