import { Field, FieldMap } from '@/types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function fieldArrayToObject(fields: Field[]): FieldMap {
  return fields.reduce(
    (prev, curr, index) => ({
      ...prev,
      [`field-${index + 1}`]: curr,
    }),
    {}
  )
}

export function fieldObjectToArray(fields: FieldMap): Field[] {
  const array = new Array<Field>(Object.keys(fields).length)
  for (let i = 0; i < array.length; i++) {
    array[i] = fields[`field-${i + 1}`]
  }

  return array
}

export function generateZodSchema(fields: Field[]) {
  const schema: { [key: string]: z.ZodType } = {}
  const typeToSchema: { [key: string]: (required: boolean) => z.ZodType } = {
    text: required =>
      required
        ? z.string().min(1, { message: "Field can't be empty" })
        : z.string(),
    textarea: required =>
      required
        ? z.string().min(1, { message: "Field can't be empty" })
        : z.string(),
    email: () => z.string().email(),
    boolean: () => z.boolean(),
    datetime: required =>
      required
        ? z.date({
            errorMap: () => ({
              message: 'Must select a date',
            }),
          })
        : z.date(),
  }
  fields.forEach((field, index) => {
    let fieldSchema = typeToSchema[field.type](field.required)
    if (!field.required) fieldSchema = fieldSchema.optional()
    schema[`field-${index + 1}`] = fieldSchema
  })

  return z.object(schema)
}
