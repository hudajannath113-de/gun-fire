import { useState } from 'react'

export default function Leaderboard() {
  const [mode, setMode] = useState<'br' | 'cs'>('br')

  const mockLeaderboard = [
    { rank: 1, name: 'ShadowHunter', kills: 1250, rank_tier: 'Diamond', rp: 5000 },
    { rank: 2, name: 'NeonSlayer', kills: 1100, rank_tier: 'Platinum', rp: 4500 },
    { rank: 3, name: 'CyberNinja', kills: 950, rank_tier: 'Gold', rp: 4000 },
  ]

  return (
    <div className="min-h-screen bg-deep-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-orbitron text-electric-blue mb-8">LEADERBOARDS</h1>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setMode('br')}
            className={`px-6 py-3 font-orbitron rounded ${
              mode === 'br'
                ? 'bg-electric-blue text-deep-black'
                : 'bg-dark-charcoal text-electric-blue border-2 border-electric-blue'
            }`}
          >
            BATTLE ROYALE
          </button>
          <button
            onClick={() => setMode('cs')}
            className={`px-6 py-3 font-orbitron rounded ${
              mode === 'cs'
                ? 'bg-neon-orange text-deep-black'
                : 'bg-dark-charcoal text-neon-orange border-2 border-neon-orange'
            }`}
          >
            CLASSIC MODE
          </button>
        </div>

        <div className="bg-dark-charcoal border-2 border-electric-blue rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-dark-charcoal border-b-2 border-electric-blue">
              <tr>
                <th className="px-6 py-4 text-left text-electric-blue font-orbitron">#</th>
                <th className="px-6 py-4 text-left text-electric-blue font-orbitron">PLAYER</th>
                <th className="px-6 py-4 text-left text-electric-blue font-orbitron">KILLS</th>
                <th className="px-6 py-4 text-left text-electric-blue font-orbitron">TIER</th>
                <th className="px-6 py-4 text-left text-electric-blue font-orbitron">RP</th>
              </tr>
            </thead>
            <tbody>
              {mockLeaderboard.map((player, i) => (
                <tr key={i} className="border-b border-dark-charcoal hover:bg-deep-black transition">
                  <td className="px-6 py-4 text-neon-orange font-orbitron">{player.rank}</td>
                  <td className="px-6 py-4 text-white">{player.name}</td>
                  <td className="px-6 py-4 text-electric-blue">{player.kills}</td>
                  <td className="px-6 py-4 text-neon-orange font-orbitron">{player.rank_tier}</td>
                  <td className="px-6 py-4 text-electric-blue">{player.rp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
