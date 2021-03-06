export default {
  namespaced: true,
  state: {
    userId: '',
    userName: ''
  },
  actions: {
    getUser: ({ commit }) => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, 2000)
      }).then(() => {
        const user = { userId: '00000000', userName: '帅比' }
        console.log(user)

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
