import type { ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'
import '../styles/student.css'
import ProfileMenu from './ProfileMenu'

const TABS = [
  {to: '/student', label: '홈', ready: true},
  {to: '/student/lessons', label: '레슨 찾기', ready: false},
  {to: '/student/applications', label: '내 수업', ready: false},
]

export default function StudentLayout({children}: { children: ReactNode }) {
  return (
    <div className="stu-page">
      <header className="stu-header">
        <Link to="/student" className="stu-brand">
          <img className="stu-brand-mark" src="/logo.svg" alt=""/>
          <strong>LessOne</strong>
        </Link>

        <nav className="stu-nav" aria-label="메인 메뉴">
          {TABS.map((tab) =>
            tab.ready ? (
              <NavLink key={tab.to} to={tab.to} end className="stu-tab">
                {tab.label}
              </NavLink>
            ) : (
              <span key={tab.to} className="stu-tab disabled" aria-disabled="true">
              {tab.label}
            </span>
            ),
          )}
        </nav>

        <ProfileMenu mode="student"/>
      </header>

      <main className="stu-main">{children}</main>
    </div>
  )
}