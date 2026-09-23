import { useState, useEffect } from 'react'
import { supabase } from "./supabaseClient"
import Login from "./Login"
import History from "./History"
import Chat from "./Chat"

export default function App() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user || null)
      if (event === 'SIGNED_IN' && session?.user) {
        await supabase.from('login_logs').insert({ user_id: session.user.id, email: session.user.email })
      }
    })
    return () => listener.subscription.unsubscribe()
  }, [])
  return (
    <div style={{ padding: 20, background: 'white', minHeight: '100vh' }}>
      <h1>Google Login Page</h1>
      <Login user={user} />
      {user ? <History /> : <p>Login to see who came</p>}
      {user ? <Chat /> : null}
    </div>
  )
}