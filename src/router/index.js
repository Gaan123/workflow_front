import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Auth/Login.vue'
import Products from '../views/Products/Index.vue'
import ProductsCreate from '../views/Products/Create.vue'
import ProductsApprove from '../views/Products/Approve.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
    meta: {
      is_admin: true
    }
  },
   {
    path: '/products/create',
    name: 'ProductsCreate',
    component: ProductsCreate,
    meta: {
      is_admin: true
    }
  },
  {
    path: '/products/:id/edit',
    name: 'ProductsUpdate',
    component: ProductsCreate,
    meta: {
      is_admin: true
    }
  },
  {
    path: '/products/:id/approve',
    name: 'Approve',
    component: ProductsApprove,
    meta: {
      is_admin: true
    }
  },
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// Meta Handling
router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('userToken') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      let user = JSON.parse(localStorage.getItem('user'))
      if (to.matched.some(record => record.meta.is_admin)) {
        if (user.is_admin == 1) {
          next()
        } else {
          next({ name: 'About' })
        }
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('userToken') == null) {
      next()
    } else {
      next({ name: 'About' })
    }
  } else {
    next()
  }
})
export default router
