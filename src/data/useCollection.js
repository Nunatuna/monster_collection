import { useEffect, useState } from 'react'

const STORAGE_KEY = 'monster-can-collection'

// A few starter entries so the grid isn't empty on first load.
// Delete these or edit them freely — everything here is just local state.
const STARTER_CANS = [
  {
    id: 'starter-1',
    name: 'Original Green',
    flavor: '',
    image: '',
    collected: false,
  },
]

function loadCollection() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return STARTER_CANS
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed) && parsed.length > 0) return parsed
    return STARTER_CANS
  } catch {
    return STARTER_CANS
  }
}

export function useCollection() {
  const [cans, setCans] = useState(loadCollection)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cans))
    } catch {
      // storage full or unavailable — collection just won't persist this run
    }
  }, [cans])

  function addCan(can) {
    setCans((prev) => [
      ...prev,
      {
        id: `can-${Date.now()}`,
        name: can.name,
        flavor: can.flavor || '',
        image: can.image || '',
        collected: true,
      },
    ])
  }

  function toggleCollected(id) {
    setCans((prev) =>
      prev.map((c) => (c.id === id ? { ...c, collected: !c.collected } : c)),
    )
  }

  function removeCan(id) {
    setCans((prev) => prev.filter((c) => c.id !== id))
  }

  return { cans, addCan, toggleCollected, removeCan }
}
