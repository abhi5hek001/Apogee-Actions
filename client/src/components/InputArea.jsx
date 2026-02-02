import { useState } from 'react'
import { Send, Bell, Mail, Calendar, AlertCircle } from 'lucide-react'

function InputArea({ onAdd }) {
    const [text, setText] = useState('')
    const [category, setCategory] = useState('remind') // Default

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!text.trim()) return
        onAdd(text, category)
        setText('')
        setCategory('remind') // Reset to default
    }

    const categories = [
        { id: 'remind', icon: Bell, label: 'Remind', color: 'text-gray-600' },
        { id: 'email', icon: Mail, label: 'Email', color: 'text-blue-500' },
        { id: 'invite', icon: Calendar, label: 'Invite', color: 'text-purple-500' },
        { id: 'prioritize', icon: AlertCircle, label: 'Priority', color: 'text-red-500' },
    ]

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {/* Category Toggles - Horizontal Scroll for mobile */}
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {categories.map((cat) => {
                    const Icon = cat.icon
                    const isActive = category === cat.id
                    return (
                        <button
                            key={cat.id}
                            type="button"
                            onClick={() => setCategory(cat.id)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap border
                ${isActive
                                    ? 'bg-black text-white border-black scale-105 shadow-md'
                                    : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                                }`}
                        >
                            <Icon size={14} className={isActive ? 'text-white' : cat.color} />
                            {cat.label}
                        </button>
                    )
                })}
            </div>

            {/* Input Field */}
            <div className="relative flex items-center">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="New action item..."
                    className="w-full bg-gray-100 text-gray-900 rounded-2xl py-3.5 pl-5 pr-12 outline-none focus:ring-2 focus:ring-black/5 transition-all placeholder:text-gray-400"
                />
                <button
                    type="submit"
                    disabled={!text.trim()}
                    className="absolute right-2 p-2 bg-black text-white rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
                >
                    <Send size={18} />
                </button>
            </div>
        </form>
    )
}

export default InputArea
