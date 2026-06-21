import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../lib/gameStore'

export default function Lobby({ user }: { user: any }) {
  const [selectedMode, setSelectedMode] = useState<'br' | 'cs' | null>(null)
  const [searching, setSearching] = useState(false)
  const navigate = useNavigate()
  const { player, setPlayer } = useGameStore()

  const handlePlayClick = async (mode: 'br' | 'cs') => {
    setSelectedMode(mode)
    setSearching(true)

    // Simulate matchmaking
    setTimeout(() => {
      setSearching(false)
      navigate(`/game/${mode}`)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-deep-black p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-orbitron text-electric-blue mb-12 text-center">SELECT GAME MODE</h1>

        {searching && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="text-center">
              <div className="animate-spin w-12 h-12 border-4 border-electric-blue border-t-neon-orange rounded-full mx-auto mb-4"></div>
              <p className="text-electric-blue font-orbitron text-xl">Searching for players...</p>
              <p className="text-gray-400 mt-2">Estimated wait: 2-5 seconds</p>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Classic Mode */}
          <div className="bg-dark-charcoal border-2 border-electric-blue rounded-lg p-8 hover:border-neon-orange hover:shadow-lg hover:shadow-electric-blue transition cursor-pointer"
            onClick={() => handlePlayClick('cs')}>
            <h2 className="text-3xl font-orbitron text-electric-blue mb-4">CLASSIC MODE</h2>
            <div className="space-y-3 mb-6 text-gray-300">
              <p>🏁 <strong>4v4 Team Deathmatch</strong></p>
              <p>⏱️ Fast-paced round-based combat</p>
              <p>🏆 Tactical team gameplay</p>
              <p>🎖️ Separate rank progression</p>
            </div>
            <button className="btn-primary w-full">
              PLAY NOW
            </button>
          </div>

          {/* Battle Royale Mode */}
          <div className="bg-dark-charcoal border-2 border-neon-orange rounded-lg p-8 hover:border-electric-blue hover:shadow-lg hover:shadow-neon-orange transition cursor-pointer"
            onClick={() => handlePlayClick('br')}>
            <h2 className="text-3xl font-orbitron text-neon-orange mb-4">BATTLE ROYALE</h2>
            <div className="space-y-3 mb-6 text-gray-300">
              <p>🌍 <strong>Multiple players, last one wins</strong></p>
              <p>💨 Dynamic shrinking zone</p>
              <p>📍 Strategic positioning</p>
              <p>🎖️ Separate rank progression</p>
            </div>
            <button className="btn-secondary w-full">
              PLAY NOW
            </button>
          </div>
        </div>

        {/* Player Stats */}
        <div className="bg-dark-charcoal border-2 border-electric-blue rounded-lg p-8">
          <h3 className="text-2xl font-orbitron text-electric-blue mb-6">YOUR STATS</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-deep-black p-4 rounded border border-electric-blue">
              <p className="text-gray-400 text-sm">TOTAL KILLS</p>
              <p className="text-3xl font-bold text-electric-blue">0</p>
            </div>
            <div className="bg-deep-black p-4 rounded border border-electric-blue">
              <p className="text-gray-400 text-sm">RANK</p>
              <p className="text-3xl font-bold text-neon-orange">Bronze</p>
            </div>
            <div className="bg-deep-black p-4 rounded border border-electric-blue">
              <p className="text-gray-400 text-sm">COINS</p>
              <p className="text-3xl font-bold text-electric-blue">0</p>
            </div>
            <div className="bg-deep-black p-4 rounded border border-electric-blue">
              <p className="text-gray-400 text-sm">MATCHES</p>
              <p className="text-3xl font-bold text-neon-orange">0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
