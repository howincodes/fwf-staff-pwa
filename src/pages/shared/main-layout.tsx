
import { BottomNav } from './components/bottom-nav-bar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div>
        <Outlet/>
        <div className="w-full fixed bottom-0 z-50">
        <BottomNav/>
        </div>
    
    </div>
  )
}

export default MainLayout