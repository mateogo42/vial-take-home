import { Field, FieldMap } from '@/types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

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
