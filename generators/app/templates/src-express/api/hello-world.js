import { Router } from 'express'

const router = Router()

router.get('/', function (req, res, next) {
  res.json({
    'output': 'Hello World!',
    req: {
      baseUrl: req.baseUrl,
      body: req.body,
      cookies: req.cookies,
      fresh: req.fresh,
      hostname: req.hostname,
      ip: req.ip,
      ips: req.ips,
      method: req.method,
      originalUrl: req.originalUrl,
      params: req.params,
      path: req.path,
      protocol: req.protocol,
      query: req.query,
      route: req.route,
      secure: req.secure,
      session: req.session, // from cookie_session
      signedCookies: req.signedCookies,
      stale: req.stale,
      subdomains: req.subdomains,
      xhr: req.xhr,
      known_headers: {
        accepts: req.accepts(),
        acceptsCharsets: req.acceptsCharsets(),
        acceptsEncodings: req.acceptsEncodings(),
        acceptsLanguages: req.acceptsLanguages(),
        authorization: req.get('Authorization'),
        cache_control: req.get('cache-control'),
        host: req.get('host'),
        x_forwarded_host: req.get('X-Forwarded-Host'),
        x_forwarded_for: req.get('X-Forwarded-For'),
        referer: req.get('referer'),
        user_agent: req.get('user-agent')
      }
    }
  })
})

export default router
