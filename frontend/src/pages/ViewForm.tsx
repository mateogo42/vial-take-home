import FormRenderer from '@/components/FormRenderer'
import { Form } from '@/types'
import { useLoaderData } from 'react-router'

export default function ViewFormPage() {
  const { form } = useLoaderData<{ form: Form }>()
  const onSubmit = async (data: { [key: string]: any }) => {
    console.log(data)
  }
  return <FormRenderer formData={form} onSubmit={onSubmit} />
}
