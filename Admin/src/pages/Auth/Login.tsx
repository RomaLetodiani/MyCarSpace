import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import authService from '../../services/Auth.Service'
import AuthStore from '../../store/Auth.Store'
import { useInput } from '../../hooks/useInput'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
  const { setTokens, isAuthenticated } = AuthStore()
  const navigate = useNavigate()
  const usernameInput = useInput((username) => typeof username === 'string' && username.length > 5)
  const passwordInput = useInput((password) => typeof password === 'string' && password.length > 5)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    if (
      !usernameInput.value ||
      !passwordInput.value ||
      usernameInput.hasError ||
      passwordInput.hasError
    ) {
      toast.error('არასწორი ინფორმაცია')
      return
    }

    authService
      .login({ username: usernameInput.value as string, password: passwordInput.value as string })
      .then(({ data }) => {
        setTokens(data)
        toast.success('წარმატებით შეხვედით სისტემაში')
        navigate('/')
      })
      .catch((err) => {
        console.log('🔥 ~ .then ~ err:', err)
        toast.error('არასწორი ინფორმაცია')
      })
      .finally(() => {
        setLoading(false)
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
        <Button disabled={loading} className="bg-sky-300">
          Sign In
        </Button>
      </form>
    </div>
  )
}

export default Login
