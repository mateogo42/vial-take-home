import { z } from 'zod'
import { FIELD_TYPES } from '@/lib/constants'

export const fieldSchema = z.object({
  type: z.enum([
    FIELD_TYPES[0].name,
    ...FIELD_TYPES.slice(1).map(field => field.name),
  ]),
  question: z.string().min(1, { message: "Question can't be empty" }),
  required: z.boolean(),
})

export const formSchema = z.object({
  name: z.string().min(1, { message: "Name can't be empty" }),
  fields: z.array(fieldSchema),
})
