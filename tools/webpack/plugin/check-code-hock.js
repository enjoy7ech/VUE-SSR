class checkCodeHock {
  constructor(hook){
    this.hook = hook || 'emit'
  }
  // 将 `apply` 定义为其原型方法，此方法以 compiler 作为参数
  apply(compiler) {
    // 指定要附加到的事件钩子函数
    compiler.hooks[this.hook].tap('check-code-hock',(compilation) => {
        console.log(`This is check-code-hock plugin!current hook is ${this.hook}`);
        // console.log(compilation.hooks);
        // console.log(compilation.assets);
        compilation.hooks.optimizeChunkModules.tap('check-code-hock',(chunks)=>{
          console.log(compilation.assets);
          
        })
      }
    );
  }
}

export default checkCodeHock;