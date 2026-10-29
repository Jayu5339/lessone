import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { INSTRUCTOR_LOGIN_URL } from '../constants'
import '../styles/home.css'

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menuOpen) return

    const onMouseDown = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  return (
    <div className="home">
      <header className="home-header">
        <Link to="/" className="home-brand">
          <span className="home-brand-mark" aria-hidden="true"/>
          <strong>lesson-note</strong>
        </Link>
        <nav className="home-nav" aria-label="계정">
          <div className="home-menu-wrap" ref={menuRef}>
            <button
              type="button"
              className="home-btn"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              로그인
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
            {menuOpen && (
              <div className="home-menu" role="menu" aria-label="로그인 유형">
                <Link to="/login" role="menuitem" onClick={() => setMenuOpen(false)}>
                  <strong>학생 로그인</strong>
                  <span>수업을 신청하고 확인해요</span>
                </Link>
                <a href={INSTRUCTOR_LOGIN_URL} role="menuitem">
                  <strong>강사 로그인</strong>
                  <span>내 수업을 관리해요</span>
                </a>
              </div>
            )}
          </div>
          <Link className="home-btn primary" to="/signup">회원가입</Link>
        </nav>
      </header>

      <main className="home-main">
        <h1>
          수업 신청부터 일정 확인까지,
          <br/>
          한곳에서 간편하게
        </h1>
        <p>lesson-note에서 강사의 수업을 신청하고 내 수업 일정을 한눈에 확인해 보세요.</p>
      </main>

      <footer className="home-footer">
        <div className="home-footer-top">
          <div className="home-footer-info">
            <div className="home-brand small">
              <span className="home-brand-mark" aria-hidden="true"/>
              <strong>lesson-note</strong>
            </div>
            <p>수업 신청과 일정 관리를 한곳에서.</p>
          </div>
          <nav className="home-footer-links" aria-label="푸터">
            <a href="#">이용약관</a>
            <a href="#">개인정보 처리방침</a>
            <a href="#">문의 [이메일 주소]</a>
          </nav>
        </div>
        <p className="home-copy">© 2026 lesson-note. All rights reserved.</p>
      </footer>
    </div>
  )
}