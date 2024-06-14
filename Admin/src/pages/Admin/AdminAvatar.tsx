import { avatar } from '../../assets'
import Avatar, { Size } from '../../components/Avatar'
import AuthStore from '../../store/Auth.Store'

const AdminAvatar = ({ size }: { size: Size }) => {
  const { user } = AuthStore()

  if (!user) {
    return null
  }
  return (
    <Avatar
      src={avatar}
      alt={user.username}
      username={user.username}
      role={user.role}
      size={size}
    />
  )
}

export default AdminAvatar
