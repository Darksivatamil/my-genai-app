import { useState } from 'react'
import { supabase } from './supabaseClient'
export default function Chat() {
  const [myText, setMyText] = useState('')
  const [myChats, setMyChats] = useState([])
  const [loading, setLoading] = useState(false)
  const send = async () => {
    if (!myText) return
    const myMsg = myText
    setMyText('')
    setMyChats((old) => [...old, { who: 'me', text: myMsg }])
    setLoading(true)
    const { data } = await supabase.functions.invoke('chat-gemini', { body: { message: myMsg } })
    const myReply = data?.reply || 'no reply'
    setMyChats((old) => [...old, { who: 'ai', text: myReply }])
    setLoading(false)
  }
  return (
    <div style={{ border: '1px solid #ccc', height: '60vh', display: 'flex', flexDirection: 'column', marginTop: 20 }}>
      <h3 style={{ margin: 10 }}>My chatbot</h3>
      <div style={{ flex: 1, overflowY: 'auto', padding: 10, background: '#f9f9f9' }}>
        {myChats.map((c, i) => <p key={i} style={{ textAlign: c.who === 'me' ? 'right' : 'left' }}><b>{c.who}: </b>{c.text}</p>)}
        {loading ? <p>ai typing...</p> : null}
      </div>
      <div style={{ display: 'flex', padding: 10, borderTop: '1px solid #ccc' }}>
        <input value={myText} onChange={e => setMyText(e.target.value)} placeholder="type here..." style={{ flex: 1, padding: 12, fontSize: 16 }} />
        <button onClick={send} style={{ padding: '12px 20px', marginLeft: 8 }}>Send</button>
      </div>
    </div>
  )
}