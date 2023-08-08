import { createRouter, createWebHistory } from 'vue-router'
import EmployeeComponent from '../components/EmployeeComponent.vue'
import EditEmployee from '../components/EditEmployee.vue'
import HomePage from '../components/HomePage.vue'

const routes = [
  {
    path : '/employees',
    name : 'Employees',
    component : EmployeeComponent
  },
  {
    path : '/editEmployee',
    name : 'EditEmployee',
    component : EditEmployee
  },
  {
    path : '/',
    name : 'Home',
    component : HomePage
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
