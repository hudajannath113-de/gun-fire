import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useGameStore } from '../lib/gameStore'

interface GameArenaProps {
  mode: 'br' | 'cs'
  user: any
}

export default function GameArena({ mode, user }: GameArenaProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const playerRef = useRef<THREE.Group | null>(null)
  const [health, setHealth] = useState(100)
  const [kills, setKills] = useState(0)
  const [damageFlash, setDamageFlash] = useState(false)
  const [showHitmarker, setShowHitmarker] = useState(false)
  const keysPressed = useRef<{ [key: string]: boolean }>({})

  useEffect(() => {
    if (!containerRef.current) return

    // Initialize Three.js scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x87CEEB) // Daytime sky
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.set(0, 2, 5)
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.shadowMap.enabled = true
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Lighting
    const sunLight = new THREE.DirectionalLight(0xffffff, 1)
    sunLight.position.set(50, 50, 50)
    sunLight.castShadow = true
    sunLight.shadow.mapSize.width = 2048
    sunLight.shadow.mapSize.height = 2048
    scene.add(sunLight)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Ground
    const groundGeometry = new THREE.PlaneGeometry(200, 200)
    const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x2d5016 })
    const ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    scene.add(ground)

    // Player (3rd person camera view)
    const playerGroup = new THREE.Group()
    const playerGeometry = new THREE.CapsuleGeometry(0.5, 2, 4, 8)
    const playerMaterial = new THREE.MeshPhongMaterial({ color: 0x00D4FF })
    const playerMesh = new THREE.Mesh(playerGeometry, playerMaterial)
    playerMesh.castShadow = true
    playerMesh.receiveShadow = true
    playerGroup.add(playerMesh)
    playerGroup.position.set(0, 1.2, 0)
    scene.add(playerGroup)
    playerRef.current = playerGroup

    // Create a simple building
    const buildingGeometry = new THREE.BoxGeometry(10, 8, 10)
    const buildingMaterial = new THREE.MeshPhongMaterial({ color: 0xffb84d })
    const building = new THREE.Mesh(buildingGeometry, buildingMaterial)
    building.position.set(20, 4, 20)
    building.castShadow = true
    building.receiveShadow = true
    scene.add(building)

    // Create door (visual)
    const doorGeometry = new THREE.BoxGeometry(2, 3, 0.2)
    const doorMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 })
    const door = new THREE.Mesh(doorGeometry, doorMaterial)
    door.position.set(15, 1.5, 15)
    door.castShadow = true
    door.receiveShadow = true
    scene.add(door)

    // Enemy AI
    const createEnemy = () => {
      const enemyGeometry = new THREE.CapsuleGeometry(0.5, 2, 4, 8)
      const enemyMaterial = new THREE.MeshPhongMaterial({ color: 0xFF6B35 })
      const enemy = new THREE.Mesh(enemyGeometry, enemyMaterial)
      enemy.position.set(
        Math.random() * 60 - 30,
        1.2,
        Math.random() * 60 - 30
      )
      enemy.castShadow = true
      enemy.receiveShadow = true
      scene.add(enemy)
      return enemy
    }

    const enemies: THREE.Mesh[] = []
    for (let i = 0; i < 3; i++) {
      enemies.push(createEnemy())
    }

    // Input handling
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = true
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    // Click for shooting
    const handleMouseClick = (e: MouseEvent) => {
      if (e.button === 0) { // Left click
        setShowHitmarker(true)
        setTimeout(() => setShowHitmarker(false), 100)
        
        // Play gunshot sound
        const audio = new (window as any).AudioContext ? new (window as any).AudioContext() : null
        if (audio) {
          const osc = audio.createOscillator()
          const gain = audio.createGain()
          osc.connect(gain)
          gain.connect(audio.destination)
          osc.frequency.value = 150
          gain.gain.setValueAtTime(0.3, audio.currentTime)
          gain.gain.exponentialRampToValueAtTime(0.01, audio.currentTime + 0.1)
          osc.start(audio.currentTime)
          osc.stop(audio.currentTime + 0.1)
        }

        // Damage enemies on click (simplified)
        setKills(k => k + 1)
        setDamageFlash(true)
        setTimeout(() => setDamageFlash(false), 200)
      }
    }

    window.addEventListener('click', handleMouseClick)

    // Game loop
    const animate = () => {
      requestAnimationFrame(animate)

      // Player movement (WASD)
      const speed = 0.3
      if (keysPressed.current['w']) playerGroup.position.z -= speed
      if (keysPressed.current['s']) playerGroup.position.z += speed
      if (keysPressed.current['a']) playerGroup.position.x -= speed
      if (keysPressed.current['d']) playerGroup.position.x += speed

      // Third-person camera
      const cameraDistance = 8
      const cameraHeight = 3
      camera.position.x = playerGroup.position.x - Math.sin(0) * cameraDistance
      camera.position.y = playerGroup.position.y + cameraHeight
      camera.position.z = playerGroup.position.z - Math.cos(0) * cameraDistance
      camera.lookAt(playerGroup.position)

      // Enemy AI behavior (simple)
      enemies.forEach(enemy => {
        const direction = new THREE.Vector3()
        direction.subVectors(playerGroup.position, enemy.position)
        direction.normalize()

        // Move towards player
        enemy.position.add(direction.multiplyScalar(0.05))

        // Simple distance check for damage
        const distance = enemy.position.distanceTo(playerGroup.position)
        if (distance < 3 && Math.random() > 0.95) {
          setHealth(h => Math.max(0, h - 5))
          setDamageFlash(true)
          setTimeout(() => setDamageFlash(false), 200)
        }
      })

      renderer.render(scene, camera)
    }
    animate()

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('click', handleMouseClick)
      window.removeEventListener('resize', handleResize)
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <div ref={containerRef} className="w-full h-full" />

      {/* HUD Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Health Bar */}
        <div className="absolute bottom-8 left-8">
          <div className="text-white font-orbitron mb-2">HEALTH: {health}/100</div>
          <div className="w-64 h-8 bg-deep-black border-2 border-electric-blue rounded">
            <div
              className="h-full bg-electric-blue transition-all duration-100"
              style={{ width: `${health}%` }}
            ></div>
          </div>
        </div>

        {/* Kill Counter */}
        <div className="absolute top-8 right-8 text-right">
          <div className="text-5xl font-orbitron text-neon-orange font-bold">{kills}</div>
          <div className="text-electric-blue font-orbitron">KILLS</div>
        </div>

        {/* Minimap */}
        <div className="absolute top-8 right-8 ml-32">
          <div className="w-32 h-32 bg-deep-black border-2 border-electric-blue rounded relative">
            <div className="absolute w-2 h-2 bg-electric-blue top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            <span className="text-xs text-electric-blue font-orbitron absolute bottom-1 left-1 whitespace-nowrap">MINIMAP</span>
          </div>
        </div>

        {/* Crosshair/Hitmarker */}
        {showHitmarker && (
          <div className="hitmarker"></div>
        )}

        {/* Damage Flash */}
        {damageFlash && (
          <div className="absolute inset-0 bg-red-500 opacity-20 pointer-events-none"></div>
        )}

        {/* Controls */}
        <div className="absolute bottom-8 right-8 text-right text-gray-400 font-inter text-sm">
          <p>W/A/S/D - Move</p>
          <p>LMB - Shoot</p>
          <p>RMB - ADS</p>
        </div>
      </div>

      {/* Death Screen */}
      {health <= 0 && (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center pointer-events-auto z-50">
          <h1 className="text-6xl font-orbitron text-neon-orange mb-4">YOU DIED</h1>
          <p className="text-2xl text-gray-300 mb-8">Final Kills: {kills}</p>
          <button
            onClick={() => window.location.href = '/lobby'}
            className="btn-primary"
          >
            Return to Lobby
          </button>
        </div>
      )}
    </div>
  )
}
