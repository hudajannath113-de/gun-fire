import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import Layout from './components/Layout'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Lobby from './pages/Lobby'
import GameArena from './pages/GameArena'
import Profile from './pages/Profile'
import Leaderboard from './pages/Leaderboard'
import Settings from './pages/Settings'
import MatchResults from './pages/MatchResults'
import Armory from './pages/Armory'

export default function App() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check user session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user || null)
      } catch (error) {
        console.error('Session check error:', error)
      } finally {
        setLoading(false)
      }
    }

    checkSession()

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null)
      }
    )

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-deep-black">
        <div className="text-electric-blue text-2xl font-orbitron">Loading...</div>
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        {!user ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route element={<Layout user={user} />}>
              <Route path="/" element={<Home />} />
              <Route path="/lobby" element={<Lobby user={user} />} />
              <Route path="/game/br" element={<GameArena mode="br" user={user} />} />
              <Route path="/game/cs" element={<GameArena mode="cs" user={user} />} />
              <Route path="/profile" element={<Profile user={user} />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/results" element={<MatchResults />} />
              <Route path="/armory" element={<Armory user={user} />} />
            </Route>
          </>
        )}
      </Routes>
    </Router>
  )
}
