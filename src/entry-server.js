import { createApp } from './app'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()

    const { url, req } = context
    const fullPath = router.resolve(url).route.fullPath

    if (fullPath !== url) {
      return reject(new Error({ url: fullPath }))
    }
    // 切换路由到请求的url
    router.push(url)

    // 在路由完成初始导航时调用,可以解析所有的异步进入钩子和路由初始化相关联的异步组件,有效确保服务端渲染时服务端和客户端输出的一致。
    router.onReady(() => {
      // 获取该路由相匹配的Vue components
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        reject(new Error({ code: 404 }))
      }

      // 执行匹配组件中的asyncData
      Promise.all(
        matchedComponents.map(Component => {
          if (Component.options && Component.options.asyncData) {
            return Component.options.asyncData({
              store,
              route: router.currentRoute,
              req
            })
          }
        })
      )
        .then(() => {
          // 在所有预取钩子(preFetch hook) resolve 后，
          // 我们的 store 现在已经填充入渲染应用程序所需的状态。
          // 当我们将状态附加到上下文，
          // 并且 `template` 选项用于 renderer 时，
          // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
          context.state = store.state
          if (router.currentRoute.meta) {
            context.title = router.currentRoute.meta.title
          }

          // 返回一个初始化完整的Vue实例
          resolve(app)
        })
        .catch(reject)
    }, reject)
  })
}
