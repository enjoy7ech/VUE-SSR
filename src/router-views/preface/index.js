export default [
  {
    name: 'preface-introduction',
    path: 'introduction',
    component: () => import('./app-introduction/index.vue')
  },
  {
    name: 'preface-building',
    path: 'building',
    component: () => import('./app-building/index.vue')
  },
  {
    name: 'preface-advantage',
    path: 'advantage',
    component: () => import('./app-advantage/index.vue')
  }
]
