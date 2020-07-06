const state = {
  isAuthenticated: false,
  token: "",
  isAdmin: false,
  user: {}
};

const getters = {
  getAuth: state => {
    return state.isAuthenticated;
  },
  getAuthToken: state => {
    return state.token;
  },
  getUserData: state => {
    return state.user;
  }
};
const mutations = {
  clearState: state => {
    state.isAuthenticated = false;
    state.isAdmin = false;
    state.token = "";
    state.user = {};
  },
  setAuth: (state, payload) => {
    state.isAuthenticated = payload;
  },
  setAuthToken: (state, payload) => {
    state.token = payload;
  },
  setUserData: (state, pld) => {
    state.user = pld;
  }
};
export default {
  state,
  getters,
  mutations
};
