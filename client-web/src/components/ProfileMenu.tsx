import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getMe, type Me } from '../api/members'
import { getStatus } from '../api/client'
import '../styles/profile-menu.css'

type Mode = 'student' | 'instructor'

const MODE = {
  student: {label: '학생 모드', switchLabel: '강사 모드로 전환', switchTo: '/instructor/lessons'},
  instructor: {label: '강사 모드', switchLabel: '학생 모드로 전환', switchTo: '/student/lessons'},
} as const

function Icon({children}: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  )
}

export default function ProfileMenu({mode}: { mode: Mode }) {
  const navigate = useNavigate()
  const wrapRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [me, setMe] = useState<Me | null>(null)
  const m = MODE[mode]

  useEffect(() => {
    let alive = true
    getMe()
      .then((data) => alive && setMe(data))
      .catch((err) => {
        if (alive && getStatus(err) === 401) {
          localStorage.removeItem('accessToken')
          navigate(mode === 'student' ? '/student/login' : '/instructor/login', {replace: true})
        }
      })
    return () => {
      alive = false
    }
  }, [mode, navigate])

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('keydown', onKeyDown)
  }, [])

  function logout() {
    localStorage.removeItem('accessToken')
    navigate('/', {replace: true})
  }

  const initial = (me?.name.trim().charAt(0) || '·')

  return (
    <div className="pm-wrap" ref={wrapRef}>
      <button
        type="button"
        className={`pm-trigger${open ? ' open' : ''}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="내 프로필 메뉴"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="pm-avatar">{initial}</span>
        <span className="pm-name">{me?.name ?? ''}</span>
        <svg className="pm-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>

      {open && (
        <>
          <div className="pm-backdrop" onClick={() => setOpen(false)}/>
          <div className="pm-menu" role="menu" aria-label="내 프로필">
            <div className="pm-who">
              <span className="pm-avatar lg">{initial}</span>
              <div>
                <strong>{me?.name ?? '불러오는 중...'}</strong>
                <span>{me ? `@${me.username}` : ''}</span>
              </div>
            </div>
            <span className="pm-mode">{m.label}</span>

            <button type="button" role="menuitem" className="pm-item" disabled>
              <Icon>
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 21c0-4 4-7 8-7s8 3 8 7"/>
              </Icon>
              내 정보
              <small>준비 중</small>
            </button>
            <button type="button" role="menuitem" className="pm-item" disabled>
              <Icon>
                <circle cx="12" cy="12" r="3"/>
                <path
                  d="M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.4-2.3 1a7 7 0 0 0-2-1.2L14 3h-4l-.4 2.7a7 7 0 0 0-2 1.2l-2.3-1-2 3.4 2 1.5A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.5 2 3.4 2.3-1a7 7 0 0 0 2 1.2L10 21h4l.4-2.7a7 7 0 0 0 2-1.2l2.3 1 2-3.4-2-1.5c.1-.4.1-.8.1-1.2z"/>
              </Icon>
              설정
              <small>준비 중</small>
            </button>

            <div className="pm-sep"/>

            <Link to={m.switchTo} role="menuitem" className="pm-item switch" onClick={() => setOpen(false)}>
              <Icon>
                <path d="M17 3l4 4-4 4M21 7H9M7 21l-4-4 4-4M3 17h12"/>
              </Icon>
              {m.switchLabel}
            </Link>
            <button type="button" role="menuitem" className="pm-item" disabled>
              <Icon>
                <circle cx="12" cy="12" r="9"/>
                <path d="M9.5 9a2.5 2.5 0 0 1 5 .5c0 1.5-2.5 2-2.5 3.5M12 17h.01"/>
              </Icon>
              도움말 · 문의
              <small>준비 중</small>
            </button>

            <div className="pm-sep"/>

            <button type="button" role="menuitem" className="pm-item danger" onClick={logout}>
              <Icon>
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
              </Icon>
              로그아웃
            </button>
          </div>
        </>
      )}
    </div>
  )
}