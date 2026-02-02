import ActionItem from './ActionItem'
import { Inbox } from 'lucide-react'

function ActionList({ items, onToggle, onDelete, onItemClick }) {
    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 opacity-50">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                    <Inbox size={32} />
                </div>
                <h3 className="text-lg font-semibold text-gray-700">All clear</h3>
                <p className="text-sm text-gray-500 max-w-[200px]">
                    You have no action items. Enjoy your day!
                </p>
            </div>
        )
    }

    return (
        <div className="pb-20">
            {/* Safe padding at bottom for sticky input */}
            {items.map((item) => (
                <ActionItem
                    key={item._id}
                    item={item}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onClick={() => onItemClick(item)}
                />
            ))}
        </div>
    )
}

export default ActionList
