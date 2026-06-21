import { useState } from 'react'

export default function Armory({ user }: { user: any }) {
  const [coins, setCoins] = useState(0)
  const [equippedSkin, setEquippedSkin] = useState('default')

  const skins = [
    { id: 'default', name: 'Standard Issue', color: '#00D4FF', cost: 0 },
    { id: 'neon', name: 'Neon Dream', color: '#FF6B35', cost: 100 },
    { id: 'ghost', name: 'Ghost', color: '#808080', cost: 150 },
    { id: 'inferno', name: 'Inferno', color: '#FF0000', cost: 200 },
    { id: 'ice', name: 'Frozen', color: '#00FFFF', cost: 250 },
    { id: 'shadow', name: 'Shadow', color: '#1A1A1A', cost: 300 },
    { id: 'gold', name: 'Aurum', color: '#FFD700', cost: 400 },
  ]

  return (
    <div className="min-h-screen bg-deep-black p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-orbitron text-electric-blue mb-4">ARMORY</h1>
        <p className="text-gray-400 mb-8">Your Balance: <span className="text-neon-orange font-bold">{coins} coins</span></p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skins.map(skin => (
            <div
              key={skin.id}
              className={`bg-dark-charcoal border-2 p-6 rounded-lg cursor-pointer transition ${
                equippedSkin === skin.id
                  ? 'border-electric-blue shadow-lg shadow-electric-blue'
                  : 'border-gray-600 hover:border-electric-blue'
              }`}
              onClick={() => setEquippedSkin(skin.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-orbitron text-white">{skin.name}</h3>
                {equippedSkin === skin.id && (
                  <span className="text-electric-blue font-orbitron text-sm">EQUIPPED</span>
                )}
              </div>
              <div
                className="w-full h-24 rounded-lg mb-4 border-2 border-gray-600"
                style={{ backgroundColor: skin.color }}
              ></div>
              {skin.cost === 0 ? (
                <button className="w-full py-2 bg-gray-600 text-white rounded font-orbitron cursor-default">
                  DEFAULT
                </button>
              ) : coins >= skin.cost ? (
                <button className="w-full py-2 bg-electric-blue text-deep-black rounded font-orbitron hover:bg-neon-orange transition">
                  BUY ({skin.cost})
                </button>
              ) : (
                <button className="w-full py-2 bg-gray-600 text-gray-400 rounded font-orbitron cursor-default">
                  {skin.cost} COINS
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
