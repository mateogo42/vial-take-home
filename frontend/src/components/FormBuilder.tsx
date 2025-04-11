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
import { useFieldArray, UseFormReturn } from 'react-hook-form'
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { z } from 'zod'
import { formSchema } from '@/lib/schemas'
import { createForm } from '@/services/form'
import { Trash2 } from 'lucide-react'
import { Label } from './ui/label'

export default function FormBuilder({
  form,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>
}) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'fields',
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (await createForm(data)) {
      console.log('Succesfully created form')
      return
    }

    console.log('Failed to create form')
  }

  return (
    <div className={`w-full flex flex-col items-stretch`}>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <h1 className="text-xl">Fields</h1>
          <div className="grid grid-cols-[2fr_4fr_1fr_1fr] gap-5 place-items-center">
            <Label className="text-md">Type</Label>
            <Label className="text-md">Question</Label>
            <Label className="text-md">Required?</Label>
            <div></div>

            {fields.map((_, index) => (
              <>
                <FormField
                  control={form.control}
                  name={`fields.${index}.type`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger>
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
                    <FormItem className="w-full">
                      <FormControl className="w-full">
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
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  className="cursor-pointer bg-transparent hover:bg-transparent text-destructive"
                  type="button"
                  onClick={() => remove(index)}
                >
                  <Trash2 />
                </Button>
              </>
            ))}
          </div>
          <Button
            className="block"
            type="button"
            variant="outline"
            onClick={() =>
              append({ type: 'text', question: 'Question?', required: true })
            }
          >
            + Add Field
          </Button>
          <Button type="submit">Save</Button>
        </form>
      </Form>
    </div>
  )
}
