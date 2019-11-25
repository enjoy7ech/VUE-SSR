export default {
  asyncData({ store }) {
    return store.dispatch('user/getUser')
  },
  data() {
    return {
      isClick: false
    }
  },
  mounted() {

  },
  methods: {
    clickBtn() {
      console.log(123123);
    }
  }
}