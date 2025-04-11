import { Outlet } from 'react-router'
import Header from '@/components/Header'

function App() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center p-10">
        <Outlet />
      </div>
    </>
  )
}

export default App
