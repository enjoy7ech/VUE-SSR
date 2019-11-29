import Vue from 'vue'

export default Vue.extend({
  props: {
    name: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      enthusiasm: 0
    }
  },
  methods: {
    increment() {
      new Promise(resolve => {
        setTimeout(() => {
          this.enthusiasm++
          console.log('increase!!')
          resolve()
        }, 3000)
      })
    },
    decrement() {
      if (this.enthusiasm > 1) {
        this.enthusiasm--
      }
    }
  },
  computed: {
    exclamationMarks(): string {
      return Array(this.enthusiasm + 1).join('!')
    }
  }
})
