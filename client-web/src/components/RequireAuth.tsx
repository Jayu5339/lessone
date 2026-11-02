import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

export default function requireAuth({to, children}: { to: string; children: ReactNode }) {
  if (!localStorage.getItem('accessToken')) return <Navigate to={to} replace/>
  return <>{children}</>
}