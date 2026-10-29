import axios from 'axios'

export const api = axios.create({baseURL: '/api'})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export function getStatus(error: unknown): number | undefined {
  return axios.isAxiosError(error) ? error.response?.status : undefined
}

export function getServerMessage(error: unknown): string | undefined {
  return axios.isAxiosError(error) ? error.response?.data?.message : undefined
}