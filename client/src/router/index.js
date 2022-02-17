import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'

import $store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    meta: {
      requiresAuth: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: "active"
})

router.beforeEach(async (to, from, next) => {

  const authStatus = $store.state.auth.authStatus
  console.log('before router' , authStatus)
  // const auth = (localStorage.getItem("auth") === 'true')

  if (to.path === "/") {
    if (authStatus) {
      next("/user")
    } else {
      next('/login')
    }
  } else {
    if (to.meta.requiresAuth === authStatus) {
      next()
    } else if (to.meta.requiresAuth) {
      $store.dispatch('auth/checkAuth')
      next()
    } else {

      next({
        path: "/",
        query: {
          error: "noAuth"
        }
      })
    }
  }
})

export default router