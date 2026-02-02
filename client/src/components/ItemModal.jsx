import { useState } from 'react'
import { X, Calendar, Clock, Tag } from 'lucide-react'

function ItemModal({ item, onClose, onUpdate, onDelete }) {
    if (!item) return null

    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(item.text)

    const handleSave = () => {
        onUpdate(item._id, { text: editText })
        setIsEditing(false)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-0">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Card */}
            <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 transform transition-all animate-in slide-in-from-bottom-10 sm:slide-in-from-bottom-0 sm:zoom-in-95">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
                >
                    <X size={20} />
                </button>

                {/* Content */}
                <div className="mt-2">
                    {/* Category Badge */}
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4
            ${item.category === 'prioritize' ? 'bg-red-100 text-red-700' :
                            item.category === 'email' ? 'bg-blue-100 text-blue-700' :
                                item.category === 'invite' ? 'bg-purple-100 text-purple-700' :
                                    'bg-gray-100 text-gray-700'}`}
                    >
                        <Tag size={12} />
                        {item.category}
                    </div>

                    {/* Edit Mode vs View Mode */}
                    {isEditing ? (
                        <div className="mb-6">
                            <label className="block text-xs font-medium text-gray-500 mb-1">Edit Action Item</label>
                            <textarea
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="w-full border rounded-xl p-3 text-lg font-medium focus:ring-2 focus:ring-black outline-none min-h-[100px]"
                                autoFocus
                            />
                            <div className="flex gap-2 mt-4">
                                <button onClick={handleSave} className="flex-1 bg-black text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">Save Changes</button>
                                <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <h3 className="text-xl font-bold text-gray-900 leading-relaxed break-words mb-6">
                                {item.text}
                            </h3>

                            {/* Metadata */}
                            <div className="space-y-3 border-t border-gray-100 pt-4 mb-6">
                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                    <Calendar size={16} className="text-gray-400" />
                                    <span>Created: {new Date(item.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                    <Clock size={16} className="text-gray-400" />
                                    <span>Status: {item.completed ? 'Completed' : 'Pending'}</span>
                                </div>
                            </div>

                            {/* Action Buttons (Edit / Delete) */}
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex-1 bg-gray-100 text-gray-900 px-4 py-3 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                                >
                                    Edit Item
                                </button>
                                <button
                                    onClick={() => onDelete(item._id)}
                                    className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-semibold hover:bg-red-100 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </>
                    )}

                </div>
            </div>
        </div>
    )
}

export default ItemModal
