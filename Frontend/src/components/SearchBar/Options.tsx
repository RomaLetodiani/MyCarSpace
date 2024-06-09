type OptionsProps = {
  options: any[]
  loading: boolean
  visible: boolean
}

const Options = ({ options, loading, visible }: OptionsProps) => {
  return (
    <div>
      {options.map((option, index) => (
        <div key={index}>{option.name}</div>
      ))}
    </div>
  )
}

export default Options
