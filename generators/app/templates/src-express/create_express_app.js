const Writable = require('stream').Writable
const bunyan = require('bunyan')
import express from 'express'
import bodyParser from 'body-parser'
import uuid from 'uuid'
import api_router from './api'

/*
 * Log to console
 */
const writableStream = Writable()
writableStream._write = (chunk, enc, next) => {
  let buffer = Buffer.from(chunk, enc)
  console.log(buffer.toString('utf8')) // eslint-disable-line no-console
  next()
}

const root_logger = bunyan.createLogger({
    name: 'retina-trial-web',
    streams: [
      {
        level: 'info',
        stream: writableStream
      }
    ],
    serializers: {
      err: bunyan.stdSerializers.err,
      req: serialize_req
    }
})

function create_express_app (nuxt, inject_early_middleware) {
    let app = express()

    app.disable('x-powered-by')

    if (inject_early_middleware) {
        app = inject_early_middleware(app)
    }

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    app.use((req, res, next) => {
        res.locals.start_time_ms = new Date().getTime()
        res.locals.req_uuid = uuid()

        let logger = create_req_child_logger(root_logger, req, res.locals.req_uuid)
        res.locals.logger = logger

        // log the elapsed milliseconds for this request
        // https://www.lunchbadger.com/tracking-the-performance-of-express-js-routes-and-middleware/
        res.once('finish', () => {
          if (res.headersSent) {
            let log_data = {
              req,
              is_nuxt_asset: req.path.startsWith('/_nuxt/'),
              is_api: req.baseUrl.startsWith('/api/'),
              'status': res.statusCode,
              elapsed_ms: (new Date().getTime() - res.locals.start_time_ms)
            }

            if (res.locals.err) {
              log_data.err = res.locals.err
              logger.error(log_data, 'COMPLETED_REQUEST_ERROR')
            } else {
              logger.info(log_data, 'COMPLETED_REQUEST')
            }
          }
        })

        next()
    })

    app.use('/api', api_router)
    app.use(nuxt.render)

    /*
     * error handling
     * https://expressjs.com/en/guide/error-handling.html
     */
    app.use((err, req, res, next) => {
        // setting this logs this request as an error in the finish handler
        res.locals.err = err
        res.status(500).send({error: 'Error ' + err})
    })

    return app
}

function create_req_child_logger (root_logger, req, req_uuid) {
    // log AWS context https://www.npmjs.com/package/aws-serverless-express
    let apiGateway = req.apiGateway || {}

    return root_logger.child({
        req_uuid,
        req: serialize_req(req),
        context: apiGateway.context || {}
    })
}

function serialize_req (req) {
    return {
      method: req.method,
      protocol: req.protocol,
      hostname: req.hostname,
      path: req.path,
      base_url: req.baseUrl,
      query: req.query,
      ip: req.ip,
      body: req.body
    }
}

module.exports = {
    create_express_app,
    root_logger
}
