import { Card } from '@/components/ui/card'
import { FileText, Globe, Plus } from 'lucide-react'
import { Link } from 'react-router'
export default function Header() {
  return (
    <Card className="w-full bg-card py-3 px-4 border-0 flex flex-row items-center justify-start rounded-none">
      <div className="flex justify-start space-x-2">
        <Globe />
        <span className="text-md font-bold">Form Builder</span>
      </div>
      <ul className="flex items-center text-gray-400 gap-5">
        <li>
          <Link className="hover:text-white flex gap-1" to="/new">
            <Plus /> New Form
          </Link>
        </li>
        <li>
          <Link className="hover:text-white flex gap-1" to="/">
            <FileText /> Forms
          </Link>
        </li>
      </ul>
    </Card>
  )
}
