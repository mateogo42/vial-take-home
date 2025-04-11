import { ComponentProps } from 'react'
import { FormControl, FormLabel } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

interface Props extends ComponentProps<'textarea'> {
  question: string
}
export default function TextareaField(props: Props) {
  const { question } = props
  return (
    <>
      <FormLabel>{question}</FormLabel>
      <FormControl>
        <Textarea {...props} />
      </FormControl>
    </>
  )
}
