import { fieldArrayToObject, fieldObjectToArray } from '@/lib/utils'
import type { ApiFormResponse, ApiResponse, Form, FormAnswers } from '@/types'

const API_URL = import.meta.env.API_URL
const FORM_URL = new URL('/form', API_URL)

export async function getFormById(id: string): Promise<Form> {
  const url = new URL(`/form/${id}`, API_URL)
  const resp = await fetch(url)
  const { data } = (await resp.json()) as ApiResponse<ApiFormResponse>
  const form = {
    id: data.id,
    name: data.name,
    fields: fieldObjectToArray(data.fields),
  }

  return form
}

export async function getForms(): Promise<Omit<Form, 'fields'>[]> {
  const resp = await fetch(FORM_URL)
  const { data } = (await resp.json()) as ApiResponse<ApiFormResponse[]>
  return data
}

export async function createForm({ name, fields }: Form): Promise<boolean> {
  const fieldMap = fieldArrayToObject(fields)
  const resp = await fetch(FORM_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, fields: fieldMap }),
  })

  return resp.ok
}

export async function updateForm(
  id: string,
  { name, fields }: Form
): Promise<boolean> {
  const fieldMap = fieldArrayToObject(fields)
  const url = new URL(`/form/${id}`, API_URL)
  const resp = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, fields: fieldMap }),
  })
  return resp.ok
}

export async function recordFormAnswers(id: string, answers: FormAnswers) {
  const url = new URL(`/form/${id}`, API_URL)
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(answers),
  })

  return resp.ok
}
