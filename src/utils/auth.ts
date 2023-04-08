import Cookies from 'js-cookie'

// Returns the value of the JWT token cookie.
export function getJwtToken() {
  return Cookies.get('jwtToken') || null
}

// Sets the value of the JWT token cookie.
export function setJwtToken(token: string) {
  return Cookies.set('jwtToken', token, { secure: true })
}

// Removes the JWT token cookie.
export function removeJwtToken() {
  return Cookies.remove('jwtToken', { path: '/' })
}
