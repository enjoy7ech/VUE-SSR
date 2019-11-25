export default {
  namespaced: true,
  state: {
    userId: '',
    userName: ''
  },
  actions: {
    getUser: ({ commit }) => {
      return new
        Promise((resolve, reject) => {
          console.log(1111111111);
          setTimeout(() => {

            resolve()
          }, 2000);
        })
        .then(() => {
          let user
          console.log('from backend!!')
          user = { userId: '00000000', userName: '帅比' }
          commit('setUser', user)
        })
    }
  },
  mutations: {
    setUser: (state, payload) => {
      state.userId = payload.userId
      state.userName = payload.userName
    }
  }
}