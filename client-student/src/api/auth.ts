import { api } from './client'

export interface SignupRequest {
  username: string
  password: string
  name: string
  phone: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  tokenType: string
  expiresIn: number
}

export const signup = (body: SignupRequest) =>
  api.post('/auth/signup', body).then((res) => res.data)

export const login = (body: LoginRequest) =>
  api.post<LoginResponse>('/auth/login', body).then((res) => res.data)
