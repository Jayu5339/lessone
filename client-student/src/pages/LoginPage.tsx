import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { login } from '../api/auth'
import { getStatus } from '../api/client'
import { INSTRUCTOR_LOGIN_URL } from '../constants'
import AuthLayout from '../components/AuthLayout'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const signedUp = (location.state as { signedUp?: boolean } | null)?.signedUp

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!username.trim() || !password) {
      setError('아이디와 비밀번호를 입력해 주세요.')
      return
    }

    setError('')
    setLoading(true)
    try {
      const data = await login({username: username.trim(), password})
      localStorage.setItem('accessToken', data.accessToken)
      navigate('/account')
    } catch (err) {
      setError(
        getStatus(err) === 401
          ? '아이디 또는 비밀번호가 올바르지 않아요.'
          : '로그인에 실패했어요. 잠시 후 다시 시도해 주세요.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-head">
          <h1>학생 로그인</h1>
          <p>아이디와 비밀번호를 입력해 주세요.</p>
        </div>

        {signedUp && <p className="notice">회원가입이 완료되었어요. 로그인해 주세요.</p>}

        <div className="field">
          <label htmlFor="username">아이디</label>
          <input
            id="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <p className="error" role="alert">{error}</p>
        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? '로그인 중...' : '로그인'}
        </button>

        <p className="auth-foot">
          아직 계정이 없으신가요? <Link to="/signup">회원가입</Link>
        </p>
        <p className="auth-foot alt">
          강사이신가요? <a href={INSTRUCTOR_LOGIN_URL}>강사 로그인</a>
        </p>
      </form>
    </AuthLayout>
  )
}