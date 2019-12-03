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
    const { default: debounce } = await import(
      /* webpackChunkName: "debounce" */
      'lodash-es/debounce'
    )
    debounceScroll = debounce(() => {
      const scrollTop = $(window).scrollTop()
      this.fixed = Number(scrollTop) > Number($('#header').innerHeight())
    }, 10)
    $(window).scroll(function() {
      debounceScroll()
    })
  },
  methods: {},
  computed: {}
})
