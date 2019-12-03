import Vue from 'vue'

export default Vue.extend({
  asyncData({ store }: any) {
    return store.dispatch('user/getUser')
  },
  mounted() {},
  data() {
    return {}
  },
  methods: {}
})
