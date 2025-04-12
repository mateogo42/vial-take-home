import { AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card, CardContent } from '@/components/ui/card'
import WithBackButton from '@/components/withBackButton'
import { SourceRecord } from '@/types'
import { Accordion, AccordionContent } from '@radix-ui/react-accordion'
import { useLoaderData } from 'react-router'

export default function FormAnswersPage() {
  const { records } = useLoaderData<{ records: SourceRecord[] }>()
  console.log(records)
  return (
    <WithBackButton title="forms" to="/">
      <Accordion collapsible className="space-y-5" type="single">
        {records.map(({ id, sourceData }) => (
          <AccordionItem key={id} value={id}>
            <Card>
              <CardContent>
                <AccordionTrigger className="text-lg">{id}</AccordionTrigger>
                <AccordionContent>
                  {sourceData.map(({ question, answer }) => (
                    <>
                      <h1 className="font-bold">{question}</h1>
                      <p className="text-sm text-gray-400">{answer}</p>
                    </>
                  ))}
                </AccordionContent>
              </CardContent>
            </Card>
          </AccordionItem>
        ))}
      </Accordion>
    </WithBackButton>
  )
}
