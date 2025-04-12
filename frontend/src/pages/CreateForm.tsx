import ErrorAlert from '@/components/ErrorAlert'
import FormBuilder from '@/components/FormBuilder'
import FormRenderer from '@/components/FormRenderer'
import { formWithoutIdSchema } from '@/lib/schemas'
import { createForm } from '@/services/form'
import { FormWithoutID } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

export default function CreateFormPage() {
  const [err, setErr] = useState<boolean | undefined>(undefined)
  const navigate = useNavigate()
  const form = useForm<FormWithoutID>({
    defaultValues: {
      name: '',
      fields: [],
    },
    resolver: zodResolver(formWithoutIdSchema),
  })
  const onSubmitForm = async (data: FormWithoutID) => {
    const id = await createForm(data)
    if (!id) {
      setErr(true)
      return
    }
    await navigate(`/form/${id}`)
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
        {err ? (
          <ErrorAlert message="There was a problem creating your form" />
        ) : (
          ''
        )}
      </div>
      <div className="flex-1/2">
        <FormRenderer
          id="temp"
          formData={formData}
          onSubmit={onSubmitPreview}
        />
      </div>
    </div>
  )
}
