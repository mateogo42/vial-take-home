import { ComponentProps } from 'react'
import { FormControl, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface Props extends ComponentProps<'input'> {
  type: string
  question: string
}
export default function TextField(props: Props) {
  const { name, question } = props
  return (
    <>
      <FormLabel htmlFor={name}>{question}</FormLabel>
      <FormControl>
        <Input {...props} />
      </FormControl>
    </>
  )
}
