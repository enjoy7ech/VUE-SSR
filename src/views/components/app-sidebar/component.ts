import Vue from 'vue'
import { menus } from '@data/sidebar'

let debounceScroll: any

export default Vue.extend({
  data() {
    return {
      fixed: false,
      menus
    }
  },
  async mounted() {
    const { default: debounce } = await import('lodash-es/debounce')
    debounceScroll = debounce(() => {
      const scrollTop = $(window).scrollTop()
      const offset = $(this.$refs.sideBar).offset()
      this.fixed = Number(scrollTop) > Number(offset && offset.top)
    }, 10)
    $(window).scroll(function() {
      debounceScroll()
    })
  },
  methods: {},
  computed: {}
})
