import Button from '../UI/Button'

type OptionsProps = {
  options: any[]
  loading: boolean
  visible: boolean
}

const Options = ({ options, loading, visible }: OptionsProps) => {
  if (loading) return <div>loading</div>
  return (
    visible && (
      <div>
        {options.map((option, index) => (
          <div key={index}>{option.name}</div>
        ))}
        <div>
          <Button>მეტის ნახვა</Button>
        </div>
      </div>
    )
  )
}

export default Options
