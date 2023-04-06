

const UserStore = {
  setToken: (token) => {
    localStorage.setItem('token', JSON.stringify(token));
  },

  getToken: () => {
    if (localStorage.getItem('token')) {
      return JSON.parse(localStorage.getItem('token')).value;
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