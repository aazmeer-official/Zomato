import axios from 'axios'

const DEFAULT_API_URL = 'http://localhost:3000/api'

const normalizeBaseURL = (url) => {
  const baseURL = (url || DEFAULT_API_URL).trim().replace(/\/+$/, '')

  if (baseURL.endsWith('/api')) {
    return baseURL
  }

  return `${baseURL}/api`
}

const api = axios.create({
  baseURL: normalizeBaseURL(import.meta.env.VITE_API_URL),
  withCredentials: true,
  timeout: 15000,
  headers: {
    Accept: 'application/json',
  },
})

export const getApiError = (error, fallbackMessage = 'Something went wrong') => {
  if (error?.response?.data?.message) {
    return error.response.data.message
  }

  if (error?.message === 'Network Error') {
    return 'Cannot reach the backend. Make sure the backend server is running and accepting frontend requests.'
  }

  return error?.message || fallbackMessage
}

export default api
