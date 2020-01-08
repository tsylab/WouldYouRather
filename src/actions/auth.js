export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'

/**
 * Login user
 * @param {*} id user Id
 */
export function loginUser(id) {
  return {
    type: LOGIN_USER,
    id
  }
}

/**
 * Logout user
 */
export function logoutUser() {
  return {
    type: LOGOUT_USER
  }
}