import { FastifyInstance } from 'fastify'

import type {
  Form as IForm,
  SourceRecord as ISourceRecord,
} from '@prisma/client'

import prisma from '../db/db_client'
import { serializer } from './middleware/pre_serializer'
import { Form, EntityId, IEntityId, SourceRecord } from './schemas/common'
import { ApiError } from '../errors'
import { Type } from '@sinclair/typebox'

async function formRoutes(app: FastifyInstance) {
  app.setReplySerializer(serializer)

  const log = app.log.child({ component: 'formRoutes' })

  app.get<{
    Params: IEntityId
    Reply: IForm
  }>('/:id', {
    schema: {
      description: 'Get form data by id',
      tags: ['form'],
      params: EntityId,
      response: {
        200: {
          type: 'object',
          properties: {
            statusCode: { type: 'number' },
            message: { type: 'string' },
            data: Form,
          },
        },
      },
    },
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
    Reply: ISourceRecord
  }>('/:id', {
    schema: {
      description: 'Save a new source record for a given form',
      tags: ['form'],
      params: EntityId,
      body: {
        type: 'object',
        examples: [{ 'field-0': 'John', 'field-1': 'Doe' }],
      },
      response: {
        200: {
          type: 'object',
          properties: {
            statusCode: { type: 'number' },
            message: { type: 'string' },
            data: EntityId,
          },
        },
      },
    },
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
                answer: value.toString(),
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

  app.get<{ Reply: Omit<IForm, 'fields'>[] }>('/', {
    schema: {
      description: 'List all forms',
      tags: ['form'],
      response: {
        200: {
          type: 'object',
          properties: {
            statusCode: { type: 'number' },
            message: { type: 'string' },
            data: {
              type: 'array',
              items: Type.Omit(Form, ['fields']),
            },
          },
        },
      },
    },

    async handler(req, reply) {
      log.debug('get all forms without fields')
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

  app.post<{ Body: Omit<IForm, 'id'>; Reply: IEntityId }>('/', {
    schema: {
      description: 'Create a new form',
      tags: ['form'],
      body: Type.Omit(Form, ['id']),
      response: {
        200: {
          type: 'object',
          properties: {
            statusCode: { type: 'number' },
            message: { type: 'string' },
            data: EntityId,
          },
        },
      },
    },
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

  app.put<{ Params: IEntityId; Body: IForm; Reply: IForm }>('/:id', {
    schema: {
      description: 'Update a form name or fields',
      tags: ['form'],
      body: Type.Omit(Form, ['id']),
      response: {
        200: {
          type: 'object',
          properties: {
            statusCode: { type: 'number' },
            message: { type: 'string' },
            data: Form,
          },
        },
      },
    },
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
    Reply: Omit<ISourceRecord, 'formId'>[]
  }>('/:id/source-records', {
    schema: {
      description: 'Gets the source records with data for a given form',
      tags: ['form'],
      params: EntityId,
      response: {
        200: {
          type: 'object',
          properties: {
            statusCode: { type: 'number' },
            message: { type: 'string' },
            data: { type: 'array', items: SourceRecord },
          },
        },
      },
    },
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
