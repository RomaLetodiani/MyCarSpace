import { toast } from 'react-toastify'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import { useInput } from '../../hooks/useInput'
import AuthStore from '../../store/Auth.Store'
import 'react-toastify/dist/ReactToastify.css'
import { authService } from '../../services/AuthServices'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Login = () => {
  const { setTokens, isAuthenticated } = AuthStore()
  const navigate = useNavigate()
  const usernameInput = useInput((username: string) => username.length > 5)
  const passwordInput = useInput((password: string) => password.length > 5)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (
      !usernameInput.value ||
      !passwordInput.value ||
      usernameInput.hasError ||
      passwordInput.hasError
    ) {
      toast.error('Invalid username or password')
      return
    }

    authService
      .login({ username: usernameInput.value, password: passwordInput.value })
      .then(({ data }) => {
        setTokens(data)
        toast.success('Login successful')
        navigate('/')
      })
  }
  return (
    <div className="flex bg-slate-200 items-center justify-center flex-col flex-1">
      <h1 className="font-bold text-xl">Welcome Back Admin</h1>
      <p className="text-xs">Please Sign In</p>
      <form
        onSubmit={handleSubmit}
        action="submit"
        className="flex flex-col gap-2 mt-5 border rounded-2xl p-3 bg-slate-400"
      >
        <Input label="Username" {...usernameInput} />
        <Input label="Password" {...passwordInput} />
        <Button className="bg-sky-300">Sign In</Button>
      </form>
    </div>
  )
}

export default Login
