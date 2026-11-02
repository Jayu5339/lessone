import { Navigate, Route, Routes } from 'react-router-dom'
import RequireAuth from './components/RequireAuth'
import HomePage from './pages/HomePage'
import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'
import StudentHomePage from './pages/student/StudentHomePage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/signup" element={<SignupPage/>}/>
      <Route path="/login" element={<Navigate to="/student/login" replace/>}/>

      <Route path="/student/login" element={<LoginPage role="student"/>}/>
      <Route path="/student/account" element={<Navigate to="/student" replace/>}/>
      <Route
        path="/student"
        element={
          <RequireAuth to="/student/login">
            <StudentHomePage/>
          </RequireAuth>
        }
      />

      <Route path="/instructor" element={<Navigate to="/instructor/login" replace/>}/>
      <Route path="/instructor/login" element={<LoginPage role="instructor"/>}/>
      <Route path="/instructor/lessons" element={<p>로그인 성공</p>}/>
    </Routes>
  )
}