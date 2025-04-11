import { ALargeSmall, Binary, Text, LucideIcon } from 'lucide-react'

export const FIELD_TYPES: { name: string; icon: LucideIcon; label: string }[] =
  [
    { name: 'text', icon: ALargeSmall, label: 'Text' },
    { name: 'textarea', icon: Text, label: 'Text Area' },
    { name: 'boolean', icon: Binary, label: 'Boolean' },
  ] as const
