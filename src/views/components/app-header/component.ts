import Vue from 'vue'

export default Vue.extend({
  props: ['name', 'initialEnthusiasm'],
  data() {
    return {
      enthusiasm: 0
    }
  },
  methods: {
    increment() { this.enthusiasm++ },
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
