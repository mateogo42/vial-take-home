import { z } from 'zod'
import { FIELD_TYPES } from '@/lib/constants'

export const fieldSchema = z.object({
  type: z.enum(FIELD_TYPES),
  question: z.string().min(1, { message: "Question can't be empty" }),
  required: z.boolean(),
})

export const formSchema = z.object({
  name: z.string().min(1, { message: "Name can't be empty" }),
  fields: z.array(fieldSchema),
})
