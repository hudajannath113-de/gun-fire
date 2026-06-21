import { create } from 'zustand'

interface Player {
  id: string
  name: string
  health: number
  maxHealth: number
  kills: number
  rank: number
  rankPoints: number
}

interface GameState {
  player: Player | null
  enemies: Player[]
  currentWeapon: string
  coins: number
  mode: 'br' | 'cs'
  inGame: boolean
  health: number
  damageLog: Array<{ amount: number; direction: string; timestamp: number }>
  setPlayer: (player: Player) => void
  setEnemies: (enemies: Player[]) => void
  damagePlayer: (amount: number, direction: string) => void
  healPlayer: (amount: number) => void
  addKill: () => void
  addCoins: (amount: number) => void
  startGame: (mode: 'br' | 'cs') => void
  endGame: () => void
}

export const useGameStore = create<GameState>((set) => ({
  player: null,
  enemies: [],
  currentWeapon: 'pistol',
  coins: 0,
  mode: 'br',
  inGame: false,
  health: 100,
  damageLog: [],
  setPlayer: (player) => set({ player }),
  setEnemies: (enemies) => set({ enemies }),
  damagePlayer: (amount, direction) => set((state) => ({
    health: Math.max(0, state.health - amount),
    damageLog: [...state.damageLog, { amount, direction, timestamp: Date.now() }],
  })),
  healPlayer: (amount) => set((state) => ({
    health: Math.min(100, state.health + amount),
  })),
  addKill: () => set((state) => ({
    coins: state.coins + 10,
    player: state.player ? { ...state.player, kills: state.player.kills + 1 } : null,
  })),
  addCoins: (amount) => set((state) => ({
    coins: state.coins + amount,
  })),
  startGame: (mode) => set({ inGame: true, mode, health: 100 }),
  endGame: () => set({ inGame: false }),
}))
