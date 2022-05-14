export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticationService {
    logout() {
      sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
    }
  
    isUserLoggedIn() {
      let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
      if (user == null) {
        return false
      } else {
        return true
      }
    }
  
    getLoggedInUserName() {
      let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
  
      if (user === null) return ''
      return user
    }
  
    login(email: string) {
      sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, email)
    }
  }
  
  export default new AuthenticationService()