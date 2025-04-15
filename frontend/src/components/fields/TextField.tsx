import { ComponentProps } from 'react'
import { FormControl, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface Props extends ComponentProps<'input'> {
  question: string
}
export default function TextField({ question, ...props }: Props) {
  return (
    <>
      <FormLabel>{question}</FormLabel>
      <FormControl>
        <Input {...props} />
      </FormControl>
    </>
  )
}
