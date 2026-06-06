const AUTH_STORAGE_KEY = 'zesty.auth'
const PARTNER_FOODS_PREFIX = 'zesty.partnerFoods'

export const getStoredAuth = () => {
  try {
    const rawAuth = window.localStorage.getItem(AUTH_STORAGE_KEY)
    return rawAuth ? JSON.parse(rawAuth) : null
  } catch {
    return null
  }
}

export const setStoredAuth = (auth) => {
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth))
}

export const clearStoredAuth = () => {
  window.localStorage.removeItem(AUTH_STORAGE_KEY)
}

const getPartnerFoodsKey = (partnerId) => `${PARTNER_FOODS_PREFIX}.${partnerId}`

export const getStoredPartnerFoods = (partnerId) => {
  if (!partnerId) {
    return []
  }

  try {
    const rawFoods = window.localStorage.getItem(getPartnerFoodsKey(partnerId))
    return rawFoods ? JSON.parse(rawFoods) : []
  } catch {
    return []
  }
}

export const setStoredPartnerFoods = (partnerId, foods) => {
  if (!partnerId) {
    return
  }

  window.localStorage.setItem(getPartnerFoodsKey(partnerId), JSON.stringify(foods))
}
