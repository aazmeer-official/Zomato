import api from './api'

export const getFoods = async () => {
  const { data } = await api.get('/food')
  return data
}

export const createFood = async (formData) => {
  const { data } = await api.post('/food', formData)
  return data
}
