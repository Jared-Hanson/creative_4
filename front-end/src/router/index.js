import Vue from 'vue'
import VueRouter from 'vue-router'
import ViewPokemon from '../views/ViewPokemon.vue'
import CreatePokemon from '../views/CreatePokemon.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'CreatePokemon',
    component: CreatePokemon
  },
  {
    path: '/ViewPokemon',
    name: 'ViewPokemon',
    component: ViewPokemon
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
