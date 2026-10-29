import type { ReactNode } from 'react'
import '../styles/auth.css'
import { Link } from "react-router-dom";

export default function AuthLayout({children}: { children: ReactNode }) {
  return (
    <div className="auth-page">
      <header className="auth-header">
        <Link to="/" className="brand-link">
          <span className="brand-mark" aria-hidden="true"/>
          <strong>Lesson Note</strong>
        </Link>
      </header>
      <main className="auth-main">{children}</main>
    </div>
  )
}