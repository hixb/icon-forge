import { ArrowRight } from '@dawnice/icon-forge-react'
import './App.css'

export default function App() {
  return (
    <div style={{ padding: '50px', fontSize: '24px' }}>
      <h1>Icon Forge Demo</h1>

      <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
        <ArrowRight size={24} />
        <ArrowRight size={32} color="blue" />
        <ArrowRight size={48} color="red" strokeWidth={3} />
      </div>
    </div>
  )
}
