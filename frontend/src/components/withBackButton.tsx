import { PropsWithChildren } from 'react'
import { NavLink } from 'react-router'
import { ChevronLeft } from 'lucide-react'

export default function WithBackButton({
  title,
  to,
  children,
}: PropsWithChildren<{ title: string; to: string }>) {
  return (
    <>
      <NavLink
        className="text-sm text-gray-400 hover:text-white flex items-center gap-1 mb-5"
        to={to}
      >
        <ChevronLeft /> Back to {title}
      </NavLink>
      {children}
    </>
  )
}
