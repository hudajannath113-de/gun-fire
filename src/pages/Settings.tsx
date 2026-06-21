import { useState } from 'react'

export default function Settings() {
  const [masterVolume, setMasterVolume] = useState(70)
  const [sfxVolume, setSfxVolume] = useState(80)
  const [brightness, setBrightness] = useState(100)

  return (
    <div className="min-h-screen bg-deep-black p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-orbitron text-electric-blue mb-8">SETTINGS</h1>

        <div className="bg-dark-charcoal border-2 border-electric-blue rounded-lg p-8 space-y-8">
          {/* Audio Settings */}
          <div>
            <h2 className="text-2xl font-orbitron text-electric-blue mb-4">AUDIO</h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-gray-300">Master Volume: {masterVolume}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={masterVolume}
                  onChange={(e) => setMasterVolume(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-300">SFX Volume: {sfxVolume}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sfxVolume}
                  onChange={(e) => setSfxVolume(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Graphics Settings */}
          <div>
            <h2 className="text-2xl font-orbitron text-electric-blue mb-4">GRAPHICS</h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-gray-300">Brightness: {brightness}%</label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={brightness}
                  onChange={(e) => setBrightness(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <button className="btn-primary w-full">SAVE SETTINGS</button>
        </div>
      </div>
    </div>
  )
}
