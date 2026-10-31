import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { INSTRUCTOR_LOGIN_URL } from '../constants'
import '../styles/home.css'

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <div className="home">
      <header className="home-header">
        <Link to="/" className="home-brand">
          <img className="home-brand-mark" src="/logo.svg" alt=""/>
          <strong>LessOne</strong>
        </Link>

        <nav className="home-nav" aria-label="계정">
          <div className="home-menu-wrap" ref={wrapRef}>
            <button
              type="button"
              className="home-btn"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              로그인
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>

            {menuOpen && (
              <div className="home-menu" role="menu" aria-label="로그인 유형">
                <Link to="/student/login" role="menuitem" onClick={() => setMenuOpen(false)}>
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
        <section className="home-hero">
          <span className="home-hero-badge">1:1 레슨 플랫폼</span>
          <h1>
            나에게 맞는 <span className="accent">1:1 레슨</span>,
            <br/>
            LessOne에서 시작하세요
          </h1>
          <p>
            강사는 레슨을 직접 열고, 학생은 원하는 시간에 신청해요.
            보충과 대기까지 한 곳에서 관리합니다.
          </p>
          <div className="home-hero-actions">
            <Link to="/signup" className="home-btn primary large">학생으로 시작하기</Link>
            <a href={INSTRUCTOR_LOGIN_URL} className="home-btn ghost large">강사로 시작하기</a>
          </div>
        </section>

        <section className="home-features" aria-label="주요 특징">
          <article className="home-feature">
            <div className="home-feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                   strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 5v14M5 12h14"/>
              </svg>
            </div>
            <h2>강사가 직접 여는 레슨</h2>
            <p>장소, 시간, 가격, 정원까지 내 방식대로 레슨을 만들어요.</p>
          </article>
          <article className="home-feature">
            <div className="home-feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                   strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="3"/>
                <path d="M16 2v4M8 2v4M3 10h18"/>
              </svg>
            </div>
            <h2>시간 골라 간편 신청</h2>
            <p>가능한 시간대를 고르면 강사가 확인하고 승인해요.</p>
          </article>
          <article className="home-feature">
            <div className="home-feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                   strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12a9 9 0 1 1-3-6.7M21 4v5h-5"/>
              </svg>
            </div>
            <h2>보충과 대기까지</h2>
            <p>보충 가능 기간을 정하고, 정원이 차도 대기로 신청할 수 있어요.</p>
          </article>
        </section>
      </main>

      <footer className="home-footer">
        <div className="home-footer-top">
          <div className="home-footer-info">
            <div className="home-brand small">
              <img className="home-brand-mark" src="/logo.svg" alt=""/>
              <strong>LessOne</strong>
            </div>
            <p>수업 신청과 일정 관리를 한곳에서.</p>
          </div>
          <nav className="home-footer-links" aria-label="푸터">
            <a href="#">이용약관</a>
            <a href="#">개인정보 처리방침</a>
            <a href="#">문의</a>
          </nav>
        </div>
        <p className="home-copy">© 2026 LessOne. All rights reserved.</p>
      </footer>
    </div>
  )
}