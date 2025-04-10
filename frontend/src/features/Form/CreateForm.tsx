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
import { formSchema } from '@/lib/schemas'

export default function CreateForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: '',
      fields: [],
    },
    resolver: zodResolver(formSchema),
  })
  const { control } = form

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fields',
  })

  const onSubmit = async ({ name, fields }: z.infer<typeof formSchema>) => {
    const objectFields = fields.reduce(
      (prev, curr, index) => ({
        ...prev,
        [`field-${index + 1}`]: curr,
      }),
      {}
    )
    console.log({ name, fields: objectFields })
    const resp = await fetch('http://localhost:8080/form', {
      method: 'POST',
      body: JSON.stringify({ name, fields: objectFields }),
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return (
    <>
      <h1 className="text-4xl">Form Builder</h1>
      <Form {...form}>
        <form
          className="min-w-[50%] space-y-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
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
            <FormLabel>Fields</FormLabel>
            {fields.map((_, index) => (
              <div
                className="w-full flex items-center justify-between"
                key={index}
              >
                <FormField
                  control={control}
                  name={`fields.${index}.type`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {FIELD_TYPES.map((field, index) => (
                            <SelectItem key={index} value={field}>
                              {field}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
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
                  control={control}
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
            variant="ghost"
            onClick={() =>
              append({ type: 'text', question: '', required: true })
            }
          >
            + Add Field
          </Button>
          <Button type="submit">Save</Button>
        </form>
      </Form>
    </>
  )
}
