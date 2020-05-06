import chalk from 'chalk'

function run(module, options) {
  const task = module.default
  const start = new Date()
  console.log(chalk.blue(`Starting ${task.name} ${options ? chalk.bgYellow(JSON.stringify(options)) : ''}...`))
  return task.func(options).then(() => {
    const end = new Date()
    const time = end.getTime() - start.getTime()
    console.log(
      chalk.blue(`Finish ${task.name} ${options ? chalk.bgYellow(JSON.stringify(options)) : ''} after ${time} ms`)
    )
  })
}

if (require.main === module && process.argv.length > 2) {
  delete require.cache[__filename]
  const task = require(`./${process.argv[2]}.js`)
  const options = process.argv[3]
  run(task, options).catch(err => {
    console.error(err.stack || err) // eslint-disable-line
    process.exit(1)
  })
}

export default run
