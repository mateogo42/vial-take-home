import { buttonVariants } from '@/components/ui/button'
import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { Form } from '@/types'
import { ExternalLink, Pencil } from 'lucide-react'
import { NavLink, useLoaderData } from 'react-router'

export default function ListFormPage() {
  const { forms } = useLoaderData<{ forms: Omit<Form, 'fields'>[] }>()
  return (
    <div className="grid grid-cols-3 gap-10 w-full">
      {forms.map((form, index) => (
        <Card key={index}>
          <CardHeader className="text-center font-bold">{form.name}</CardHeader>
          <CardFooter className="flex justify-around">
            <NavLink
              className={buttonVariants({ variant: 'link' })}
              to={`/form/${form.id}`}
            >
              <ExternalLink />
              Open
            </NavLink>
            <NavLink
              className={buttonVariants({ variant: 'link' })}
              to={`/form/edit/${form.id}`}
            >
              <Pencil />
              Edit
            </NavLink>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
