import api from './api'

export const registerUser = async (payload) => {
  const { data } = await api.post('/auth/user/register', payload)
  return data
}

export const loginUser = async (payload) => {
  const { data } = await api.post('/auth/user/login', payload)
  return data
}

export const logoutUser = async () => {
  const { data } = await api.get('/auth/user/logout')
  return data
}

export const registerFoodPartner = async (payload) => {
  const { data } = await api.post('/auth/food-partner/register', payload)
  return data
}

export const loginFoodPartner = async (payload) => {
  const { data } = await api.post('/auth/food-partner/login', payload)
  return data
}

export const logoutFoodPartner = async () => {
  const { data } = await api.get('/auth/food-partner/logout')
  return data
}
