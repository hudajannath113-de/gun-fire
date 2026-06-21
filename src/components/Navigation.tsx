import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from '../lib/supabase'

export default function Navigation({ user }: { user: any }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <nav className="bg-dark-charcoal border-b-2 border-electric-blue sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-orbitron font-bold text-electric-blue hover:text-neon-orange transition">
            GUN FREE
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/lobby" className="hover:text-electric-blue transition">Play</Link>
            <Link to="/profile" className="hover:text-electric-blue transition">Profile</Link>
            <Link to="/leaderboard" className="hover:text-electric-blue transition">Leaderboard</Link>
            <Link to="/armory" className="hover:text-electric-blue transition">Armory</Link>
            <Link to="/settings" className="hover:text-electric-blue transition">Settings</Link>
          </div>

          {/* User & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-neon-orange text-white rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
            <button
              className="md:hidden text-electric-blue"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-dark-charcoal border-t border-electric-blue py-4 space-y-2">
            <Link to="/lobby" className="block px-4 py-2 hover:bg-electric-blue hover:text-deep-black transition">Play</Link>
            <Link to="/profile" className="block px-4 py-2 hover:bg-electric-blue hover:text-deep-black transition">Profile</Link>
            <Link to="/leaderboard" className="block px-4 py-2 hover:bg-electric-blue hover:text-deep-black transition">Leaderboard</Link>
            <Link to="/armory" className="block px-4 py-2 hover:bg-electric-blue hover:text-deep-black transition">Armory</Link>
            <Link to="/settings" className="block px-4 py-2 hover:bg-electric-blue hover:text-deep-black transition">Settings</Link>
          </div>
        )}
      </div>
    </nav>
  )
}
