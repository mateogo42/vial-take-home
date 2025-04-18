import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { FIELD_TYPES } from '@/constants/form'
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
import { Trash2 } from 'lucide-react'
import { Label } from './ui/label'
import type { FormWithoutID } from '@/types'
import React from 'react'

export default function FormBuilder({
  form,
  onSubmit,
}: {
  form: UseFormReturn<FormWithoutID>
  onSubmit: (data: FormWithoutID) => Promise<void>
}) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'fields',
  })
  const errors = form.formState.errors

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
          <h1 className={`text-xl ${errors.fields ? 'text-red-400' : ''}`}>
            Fields
          </h1>
          <div className="grid grid-cols-[2fr_4fr_1fr_1fr] gap-5 place-items-center">
            <Label className="text-md">Type</Label>
            <Label className="text-md">Question</Label>
            <Label className="text-md">Required?</Label>
            <div></div>

            {fields.map((_, index) => (
              <React.Fragment key={index}>
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
              </React.Fragment>
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
          <div className="text-sm text-red-400">{errors.fields?.message}</div>
          <Button type="submit">Save</Button>
        </form>
      </Form>
    </div>
  )
}
