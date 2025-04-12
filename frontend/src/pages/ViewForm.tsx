import ErrorAlert from '@/components/ErrorAlert'
import FormRenderer from '@/components/FormRenderer'
import WithBackButton from '@/components/withBackButton'
import { recordFormAnswers } from '@/services/form'
import { Form, FormAnswers } from '@/types'
import { useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router'

export default function ViewFormPage() {
  const [err, setErr] = useState<boolean>(false)
  const navigate = useNavigate()
  const { form } = useLoaderData<{ form: Form }>()
  const onSubmit = async (data: FormAnswers) => {
    const ok = await recordFormAnswers(form.id, data)
    if (!ok) {
      setErr(true)
      return
    }
    navigate(`/form/${form.id}/answers`)
  }
  return (
    <WithBackButton title="forms" to="/">
      <div className="width-[50%]">
        <FormRenderer id={form.id} formData={form} onSubmit={onSubmit} />
        {err ? (
          <ErrorAlert message="There was a problem submitting your form" />
        ) : (
          ''
        )}
      </div>
    </WithBackButton>
  )
}
