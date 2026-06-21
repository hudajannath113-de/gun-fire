import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'

export default function Layout({ user }: { user: any }) {
  return (
    <div className="flex flex-col min-h-screen bg-deep-black">
      <Navigation user={user} />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
