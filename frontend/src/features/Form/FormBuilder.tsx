import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { FIELD_TYPES } from '@/lib/constants'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useFieldArray, useForm } from 'react-hook-form'
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { fieldSchema, formSchema } from '@/lib/schemas'
import { createForm } from '@/services/form'

function fieldToInput(field: z.infer<typeof fieldSchema>, index: number) {
  switch (field.type) {
    case 'text':
      return (
        <div className="flex flex-col w-[80%]">
          <Label htmlFor={`field-${index}`}>{field.question}</Label>
          <Input id={`field-${index}`} type="text" required={field.required} />
        </div>
      )
    case 'textarea':
      return (
        <div className="flex flex-col w-[80%]">
          <Label htmlFor={`field-${index}`}>{field.question}</Label>
          <Textarea id={`field-${index}`} required={field.required} />
        </div>
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

export default function FormBuilder() {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: '',
      fields: [],
    },
    resolver: zodResolver(formSchema),
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'fields',
  })

  const formData = form.watch()

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (await createForm(data)) {
      console.log('Successfully created form')
      return
    }

    console.log('Failed to create form')
  }

  return (
    <div className="flex ">
      <div className="flex-1/2">
        <h1 className="text-4xl">Form Builder</h1>
        <Form {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <h1 className="text-xl">Fields</h1>
              {fields.map((_, index) => (
                <div
                  className="w-full flex items-center justify-between"
                  key={index}
                >
                  <FormField
                    control={form.control}
                    name={`fields.${index}.type`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-40">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {FIELD_TYPES.map((field, index) => (
                              <SelectItem key={index} value={field.name}>
                                <field.icon />
                                {field.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`fields.${index}.question`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Question</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`fields.${index}.required`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Required?</FormLabel>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button type="button" onClick={() => remove(index)}>
                    X
                  </Button>
                </div>
              ))}
            </div>
            <Button
              className="block"
              type="button"
              variant="outline"
              onClick={() =>
                append({ type: 'text', question: '', required: true })
              }
            >
              + Add Field
            </Button>
            <Button type="submit">Save</Button>
          </form>
        </Form>
      </div>
      <div className="flex-1/2 flex flex-col justify-center items-center m-10 border border-white space-y-5 rounded-md">
        <h1 className="text-3xl">{formData.name}</h1>
        {formData.fields.map((field, index) => fieldToInput(field, index))}
        <Button type="button">Submit</Button>
      </div>
    </div>
  )
}
