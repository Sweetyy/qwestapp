import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
  return () => import(`@/${component}.vue`)
}

export default new VueRouter({
  routes: [
    { path: '/', redirect: '/investigation' },
    { path: '/home', component: load('Home') },
    { path: '/investigation', component: load('Investigation') },
    { path: '/comingsoon', component: load('Comingsoon') },
    { path: '*', component: load('Error404') } // Not found
  ]
})
