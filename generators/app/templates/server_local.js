const { Nuxt, Builder } = require('nuxt')
const bundle = require('./dist/create_express_app.bundle.js')
const create_express_app = bundle.create_express_app
const root_logger = bundle.root_logger

const stage = process.env.NODE_ENV || 'development'
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

let nuxt_config = require('./nuxt.config.js')
nuxt_config.dev = (stage === 'development')

async function start() {
  const nuxt = new Nuxt(nuxt_config)

  if (stage === 'development') {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  const app = create_express_app(nuxt)

  app.set('port', port)
  app.listen(port, host)

  root_logger.info(`Server listening on http://${host}:${port}`)
}
start()
