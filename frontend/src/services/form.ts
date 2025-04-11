import { formSchema } from '@/lib/schemas'
import { ApiFormResponse, ApiResponse, Form } from '@/types'
import { z } from 'zod'

const API_URL = import.meta.env.API_URL
const FORM_URL = new URL('/form', API_URL)

export async function getForms(): Promise<Form[]> {
  const resp = await fetch(FORM_URL)
  const { data } = (await resp.json()) as ApiResponse<ApiFormResponse[]>
  return data.map(({ name, fields }) => ({
    name: name,
    fields: Object.values(fields),
  }))
}

export async function createForm({ name, fields }: z.infer<typeof formSchema>) {
  const objectFields = fields.reduce(
    (prev, curr, index) => ({
      ...prev,
      [`field-${index + 1}`]: curr,
    }),
    {}
  )
  const resp = await fetch(FORM_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, fields: objectFields }),
  })

  return resp.ok
}
