import FormBuilder from '@/components/FormBuilder'
import FormRenderer from '@/components/FormRenderer'
import { formSchema } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function CreateFormPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: '',
      fields: [],
    },
    resolver: zodResolver(formSchema),
  })

  const formData = form.watch()

  return (
    <div className="flex gap-10">
      <div className="flex flex-1/2 flex-col items-center">
        <h1 className="text-5xl font-bold">Create a new form</h1>
        <FormBuilder form={form} />
      </div>
      <div className="flex-1/2">
        <FormRenderer formData={formData} />
      </div>
    </div>
  )
}
