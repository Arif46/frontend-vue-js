import Vue from 'vue'
import VueRouter from 'vue-router'
import designerServiceRoutes from '../modules/designer-service/configuration/routes'

Vue.use(VueRouter)

const childRoutes = (prop) => [
  {
    path: '',
    meta: { auth: false },
    redirect: { name: 'designer_service.configuration.home' }
  },
  {
    path: '/designer-service/configuration',
    name: prop + '.designer_service.configuration',
    meta: { auth: false },
    redirect: { name: 'designer_service.configuration.home' }
  }
]

const defaultRoutes = [
  {
    path: '',
    name: 'dashboard',
    meta: { auth: false },
    children: childRoutes('dashboard')
  }
]

const routes = [
  ...defaultRoutes,
  ...designerServiceRoutes
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
