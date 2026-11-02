import { api } from './client'

export interface Me {
  name: string
  username: string
  phone: string
  createdAt: string
}

export const getMe = () => api.get<Me>('/members/me').then((res) => res.data)