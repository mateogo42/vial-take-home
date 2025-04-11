import { ALargeSmall, Binary, Text } from 'lucide-react'

export const FIELD_TYPES: { name: string; icon: any; label: string }[] = [
  { name: 'text', icon: ALargeSmall, label: 'Text' },
  { name: 'textarea', icon: Text, label: 'Text Area' },
  { name: 'boolean', icon: Binary, label: 'Boolean' },
] as const
