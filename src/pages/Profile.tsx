export default function Profile({ user }: { user: any }) {
  return (
    <div className="min-h-screen bg-deep-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-orbitron text-electric-blue mb-8">PLAYER PROFILE</h1>
        
        <div className="bg-dark-charcoal border-2 border-electric-blue rounded-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-orbitron text-electric-blue">{user?.email}</h2>
              <p className="text-gray-400">Member since 2026</p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-orbitron text-neon-orange">★</div>
              <p className="text-electric-blue font-orbitron">Bronze Tier</p>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="bg-deep-black p-4 rounded border border-electric-blue">
              <p className="text-gray-400 text-sm">Total Kills</p>
              <p className="text-3xl font-bold text-electric-blue">0</p>
            </div>
            <div className="bg-deep-black p-4 rounded border border-electric-blue">
              <p className="text-gray-400 text-sm">Win Rate</p>
              <p className="text-3xl font-bold text-neon-orange">0%</p>
            </div>
            <div className="bg-deep-black p-4 rounded border border-electric-blue">
              <p className="text-gray-400 text-sm">Matches</p>
              <p className="text-3xl font-bold text-electric-blue">0</p>
            </div>
            <div className="bg-deep-black p-4 rounded border border-electric-blue">
              <p className="text-gray-400 text-sm">Coins</p>
              <p className="text-3xl font-bold text-neon-orange">0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
