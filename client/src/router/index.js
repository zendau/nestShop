import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'

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

router.beforeEach((to, from, next) => {

  const auth = (localStorage.getItem("auth") === 'true')

  if (to.path === "/") {
    if (auth) {
      next("/user")
    } else {
      next('/login')
    }
  } else {
    if (to.meta.requiresAuth === auth) {
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