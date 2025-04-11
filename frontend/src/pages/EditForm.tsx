import FormBuilder from '@/components/FormBuilder'
import FormRenderer from '@/components/FormRenderer'
import { formSchema } from '@/lib/schemas'
import { updateForm } from '@/services/form'
import { Form } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useLoaderData } from 'react-router'

export default function EditFormPage() {
  const { form: existingForm } = useLoaderData<{ form: Form }>()
  const { id, name, fields } = existingForm
  const form = useForm<Form>({
    defaultValues: {
      name,
      fields,
    },
    resolver: zodResolver(formSchema),
  })
  const onSubmitForm = async (data: Form) => {
    if (await updateForm(id, data)) {
      console.log('Succesfully updatedjform')
      return
    }

    console.log('Failed to update form')
  }

  const onSubmitPreview = async (data: { [key: string]: any }) => {
    console.log(data)
  }

  const formData = form.watch()

  return (
    <div className="flex gap-10 w-full">
      <div className="flex flex-1/2 flex-col items-center">
        <h1 className="text-5xl font-bold mb-10">Create a new form</h1>
        <FormBuilder form={form} onSubmit={onSubmitForm} />
      </div>
      <div className="flex-1/2">
        <FormRenderer formData={formData} onSubmit={onSubmitPreview} />
      </div>
    </div>
  )
}
