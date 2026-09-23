import { supabase } from './supabaseClient'
export default function Login({ user }) {
  const login = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google', options: { queryParams: { prompt: 'select_account' } } })
  }
  const logout = async () => {
    await supabase.auth.signOut()
  }
  if (user) return <div><p>Logged in as {user.email} </p><button onClick={logout}>Logout</button></div>
  return <button onClick={login}>Login with google</button>
}