import chalk from 'chalk'

function run(module, options) {
  let task = module.default
  const start = new Date()
  console.log(chalk.blue(`Starting '${task.name}${options ? ` (${JSON.stringify(options)})` : ''}'...`))
  return task.func(options).then(() => {
    const end = new Date()
    const time = end.getTime() - start.getTime()
    console.log(chalk.blue(`Finished '${task.name}${options ? ` (${JSON.stringify(options)})` : ''}' after ${time} ms`))
  })
}

if (require.main === module && process.argv.length > 2) {
  delete require.cache[__filename]
  const task = require(`./${process.argv[2]}.js`)
  run(task).catch((err) => {
    console.error(err.stack || err) // eslint-disable-line
    process.exit(1)
  })
}

export default run