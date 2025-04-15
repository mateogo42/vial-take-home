import { Static, Type } from '@sinclair/typebox'

import { Uuid } from './typebox_base'

export const EntityId = Type.Object({
  id: Uuid(),
})

export const Fields = Type.Object({
  type: Type.String(),
  question: Type.String(),
  required: Type.Boolean(),
})

export const Form = Type.Object({
  id: Uuid(),
  name: Type.String(),
  fields: Type.Record(Type.String(), Fields),
})

export const SourceData = Type.Object({
  id: Uuid(),
  question: Type.String(),
  answer: Type.String(),
})
export const SourceRecord = Type.Object({
  id: Uuid(),
  sourceData: Type.Array(SourceData),
})

export type IEntityId = Static<typeof EntityId>
