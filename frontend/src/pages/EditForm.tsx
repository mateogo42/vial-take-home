import ErrorAlert from '@/components/ErrorAlert'
import FormBuilder from '@/components/FormBuilder'
import FormRenderer from '@/components/FormRenderer'

import WithBackButton from '@/components/withBackButton'
import { formWithoutIdSchema } from '@/lib/schemas'
import { updateForm } from '@/services/form'
import { Form, FormWithoutID } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLoaderData, useNavigate } from 'react-router'

export default function EditFormPage() {
  const [err, setErr] = useState<boolean | undefined>(undefined)
  const navigate = useNavigate()
  const { form: existingForm } = useLoaderData<{ form: Form }>()
  const { id, name, fields } = existingForm
  const form = useForm<FormWithoutID>({
    defaultValues: {
      name,
      fields,
    },
    resolver: zodResolver(formWithoutIdSchema),
  })
  const onSubmitForm = async (data: FormWithoutID) => {
    if (!(await updateForm(id, data))) {
      setErr(true)
      return
    }
    await navigate(`/form/${id}`)
    return
  }

  const onSubmitPreview = async (data: { [key: string]: any }) => {
    console.log(data)
  }

  const formData = form.watch()

  return (
    <WithBackButton title="forms" to="/">
      <div className="flex gap-10 w-full">
        <div className="flex flex-1/2 flex-col items-center">
          <h1 className="text-5xl font-bold mb-10">Edit form</h1>
          <FormBuilder form={form} onSubmit={onSubmitForm} />
          {err ? (
            <ErrorAlert message="There was a problem creating your form" />
          ) : (
            ''
          )}
        </div>
        <div className="flex-1/2">
          <FormRenderer
            id={id}
            formData={formData}
            onSubmit={onSubmitPreview}
          />
        </div>
      </div>
    </WithBackButton>
  )
}
