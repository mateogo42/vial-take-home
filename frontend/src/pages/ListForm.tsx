import { buttonVariants } from '@/components/ui/button'
import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { Form } from '@/types'
import { Eye, ListCheck, Pencil } from 'lucide-react'
import { Link, useLoaderData } from 'react-router'

export default function ListFormPage() {
  const { forms } = useLoaderData<{ forms: Omit<Form, 'fields'>[] }>()
  return (
    <div className="grid grid-cols-3 gap-10 w-full">
      {forms.map((form, index) => (
        <Card key={index}>
          <CardHeader className="text-center font-bold">{form.name}</CardHeader>
          <CardFooter className="flex justify-around">
            <Link
              className={buttonVariants({ variant: 'link' })}
              to={`/form/${form.id}`}
            >
              <Eye />
              View
            </Link>
            <Link
              className={buttonVariants({ variant: 'link' })}
              to={`/form/${form.id}/edit`}
            >
              <Pencil />
              Edit
            </Link>
            <Link
              className={buttonVariants({ variant: 'link' })}
              to={`/form/${form.id}/answers`}
            >
              <ListCheck />
              Answers
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
