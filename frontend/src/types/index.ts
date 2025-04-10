export type Field = {
  type: string
  question: string
  required: boolean
}

export type Form = {
  id: string
  name: string
  fields: Field[]
}
