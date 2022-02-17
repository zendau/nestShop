import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'
import Admin from '../views/Admin.vue'

import $store from '../store'
import { Role } from './roles'

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
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      requiresAuth: true,
      roles: [Role.Admin]
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
  //const role = $store.state.auth.user.role
  console.log('before router' , authStatus)
  // const auth = (localStorage.getItem("auth") === 'true')

  //debugger

  if (to.path === "/") {
    if (authStatus) {
      next("/user")
    } else {
      next('/login')
    }
  } else {
    if (to.meta.requiresAuth === authStatus) {
      
      if (to.meta.roles?.length > 0) {
        console.log('roles')
      }

      next()
    } else if (to.meta.requiresAuth) {

      await $store.dispatch('auth/checkAuth')
      if (to.meta.roles?.length > 0) {
      
        const res = to.meta.roles.includes($store.state.auth.user.role.value)

        if (res) {
          next()
        } else {
          next('/login')
        }
      } else {
        next()
      }
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