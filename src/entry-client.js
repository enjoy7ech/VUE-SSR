import { createApp } from './app'
import { mixins } from './mixin'
import Vue from 'vue'

const { app, router, store } = createApp(true)

// 客户端特定引导逻辑……
for (const mixin of mixins.client) {
  Vue.mixin(mixin)
}

// 由于服务端渲染时，context.state 作为 window.__INITIAL_STATE__ 状态，自动嵌入到最终的 HTML 中。在客户端，在挂载到应用程序之前，state为window.__INITIAL_STATE__。
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  // 添加路由钩子函数，用于处理 asyncData.
  // 在初始路由 resolve 后执行，
  // 以便我们不会二次预取(double-fetch)已有的数据。
  // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    // 我们只关心之前没有渲染的组件
    // 所以我们对比它们，找出两个匹配列表的差异组件
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = prevMatched[i] !== c)
    })

    const asyncDataHooks = activated.map(c => c.options && c.options.asyncData).filter(_ => _)
    if (!asyncDataHooks.length) {
      return next()
    }

    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
      .then(() => {
        next()
      })
      .catch(next)
  })

  // 挂载在DOM上
  app.$mount('#app')
})
