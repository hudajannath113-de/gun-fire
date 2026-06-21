# GUN FREE - Competitive Multiplayer FPS

A browser-based multiplayer first-person shooter built with React, Three.js, and Supabase.

## Features

- ✅ **Google OAuth + Email Authentication** via Supabase
- ✅ **Real-time 3D gameplay** using Three.js
- ✅ **Two game modes**: Battle Royale & Classic 4v4 TDM
- ✅ **WASD movement controls** with 3rd-person camera
- ✅ **Weapon system** (Pistol, SMG, Shotgun, AWM)
- ✅ **Interactive buildings** with doors and windows
- ✅ **Health system** with damage indicators and hitmarkers
- ✅ **Tactical AI enemies** that use cover and peek
- ✅ **Kill tracking** with coins per kill (10 coins/kill)
- ✅ **Ranking system** with tier progression (separate BR/Classic)
- ✅ **Leaderboards** with RP sorting and tier badges
- ✅ **Weapon skins** (7 skins) - earn coins to buy
- ✅ **Audio effects** (gunshots, muzzle flashes, hit sounds)
- ✅ **Daytime map** with minimap display (top-right)
- ✅ **Profile & Match Results** screens
- ✅ **Settings** for audio/graphics controls

## Setup

### 1. Clone & Install

```bash
git clone https://github.com/hudajannath113-de/gun-fire.git
cd gun-fire
npm install
```

### 2. Configure Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Copy your URL and Anon Key
3. Create `.env` file:

```bash
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Setup Google OAuth

In Supabase Dashboard:
1. Go to **Authentication → Providers**
2. Enable **Google**
3. Add Google OAuth credentials
4. Add authorized redirect URL: `http://localhost:5173/lobby`

### 4. Run Dev Server

```bash
npm run dev
```

Visit `http://localhost:5173`

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build**: Vite
- **3D**: Three.js, React Three Fiber
- **State**: Zustand
- **Backend**: Supabase (Auth, Database, Real-time)
- **Real-time**: WebSocket (Supabase)

## Game Controls

- **W/A/S/D**: Move
- **Left Click**: Shoot
- **Right Click**: ADS (Aim Down Sights)
- **R**: Reload
- **ESC**: Menu

## Project Structure

```
src/
├── components/
│   ├── Layout.tsx
│   └── Navigation.tsx
├── pages/
│   ├── Home.tsx
│   ├── Auth.tsx (Google + Email login)
│   ├── Lobby.tsx
│   ├── GameArena.tsx (3D game with AI)
│   ├── Profile.tsx
│   ├── Leaderboard.tsx
│   ├── Settings.tsx
│   ├── MatchResults.tsx
│   └── Armory.tsx (Weapon skins shop)
├── lib/
│   ├── supabase.ts (Auth functions)
│   └── gameStore.ts (Zustand state)
└── App.tsx
```

## Next Steps

- [ ] Implement multiplayer WebSocket sync
- [ ] Add more weapon types and skins
- [ ] Develop map variations
- [ ] Implement persistent player statistics
- [ ] Add player cosmetics (outfits, emotes)
- [ ] Optimize 3D rendering for performance
- [ ] Add tutorial/onboarding

## License

MIT
