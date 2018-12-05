const { Nuxt } = require('nuxt')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const awsServerlessExpress = require('aws-serverless-express')
const bundle = require('./dist/create_express_app.bundle.js')
const create_express_app = bundle.create_express_app

const stage = process.env.NODE_ENV || 'development'

let nuxt_config = require('./nuxt.config.js')
nuxt_config.dev = (stage === 'development')

const nuxt = new Nuxt(nuxt_config)

const app = create_express_app(nuxt, (app) => {
    app.use(awsServerlessExpressMiddleware.eventContext())
    return app
})
const server = awsServerlessExpress.createServer(app)

module.exports.handler = (event, context) => {
    // workaround for double gzip encoding issue
    // HTTP gzip encoding should be done higher-up via something like CloudFront/CloudFlare
    event.headers['Accept-Encoding'] = 'identity'
  
    awsServerlessExpress.proxy(server, event, context)
}
