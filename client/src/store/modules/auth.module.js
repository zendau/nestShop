import $api from "../../axios";
import jwt_decode from "jwt-decode";

export const auth = {
  namespaced: true,
  state: {
    user: {
        id: null,
        login: null,
        email: null
    },
    error: ""
  },
  actions: {
    async login({ commit }, loginData) {
        try {
            const resData = await $api.post('/auth/login', {
                email: loginData.email,
                password: loginData.password
            })
            console.log('res', resData)

            const tokenDecode = jwt_decode(resData.data.accessToken)
            console.log('token', tokenDecode)
            commit('loginSuccess', tokenDecode)
        } catch (e) {
            console.log('e', e)
            commit('loginFailed', e.response.data)
        }
    },
    logout() {
    },
    async register({ commit }, registerData) {
        try {
            const resData = await $api.post('/auth/register', {
                email: registerData.email,
                password: registerData.password,
                confirmPassword: registerData.confirmPassword
            })
            console.log('res', resData)

            const tokenDecode = jwt_decode(resData.data.accessToken)

            commit('registerSuccess', tokenDecode)
        } catch (e) {
            commit('registerFailed', e.response.data)
        }
    }
  },
  mutations: {
    loginSuccess(state, userData) {
        console.log(userData, state)
    },
    loginFailed(state, error) {
        const msg = error.message

        if (typeof msg === 'string') {
            state.error = error.message
        } else {
            state.error = error.message[0]
        }
    },
    logout() {
    },
    registerSuccess(state, userData) {
        console.log(userData, state)
    },
    registerFailed(state, error) {
        const msg = error.message

        if (typeof msg === 'string') {
            state.error = error.message
        } else {
            state.error = error.message[0]
        }
    },
    clearErrorMessage(state) {
        state.error = ""
    }
  }
};