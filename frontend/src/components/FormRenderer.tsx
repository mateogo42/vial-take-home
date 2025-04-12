import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Field, FormWithoutID } from '@/types'
import {
  ControllerRenderProps,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { generateZodSchema } from '@/lib/utils'
import TextField from './fields/TextField'
import TextareaField from './fields/TextArea'
import BooleanField from './fields/BooleanField'
import DatetimeField from './fields/DatetimeField'

function fieldToInput(field: ControllerRenderProps, fieldData: Field) {
  switch (fieldData.type) {
    case 'email':
    case 'text':
      return <TextField {...field} question={fieldData.question} type="text" />
    case 'textarea':
      return <TextareaField {...field} question={fieldData.question} />
    case 'boolean':
      return (
        <BooleanField
          question={fieldData.question}
          value={field.value}
          onChange={field.onChange}
        />
      )
    case 'datetime':
      return (
        <DatetimeField
          question={fieldData.question}
          value={field.value}
          onChange={field.onChange}
        />
      )
    default:
      return <p>Unkown form type</p>
  }
}

export default function FormRenderer({
  id,
  formData,
  onSubmit,
}: {
  id: string
  formData: FormWithoutID
  onSubmit: SubmitHandler<FieldValues>
}) {
  const { name, fields } = formData
  const form = useForm({
    defaultValues: Object.fromEntries(
      fields.map((_, index) => [`field-${index + 1}`, ''])
    ),
    resolver: zodResolver(generateZodSchema(fields)),
  })
  return (
    <Card className="self-center px-10">
      <CardHeader className="text-xl font-bold">
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form id={`form-${id}`} onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              {fields.map((fieldData, index) => {
                const fieldName = `field-${index + 1}`
                return (
                  <FormField
                    key={fieldName}
                    name={fieldName}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex flex-col space-y-1.5">
                        {fieldToInput(field, fieldData)}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )
              })}
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button type="submit" form={`form-${id}`}>
          Submit
        </Button>
      </CardFooter>
    </Card>
  )
}
