import { createRouter, createWebHistory } from 'vue-router'
import EmployeeComponent from '../components/EmployeeComponent.vue'
import EditEmployee from '../components/EditEmployee.vue'

import JobComponent from '../components/JobComponent.vue'
import EditJob from '../components/EditJob.vue'

import CommentComponent from '../components/CommentComponent.vue'
import EditComment from '../components/EditComment.vue'

import ProjectComponent from '../components/ProjectComponent.vue'
import EditProject from '../components/EditProject.vue'

import HomePage from '../components/HomePage.vue'

const routes = [
  {
    path : '/employees',
    name : 'Employees',
    component : EmployeeComponent
  },
  {
    path : '/editEmployee/:id',
    name : 'EditEmployee',
    component : EditEmployee
  },
  {
    path : '/newEmployee',
    name : 'NewEmployee',
    component : EditEmployee
  },
  {
    path : '/jobs',
    name : 'Jobs',
    component : JobComponent
  },
  {
    path : '/editJob/:id',
    name : 'EditJob',
    component : EditJob
  },
  {
    path : '/newJob',
    name : 'NewJob',
    component : EditJob
  },
  {
    path : '/comments',
    name : 'Comments',
    component : CommentComponent
  },
  {
    path : '/editComments/:id',
    name : 'EditComment',
    component : EditComment
  },
  {
    path : '/newComment',
    name : 'NewComment',
    component : EditComment
  },
  {
    path : '/projects',
    name : 'Projects',
    component : ProjectComponent
  },
  {
    path : '/editProjects/:id',
    name : 'EditProject',
    component : EditProject
  },
  {
    path : '/newProject',
    name : 'NewProject',
    component : EditProject
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
