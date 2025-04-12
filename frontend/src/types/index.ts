import { formSchema, fieldSchema } from '@/lib/schemas'
import { z } from 'zod'

export type Field = z.infer<typeof fieldSchema>
export type Form = z.infer<typeof formSchema>
export type FormWithoutID = Omit<Form, 'id'>

export type FieldMap = {
  [key: `field-${number}`]: Field
}

export type FormAnswers = {
  [key: `field-${number}`]: any
}

export type ApiFormResponse = {
  id: string
  name: string
  fields: FieldMap
}

export type SourceRecord = {
  id: string
  sourceData: Answer[]
}

export type Answer = {
  id: string
  question: string
  answer: string
}

export type ApiResponse<T> = {
  statusCode: number
  data: T
  message: string
}
