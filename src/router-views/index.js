import Vue from 'vue'
import Router from 'vue-router'
import preface from './preface'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: () => import('./layouts/default.vue'),
        children: [
          //前言
          ...preface
        ]
      },
      {
        path: '/home',
        component: () => import('./home/welcome/index.vue')
      }
    ]
  })
}
