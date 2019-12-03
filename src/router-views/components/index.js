import Vue from 'vue'
import Button from 'element-ui/lib/button'

// element-ui
Vue.component(Button.name, Button)

// custom components
Vue.component('app-header', () => import('./app-header/index.vue'))
Vue.component('app-sidebar', () => import('./app-sidebar/index.vue'))
Vue.component('app-footer', () => import('./app-footer/index.vue'))
Vue.component('default-layout', () => import('./layout/defaultLayout/index.vue'))
