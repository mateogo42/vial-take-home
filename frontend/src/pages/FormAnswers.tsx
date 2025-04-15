import { AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card, CardContent } from '@/components/ui/card'
import WithBackButton from '@/components/withBackButton'
import { SourceRecord } from '@/types'
import { Accordion, AccordionContent } from '@radix-ui/react-accordion'
import React from 'react'
import { useLoaderData } from 'react-router'

export default function FormAnswersPage() {
  const { records } = useLoaderData<{ records: SourceRecord[] }>()
  return (
    <WithBackButton title="forms" to="/">
      <Accordion className="space-y-5" type="multiple">
        {records.map(({ id, sourceData }) => (
          <AccordionItem key={id} value={id}>
            <Card>
              <CardContent>
                <AccordionTrigger className="text-lg">
                  Record ID: {id}
                </AccordionTrigger>
                <AccordionContent>
                  {sourceData.map(({ id, question, answer }) => (
                    <React.Fragment key={id}>
                      <h1 className="font-bold">{question}</h1>
                      <p className="text-sm text-gray-400">{answer}</p>
                    </React.Fragment>
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
