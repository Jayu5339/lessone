import { Link } from 'react-router-dom'
import '../styles/home.css'

export default function HomePage() {
  return (
    <div className="home">
      <header className="home-header">
        <div className="home-brand">
          <Link to="/" className="home-brand">
            <span className="home-brand-mark" aria-hidden="true"/>
            <strong>Lesson Note</strong>
          </Link>
        </div>
        <nav className="home-nav" aria-label="계정">
          <Link className="home-btn" to="/login">로그인</Link>
          <Link className="home-btn primary" to="/signup">회원가입</Link>
        </nav>
      </header>

      <main className="home-main">
        <h1>
          수업 신청부터 일정 확인까지,
          <br/>
          한곳에서 간편하게
        </h1>
        <p>Lesson Note에서 강사의 수업을 신청하고 내 수업 일정을 한눈에 확인해 보세요.</p>
      </main>

      <footer className="home-footer">
        <div className="home-footer-top">
          <div className="home-footer-info">
            <div className="home-brand small">
              <span className="home-brand-mark" aria-hidden="true"/>
              <strong>Lesson Note</strong>
            </div>
            <p>수업 신청과 일정 관리를 한곳에서.</p>
          </div>
          <nav className="home-footer-links" aria-label="푸터">
            <a href="#">이용약관</a>
            <a href="#">개인정보 처리방침</a>
            <a href="#">문의</a>
          </nav>
        </div>
        <p className="home-copy">© 2026 Lesson Note. All rights reserved.</p>
      </footer>
    </div>
  )
}