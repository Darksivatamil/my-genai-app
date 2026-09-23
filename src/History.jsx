import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
export default function History() {
  const [rows, setRows] = useState([])
  useEffect(() => {
    supabase.rpc('get_login_history').then(({ data }) => setRows(data || []))
  }, [])
  return <div><h3>Who logged in</h3>{rows.map((r, i) => <p key={i}>{r.email} - {new Date(r.logged_in_at).toLocaleString()}</p>)}</div>
}