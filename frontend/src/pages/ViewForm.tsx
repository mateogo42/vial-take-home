import FormRenderer from '@/components/FormRenderer'
import { recordFormAnswers } from '@/services/form'
import { Form, FormAnswers } from '@/types'
import { useLoaderData } from 'react-router'

export default function ViewFormPage() {
  const { form } = useLoaderData<{ form: Form }>()
  const onSubmit = async (data: FormAnswers) => {
    if (await recordFormAnswers(form.id, data)) {
      console.log('Succesfully recorded answers')
      return
    }

    console.log('Failed to record answers')
  }
  return <FormRenderer formData={form} onSubmit={onSubmit} />
}
