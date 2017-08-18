const auth = {
  loggedIn () {
    const text = sessionStorage.getItem('qa-maintenance')
    const value = JSON.parse(text)
    if (value && value.token) {
      return true
    } else {
      return false
    }
  },
  login (value) {
    const text = JSON.stringify(value)
    sessionStorage.setItem('qa-maintenance', text)
  },
  logout () {
    sessionStorage.removeItem('qa-maintenance')
  }
}

export default auth
