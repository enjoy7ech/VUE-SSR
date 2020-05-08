import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  asyncData({ store }: any) {
    //模拟2s的接口取数据
    return store.dispatch('user/getUser')
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {}
})
