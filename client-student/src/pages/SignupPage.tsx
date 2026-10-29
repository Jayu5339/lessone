import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../api/auth'
import { getServerMessage } from '../api/client'
import AuthLayout from '../components/AuthLayout'

const SERVER_MESSAGES: Record<string, string> = {
  'Username already exists': '이미 사용 중인 아이디예요.',
  'Phone number already registered': '이미 가입된 전화번호예요.',
}

interface SignupForm {
  username: string
  password: string
  password2: string
  name: string
  phone: string
}

function formatPhone(value: string) {
  const d = value.replace(/\D/g, '').slice(0, 11)
  if (d.length < 4) return d
  if (d.length < 8) return `${d.slice(0, 3)}-${d.slice(3)}`
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`
}

function validate(v: SignupForm) {
  if (!/^[a-zA-Z0-9_]{4,20}$/.test(v.username)) return '아이디는 영문, 숫자, _ 4~20자로 입력해 주세요.'
  if (v.password.length < 8 || v.password.length > 50) return '비밀번호는 8~50자로 입력해 주세요.'
  if (v.password !== v.password2) return '비밀번호가 서로 달라요.'
  if (!v.name.trim()) return '이름을 입력해 주세요.'
  if (!/^01[0-9]{9}$/.test(v.phone.replace(/-/g, ''))) return '전화번호를 올바르게 입력해 주세요.'
  return ''
}

export default function SignupPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState<SignupForm>({
    username: '',
    password: '',
    password2: '',
    name: '',
    phone: '',
  })
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (key: keyof SignupForm) => (e: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [key]: e.target.value })

  const onPhoneChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, phone: formatPhone(e.target.value) })

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const message = validate(form) || (agreed ? '' : '약관에 동의해 주세요.')
    if (message) {
      setError(message)
      return
    }
    setError('')
    setLoading(true)
    try {
      await signup({
        username: form.username,
        password: form.password,
        name: form.name.trim(),
        phone: form.phone.replace(/-/g, ''),
      })
      navigate('/login', { state: { signedUp: true } })
    } catch (err) {
      const server = getServerMessage(err)
      setError((server && SERVER_MESSAGES[server]) || '회원가입에 실패했어요. 입력 내용을 확인해 주세요.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <form className="auth-card wide" onSubmit={handleSubmit}>
        <div className="auth-head">
          <h1>회원가입</h1>
        </div>
        <div className="field">
          <label htmlFor="username">아이디</label>
          <input id="username" autoComplete="username" value={form.username} onChange={set('username')} />
          <span className="hint">영문, 숫자, _ 사용 · 4~20자</span>
        </div>
        <div className="field">
          <label htmlFor="password">비밀번호</label>
          <input id="password" type="password" autoComplete="new-password" value={form.password} onChange={set('password')} />
          <span className="hint">8~50자</span>
        </div>
        <div className="field">
          <label htmlFor="password2">비밀번호 확인</label>
          <input id="password2" type="password" autoComplete="new-password" value={form.password2} onChange={set('password2')} />
        </div>
        <div className="field">
          <label htmlFor="name">이름</label>
          <input id="name" autoComplete="name" value={form.name} onChange={set('name')} />
        </div>
        <div className="field">
          <label htmlFor="phone">전화번호</label>
          <input id="phone" type="tel" inputMode="numeric" autoComplete="tel" maxLength={13}
                 value={form.phone} onChange={onPhoneChange} />
        </div>
        <label className="check">
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
          개인정보 수집·이용 및 서비스 이용약관에 동의해요
        </label>
        <p className="error" role="alert">{error}</p>
        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? '가입 중...' : '계정 만들기'}
        </button>
        <p className="auth-foot">
          이미 계정이 있으신가요? <Link to="/login">로그인</Link>
        </p>
      </form>
    </AuthLayout>
  )
}