import fastify from 'fastify'

import formRoutes from './routes/form'
import errorHandler from './errors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

function build(opts = {}) {
  const app = fastify(opts)
  app.register(fastifySwagger, {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'Form Builder API',
        version: '0.1.0',
      },
    },
  })
  app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
  })

  app.register(formRoutes, { prefix: '/form' })

  app.setErrorHandler(errorHandler)

  return app
}
export default build
