



import { Home, User, Calendar } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Attendance', href: '/work-update', icon: Calendar },
]

export function BottomNav() {
    const location = useLocation();
    const pathname = location.pathname;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black text-white shadow-lg">
      <div className="max-w-screen-xl mx-auto px-4 py-2">
        <ul className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.name} className="relative w-full">
                <Link
                  to={item.href}
                  className={`flex flex-col items-center justify-center h-full w-full text-xs font-medium transition-all duration-300 ${
                    isActive ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-200'
                  }`}
                >
                  <item.icon className={`h-6 w-6 mb-1 transition-all duration-300 ${isActive ? 'scale-110' : ''}`} />
                  <span className={`transition-all duration-300 ${isActive ? 'font-bold' : ''}`}>{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

