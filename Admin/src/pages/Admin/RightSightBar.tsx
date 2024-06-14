import Button from '../../components/UI/Button'
import AdminAvatar from './AdminAvatar'

const RightSightBar = ({ handleLogout }: { handleLogout: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-between p-5">
      <AdminAvatar size="w-32 h-32" />
      <Button onClick={handleLogout} className="bg-sky-300">
        გასვლა
      </Button>
    </div>
  )
}

export default RightSightBar
