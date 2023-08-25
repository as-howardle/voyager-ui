

const UserStore = {
  setToken: (token) => {
    localStorage.setItem('token', JSON.stringify(token));
  },

  getToken: () => {
    console.log(localStorage);
    if (localStorage.getItem('token')) {
      return JSON.parse(localStorage.getItem('token')).value;
    }
    return null;
  },

  getTokenExpiry: () => {
    if (localStorage.getItem('token')) {
      return JSON.parse(localStorage.getItem('token')).expiry;
    }
    return null;
  },

  removeToken: () => {
    localStorage.removeItem('token');
  },

  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  },

  getUser: () => {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user'));
    }
    return null;
  },

  removeUser: () => {
    localStorage.removeItem('user');
  }
};

export default UserStore;