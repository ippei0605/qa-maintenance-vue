const auth = {
  getSessionObject () {
    const text = sessionStorage.getItem('qa-maintenance');
    return JSON.parse(text);
  },
  loggedIn () {
    const value = this.getSessionObject();
    return value && value.token;
  },
  getUsername () {
    const value = this.getSessionObject();
    return value && value.username ? value.username : 'Guest';
  },
  login (value) {
    const text = JSON.stringify(value);
    sessionStorage.setItem('qa-maintenance', text);
  },
  logout () {
    sessionStorage.removeItem('qa-maintenance');
  }
};

export default auth;
