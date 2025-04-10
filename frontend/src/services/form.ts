import { formSchema } from '@/lib/schemas'
import { z } from 'zod'

const API_URL = import.meta.env.API_URL
const CREATE_FORM_URL = new URL('/form', API_URL)
export async function createForm({ name, fields }: z.infer<typeof formSchema>) {
  const objectFields = fields.reduce(
    (prev, curr, index) => ({
      ...prev,
      [`field-${index + 1}`]: curr,
    }),
    {}
  )
  const resp = await fetch(CREATE_FORM_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, fields: objectFields }),
  })

  return resp.ok
}
