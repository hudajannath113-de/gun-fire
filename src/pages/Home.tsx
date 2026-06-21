import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-deep-black flex items-center justify-center relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/10 to-neon-orange/10"></div>
      
      <div className="relative z-10 text-center px-4">
        <h1 className="text-6xl md:text-8xl font-orbitron font-black mb-4 text-electric-blue drop-shadow-lg">
          GUN FREE
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 font-rajdhani">
          Competitive Multiplayer FPS. No Downloads. Pure Combat.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
          <div className="bg-dark-charcoal border-2 border-electric-blue p-6 rounded-lg hover:shadow-lg hover:shadow-electric-blue transition">
            <h3 className="text-2xl font-orbitron text-electric-blue mb-3">Classic Mode</h3>
            <p className="text-gray-300 mb-4">4v4 Team Deathmatch</p>
            <button
              onClick={() => navigate('/auth')}
              className="btn-primary w-full"
            >
              Play Now
            </button>
          </div>

          <div className="bg-dark-charcoal border-2 border-neon-orange p-6 rounded-lg hover:shadow-lg hover:shadow-neon-orange transition">
            <h3 className="text-2xl font-orbitron text-neon-orange mb-3">Battle Royale</h3>
            <p className="text-gray-300 mb-4">Last Player Standing</p>
            <button
              onClick={() => navigate('/auth')}
              className="btn-secondary w-full"
            >
              Play Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
