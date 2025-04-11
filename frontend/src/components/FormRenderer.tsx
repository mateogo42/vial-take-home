import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { formSchema, fieldSchema } from '@/lib/schemas'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

function fieldToInput(field: z.infer<typeof fieldSchema>, index: number) {
  switch (field.type) {
    case 'text':
      return (
        <>
          <Label htmlFor={`field-${index}`}>{field.question}</Label>
          <Input id={`field-${index}`} type="text" required={field.required} />
        </>
      )
    case 'textarea':
      return (
        <>
          <Label htmlFor={`field-${index}`}>{field.question}</Label>
          <Textarea id={`field-${index}`} required={field.required} />
        </>
      )
    case 'boolean':
      return (
        <div className="flex space-x-4">
          <Checkbox id={`field-${index}`} />
          <Label
            htmlFor={`field-${index}`}
            className="text-sm font-medium leading-none"
          >
            {field.question}
          </Label>
        </div>
      )
  }
}

export default function FormRenderer({
  formData,
}: {
  formData: z.infer<typeof formSchema>
}) {
  return (
    <Card className="w-full px-10">
      <CardHeader className="text-xl font-bold">
        <CardTitle>{formData.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            {formData.fields.map((field, index) => (
              <div className="flex flex-col space-y-1.5">
                {fieldToInput(field, index)}
              </div>
            ))}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button type="button">Submit</Button>
      </CardFooter>
    </Card>
  )
}
