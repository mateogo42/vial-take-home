import { Outlet } from 'react-router'
import Header from '@/components/Header'

function App() {
  return (
    <>
      <Header />
      <div className="p-10">
        <Outlet />
      </div>
    </>
  )
}

export default App
