'use client'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { FormControl, FormLabel } from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

type Props = {
  question: string
  value: any
  onChange: (...event: any[]) => void
}

export default function DatetimeField({ question, value, onChange }: Props) {
  return (
    <>
      <FormLabel>{question}</FormLabel>
      <Popover modal={true}>
        <PopoverTrigger>
          <FormControl>
            <div className="w-fit">
              <Button
                type="button"
                variant={'outline'}
                className={cn(
                  'w-[240px] pl-3 text-left font-normal',
                  !value && 'text-muted-foreground'
                )}
              >
                {value ? format(value, 'PPP') : <span>Pick a date</span>}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </div>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            captionLayout="dropdown-buttons"
            fromYear={1900}
            toYear={new Date().getFullYear()}
            mode="single"
            selected={value}
            onSelect={onChange}
            disabled={date =>
              date > new Date() || date < new Date('1900-01-01')
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </>
  )
}
