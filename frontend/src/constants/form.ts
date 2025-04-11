import {
  ALargeSmall,
  Binary,
  Text,
  LucideIcon,
  Calendar,
  Mail,
} from 'lucide-react'

export const FIELD_TYPES: { name: string; icon: LucideIcon; label: string }[] =
  [
    { name: 'text', icon: ALargeSmall, label: 'Text' },
    { name: 'textarea', icon: Text, label: 'Text Area' },
    { name: 'email', icon: Mail, label: 'Email' },
    { name: 'boolean', icon: Binary, label: 'Boolean' },
    { name: 'datetime', icon: Calendar, label: 'Datetime' },
  ] as const
