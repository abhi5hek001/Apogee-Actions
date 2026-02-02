import { useState, useEffect } from 'react'
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics'
import InputArea from './components/InputArea'
import ActionList from './components/ActionList'

import ItemModal from './components/ItemModal'
import ConfirmationModal from './components/ConfirmationModal'

// Use current hostname (works for localhost and WiFi IP)
// Fallback to localhost if hostname is missing (e.g. some environments)
const API_URL = `http://${window.location.hostname || 'localhost'}:5000/api/items`

function App() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState(null)
  const [deleteCandidate, setDeleteCandidate] = useState(null)
  const [completeCandidate, setCompleteCandidate] = useState(null)

  // Fetch Items from Backend
  useEffect(() => {
    fetchItems()
  }, [])


  const fetchItems = async () => {
    try {
      const res = await fetch(API_URL)
      const data = await res.json()
      if (Array.isArray(data)) {
        setItems(data)
      } else {
        console.error('API Error:', data)
        setItems([])
      }
      setLoading(false)
    } catch (err) {
      console.error('Error fetching items:', err)
      setLoading(false)
    }
  }

  const addAction = async (text, category) => {
    try {
      // Haptic Feedback for "Success"
      await Haptics.notification({ type: NotificationType.Success })

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, category })
      })
      const newItem = await res.json()
      setItems([newItem, ...items])
    } catch (err) {
      console.error('Error adding item:', err)
      await Haptics.notification({ type: NotificationType.Error })
    }
  }

  const confirmToggleComplete = (id) => {
    const item = items.find(i => i._id === id)
    if (!item) return

    // If implementing "Uncheck" without confirmation, add check here.
    // For now, confirm both check and uncheck as requested.
    setCompleteCandidate(item)
  }

  const executeComplete = async () => {
    if (!completeCandidate) return
    const id = completeCandidate._id
    const newStatus = !completeCandidate.completed

    setCompleteCandidate(null)

    try {
      // Light Impact for Checkbox Tick
      await Haptics.impact({ style: ImpactStyle.Light })

      // Optimistic Update
      setItems(items.map(item =>
        item._id === id ? { ...item, completed: newStatus } : item
      ))

      await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: newStatus })
      })
    } catch (err) {
      console.error('Error updating item:', err)
      fetchItems() // Revert on error
    }
  }

  const updateAction = async (id, updates) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })
      const updatedItem = await res.json()
      setItems(items.map(i => i._id === id ? updatedItem : i))
      setSelectedItem(null) // Close modal
    } catch (err) {
      console.error('Error updating item:', err)
    }
  }

  // Set the candidate for deletion (opens modal)
  const confirmDelete = (id) => {
    const item = items.find(i => i._id === id)
    setDeleteCandidate(item)
  }

  // Actually perform the delete
  const executeDelete = async () => {
    if (!deleteCandidate) return
    const id = deleteCandidate._id

    // Close modal
    setDeleteCandidate(null)
    setSelectedItem(null) // Close detail modal if open

    try {
      // Medium Impact for Deletion
      await Haptics.impact({ style: ImpactStyle.Medium })

      // Optimistic Update
      setItems(items.filter(item => item._id !== id))

      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      })
    } catch (err) {
      console.error('Error deleting item:', err)
      fetchItems() // Revert on error
    }
  }

  // Sorting: Prioritize first, then newest
  const sortedItems = [...items].sort((a, b) => {
    if (a.completed === b.completed) {
      if (a.category === 'prioritize' && b.category !== 'prioritize') return -1
      if (b.category === 'prioritize' && a.category !== 'prioritize') return 1
      return new Date(b.createdAt) - new Date(a.createdAt)
    }
    return a.completed ? 1 : -1
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 font-sans text-gray-900">
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden min-h-[80vh] flex flex-col relative">

        {/* Header */}
        <header className="p-6 pb-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Action Items</h1>
          <p className="text-gray-500 text-sm mt-1">
            {loading ? 'Syncing...' : `${items.filter(i => !i.completed).length} pending tasks`}
          </p>
        </header>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-2">
          {loading ? (
            <div className="p-8 text-center text-gray-400">Loading your tasks...</div>
          ) : (
            <ActionList
              items={sortedItems}
              onToggle={confirmToggleComplete}
              onDelete={confirmDelete}
              onItemClick={setSelectedItem}
            />
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white/90 backdrop-blur-md border-t border-gray-100 z-10">
          <InputArea onAdd={addAction} />
        </div>

        {/* Detail Modal */}
        <ItemModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onUpdate={updateAction}
          onDelete={confirmDelete}
        />

        {/* Confirmation Modal (Delete) */}
        <ConfirmationModal
          isOpen={!!deleteCandidate}
          title="Delete Action Item"
          description={`Are you sure you want to remove "${deleteCandidate?.text}"? This action cannot be undone.`}
          onClose={() => setDeleteCandidate(null)}
          onConfirm={executeDelete}
          confirmText="Delete"
        />

        {/* Confirmation Modal (Complete) */}
        <ConfirmationModal
          isOpen={!!completeCandidate}
          title={completeCandidate?.completed ? "Mark as Incomplete?" : "Mark as Complete?"}
          description={`Are you sure you want to mark "${completeCandidate?.text}" as ${completeCandidate?.completed ? 'incomplete' : 'done'}?`}
          onClose={() => setCompleteCandidate(null)}
          onConfirm={executeComplete}
          confirmText={completeCandidate?.completed ? "Mark Incomplete" : "Mark Complete"}
          cancelText="Cancel"
        />

      </div>
    </div>
  )
}

export default App
