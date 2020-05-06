import Vue, { ComponentOptions } from 'vue'
import { Store } from 'vuex'
import { Route } from 'vue-router'

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    asyncData?: (store: Store<any>, route: Route) => Promise<any>
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    asyncData?: (store: Store<any>, route: Route) => Promise<any>
  }
}

// https://github.com/microsoft/typescript-vue-starter#single-file-components
declare module '*.vue' {
  export default Vue
}
