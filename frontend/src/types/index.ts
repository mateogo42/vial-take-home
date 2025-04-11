import { formSchema, fieldSchema } from '@/lib/schemas'
import { z } from 'zod'

export type Field = z.infer<typeof fieldSchema>
export type Form = z.infer<typeof formSchema>

export type ApiFormResponse = {
  id: string
  name: string
  fields: {
    [key: string]: Field
  }
}

export type ApiResponse<T> = {
  statusCode: number
  data: T
  message: string
}
