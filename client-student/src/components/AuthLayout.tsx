import type { ReactNode } from 'react'
import '../styles/auth.css'
import { Link } from "react-router-dom";

export default function AuthLayout({children}: { children: ReactNode }) {
  return (
    <div className="auth-page">
      <header className="auth-header">
        <Link to="/" className="brand-link">
          <img className="brand-mark" src="/logo.svg" alt=""/>
          <strong>Lesson Note</strong>
        </Link>
      </header>
      <main className="auth-main">{children}</main>
    </div>
  )
}