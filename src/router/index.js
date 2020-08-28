import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import First from '../components/First.vue'
import AAa from '../components/AA.vue'
import BBb from '../components/BB.vue'
import Element from '../components/ele/Element.vue'

Vue.use(VueRouter)
const routes = [
  {
    path: '/wangjunyu',
    component: First,
    children: [
      {
        path: '/aaa',
        component: AAa
      },
      {
        path: '/bbb',
        component: BBb
      }
    ]
  },
  {
    path: '/console',
    component: Element
  },
  {
    path: '/',
    name: 'about',
    component: () => import('../views/About.vue'),
    children: [
      {
        path: '/college',
        component: () => import('../views/College.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
