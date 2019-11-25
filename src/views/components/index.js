import Vue from 'vue'
import Button from 'element-ui/lib/button'

// element-ui
Vue.component(Button.name, Button)

// custom components
Vue.component('app-header', () => import('./app-header/index.vue'))
