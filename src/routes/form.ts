import { FastifyInstance } from 'fastify'

import { Form, SourceRecord } from '@prisma/client'

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

  app.post<{
    Params: IEntityId
    Body: { [key: string]: any }
    Reply: SourceRecord
  }>('/:id', {
    async handler(req, reply) {
      const { params, body } = req
      const { id } = params
      log.debug('get form by id')
      try {
        const form = await prisma.form.findUniqueOrThrow({ where: { id } })
        const sourceRecord = await prisma.sourceRecord.create({
          data: {
            formId: id,
            sourceData: {
              create: Object.entries(body).map(([name, value]) => ({
                question: form.fields?.[name].question,
                answer: value,
              })),
            },
          },
        })
        reply.send(sourceRecord)
      } catch (err: any) {
        log.error({ err }, err.message)
        throw new ApiError('failed to fetch form', 400)
      }
    },
  })

  app.get<{ Reply: Omit<Form, 'fields'>[] }>('/', {
    async handler(req, reply) {
      log.debug('get all forms')
      try {
        const forms = await prisma.form.findMany({
          select: { id: true, name: true },
        })
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
      try {
        if (fields) {
          const form = await prisma.form.create({
            data: { fields: fields, name },
          })
          reply.send({ id: form.id })
        }
        throw new Error('Empty fields are not allowed')
      } catch (err: any) {
        log.error({ err }, err.message)
        throw new ApiError('failed to create form', 400)
      }
    },
  })

  app.put<{ Params: IEntityId; Body: Form; Reply: Form }>('/:id', {
    async handler(req, reply) {
      const { id } = req.params
      const { name, fields } = req.body
      try {
        if (!fields) {
          throw new Error('Empty fields are not allowed')
        }
        const form = await prisma.form.update({
          where: {
            id: id,
          },
          data: {
            fields: fields,
            name,
          },
        })
        reply.send(form)
      } catch (err: any) {
        log.error({ err }, err.message)
        throw new ApiError('failed to update form', 400)
      }
    },
  })

  app.get<{
    Params: IEntityId
    Reply: Omit<SourceRecord, 'formId'>[]
  }>('/:id/source-records', {
    async handler(req, reply) {
      const { id } = req.params
      const sourceRecords = await prisma.sourceRecord.findMany({
        where: {
          formId: id,
        },
        select: {
          id: true,
          sourceData: {
            select: {
              id: true,
              question: true,
              answer: true,
            },
          },
        },
      })
      reply.send(sourceRecords)
    },
  })
}

export default formRoutes
