export default function MatchResults() {
  return (
    <div className="min-h-screen bg-deep-black p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-orbitron text-electric-blue mb-8 text-center">MATCH RESULTS</h1>
        
        <div className="bg-dark-charcoal border-2 border-electric-blue rounded-lg p-8">
          <div className="text-center mb-8">
            <p className="text-gray-400 text-sm mb-2">FINAL RANK</p>
            <p className="text-6xl font-orbitron text-neon-orange font-bold">#5</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-deep-black p-4 rounded border border-electric-blue">
              <p className="text-gray-400 text-sm">KILLS</p>
              <p className="text-3xl font-bold text-electric-blue">12</p>
            </div>
            <div className="bg-deep-black p-4 rounded border border-electric-blue">
              <p className="text-gray-400 text-sm">COINS EARNED</p>
              <p className="text-3xl font-bold text-neon-orange">120</p>
            </div>
          </div>

          <button className="btn-primary w-full mb-2">PLAY AGAIN</button>
          <button className="btn-secondary w-full">RETURN TO LOBBY</button>
        </div>
      </div>
    </div>
  )
}
