import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)

if (module.hot) {
  module.hot.accept()
}

export function createStore() {
  return new Vuex.Store({
    modules
  })
}
