import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { getForms } from '@/services/form'
import { Form } from '@/types'
import { ExternalLink, Pencil } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ListFormPage() {
  const [forms, setForms] = useState<Form[]>([])
  useEffect(() => {
    getForms().then(forms => setForms(forms))
  })
  return (
    <div className="grid grid-cols-3 gap-10">
      {forms.map(form => (
        <Card>
          <CardHeader className="text-center">{form.name}</CardHeader>
          <CardFooter className="flex justify-around">
            <Button className="w-[30%]">
              <ExternalLink />
              Open
            </Button>
            <Button className="w-[30%]">
              <Pencil />
              Edit
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
