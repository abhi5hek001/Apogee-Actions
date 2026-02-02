import { Mail, Calendar, AlertCircle, Trash2, Check, Bell } from 'lucide-react'

function ActionItem({ item, onToggle, onDelete, onClick }) {
    const getIcon = (cat) => {
        switch (cat) {
            case 'email': return Mail
            case 'invite': return Calendar
            case 'prioritize': return AlertCircle
            default: return Bell
        }
    }

    const Icon = getIcon(item.category)
    const isPriority = item.category === 'prioritize'

    return (
        <div className={`group flex items-center gap-3 p-4 mb-3 rounded-2xl transition-all duration-300
      ${item.completed
                ? 'bg-gray-50 opacity-60'
                : isPriority
                    ? 'bg-red-50 border border-red-100 shadow-sm'
                    : 'bg-white border border-gray-100 shadow-sm hover:shadow-md'
            }`}
        >
            {/* Checkbox (Custom Circle) */}
            <button
                onClick={() => onToggle(item._id)}
                className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
          ${item.completed
                        ? 'bg-green-500 border-green-500 text-white'
                        : isPriority
                            ? 'border-red-300 hover:border-red-500'
                            : 'border-gray-300 hover:border-black'
                    }`}
            >
                {item.completed && <Check size={14} strokeWidth={3} />}
            </button>

            {/* Content */}
            <div className="flex-1 min-w-0 flex flex-col">
                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={onClick}
                >
                    {/* Category Icon */}
                    <Icon
                        size={14}
                        className={`${item.completed ? 'text-gray-400' : isPriority ? 'text-red-500' : 'text-gray-400'}`}
                    />
                    <span
                        className={`text-base font-medium truncate w-full
              ${item.completed ? 'line-through text-gray-400' : 'text-gray-800'}
            `}
                    >
                        {item.text}
                    </span>
                </div>
            </div>

            {/* Delete Button (Visible on hover/group-focus or always on mobile if we want) 
          For mobile assignment, let's keep it visible but subtle.
      */}
            {/* Actions */}
            <div className="flex items-center opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                <button
                    onClick={(e) => { e.stopPropagation(); onClick(); }}
                    className="p-2 text-gray-300 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                    aria-label="Edit"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); onDelete(item._id) }}
                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    aria-label="Delete"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    )
}

export default ActionItem
