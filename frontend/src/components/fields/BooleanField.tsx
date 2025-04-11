import { FormControl, FormLabel } from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'

interface Props {
  question: string
  value: any
  onChange: (...event: any[]) => void
}
export default function BooleanField({ question, value, onChange }: Props) {
  return (
    <div className="flex space-x-4">
      <FormControl>
        <Checkbox checked={value} onCheckedChange={onChange} />
      </FormControl>
      <FormLabel className="text-sm font-medium leading-none">
        {question}
      </FormLabel>
    </div>
  )
}
