import { FastifyInstance } from 'fastify'

import { Form } from '@prisma/client'

import prisma from '../db/db_client'
import { serializer } from './middleware/pre_serializer'
import { IEntityId } from './schemas/common'
import { ApiError } from '../errors'

async function formRoutes(app: FastifyInstance) {
  app.setReplySerializer(serializer)

  const log = app.log.child({ component: 'formRoutes' })

  app.get<{
    Params: IEntityId
    Reply: Form
  }>('/:id', {
    async handler(req, reply) {
      const { params } = req
      const { id } = params
      log.debug('get form by id')
      try {
        const form = await prisma.form.findUniqueOrThrow({ where: { id } })
        reply.send(form)
      } catch (err: any) {
        log.error({ err }, err.message)
        throw new ApiError('failed to fetch form', 400)
      }
    },
  })

  app.get<{ Reply: Form[] }>('/', {
    async handler(req, reply) {
      log.debug('get all forms')
      try {
        const forms = await prisma.form.findMany()
        reply.send(forms)
      } catch (err: any) {
        log.error({ err }, err.message)
        throw new ApiError('failed to fetch forms', 400)
      }
    },
  })

  app.post<{ Body: Omit<Form, 'id'>; Reply: IEntityId }>('/', {
    async handler(req, reply) {
      const { fields, name } = req.body
      if (fields) {
        try {
          const form = await prisma.form.create({ data: { fields, name } })
          reply.send({ id: form.id })
        } catch (err: any) {
          log.error({ err }, err.message)
          throw new ApiError('failed to create form', 400)
        }
      }

      log.error('fields should not be empty')
      throw new ApiError('fields should not be empty', 400)
    },
  })
}

export default formRoutes
