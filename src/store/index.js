import { createStore } from "vuex";
import createPersistedState from "vuex-plugin-persistedstate";
import setAuthHeader from '../libs/apis/axiosConfig'

const store = createStore({
    state: {
        token: '',
        user: {},
        role: '',
        email: '',
    },

    getters: {
        token: state => state.token,
        user: state => state.user,
        role: state => state.role,
        email: state => state.email,
    },

    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        clearTokenAndUser(state) {
            state.token = null;
            state.user = null;
            state.role = null;
        },
        setUser(state, user) {
            state.user = user;
        },
        setRole(state, role) {
            state.role = role;
        },
        setEmail(state, email) {
            state.email = email;
          },
    },

    actions: {
        setAuthHeaderIfNeeded({ state }) {
            if (state.token) {
                setAuthHeader(state.token);
            } else {
                setAuthHeader(false);
            }
        },
    },
    

    plugins: [createPersistedState()],
})

export default store