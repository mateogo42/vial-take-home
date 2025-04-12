import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

export default function ErrorAlert({ message }: { message: string }) {
  return (
    <Alert className="mt-5" variant="destructive">
      <AlertCircle className="w-4 h-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}
