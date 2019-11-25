export default {
  data() {
    return {
      loginTime: ''
    }
  },
  asyncData({ store }) {

  },
  created() {
    setTimeout(() => {

      this.loginTime = new Date()
    }, 1000);
  },
  mounted() {
    console.log('mounted!!!')

  },
}