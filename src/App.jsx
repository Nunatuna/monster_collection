import { useMemo, useState } from 'react'
import CanCard from './components/CanCard.jsx'
import { cans } from './data/cans.js'
import './App.css'

export default function App() {
  const [filter, setFilter] = useState('all') // all | collected | missing
  const [expandedId, setExpandedId] = useState(null)

  const collectedCount = cans.filter((c) => c.collected).length

  const visibleCans = useMemo(() => {
    if (filter === 'collected') return cans.filter((c) => c.collected)
    if (filter === 'missing') return cans.filter((c) => !c.collected)
    return cans
  }, [filter])

  function handleToggle(id) {
    setExpandedId((current) => (current === id ? null : id))
  }

  return (
    <div className="app">
      <header className="app__header">
        <p className="app__eyebrow">PERSONAL STASH / TRACKER</p>
        <h1 className="app__title">Can Collection</h1>
        <div className="app__meter">
          <span className="app__meter-count">{String(collectedCount).padStart(2, '0')}</span>
          <span className="app__meter-label">
            can{collectedCount === 1 ? '' : 's'} collected
          </span>
        </div>
      </header>

      <div className="app__filters" role="tablist" aria-label="Filter cans">
        {[
          { key: 'all', label: 'All' },
          { key: 'collected', label: 'Collected' },
          { key: 'missing', label: 'Not yet' },
        ].map((f) => (
          <button
            key={f.key}
            role="tab"
            aria-selected={filter === f.key}
            className={`app__filter ${filter === f.key ? 'is-active' : ''}`}
            onClick={() => {
              setFilter(f.key)
              setExpandedId(null)
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {visibleCans.length === 0 ? (
        <div className="app__empty">
          <p>Nothing here yet. Add one in src/data/cans.js.</p>
        </div>
      ) : (
        <div className="app__grid">
          {visibleCans.map((can) => (
            <CanCard
              key={can.id}
              name={can.name}
              flavor={can.flavor}
              image={can.image}
              collected={can.collected}
              expanded={expandedId === can.id}
              onToggle={() => handleToggle(can.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
