function ConfirmationModal({ isOpen, onClose, onConfirm, title, description, confirmText = "Delete", cancelText = "Cancel" }) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in"
                onClick={onClose}
            />

            {/* Dialog Content */}
            <div className="relative w-full max-w-sm bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
                        {title}
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        {description}
                    </p>
                </div>

                {/* Footer Actions */}
                <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-100">
                    <button
                        onClick={onClose}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-gray-100 h-9 px-4 py-2 text-gray-900 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-200"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-9 px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-600 text-white hover:bg-red-700"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal
