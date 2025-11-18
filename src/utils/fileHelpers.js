//Get an emoji icon representing a file based on its type.
export function getFileIcon(type) {
    const icons = {
      folder: '📁',
      pdf: '📄',
      document: '📝',
      image: '🖼️',
      archive: '📦',
      audio: '🎵',
      video: '🎬'
    }
    return icons[type] || '📄'
}

//Get the gradient color class for a file based on its type.
export function getFileColor(type) {
    const colors = {
      folder: 'from-purple-500 to-purple-700',
      pdf: 'from-red-500 to-red-700',
      document: 'from-blue-500 to-blue-700',
      image: 'from-green-500 to-green-700',
      archive: 'from-yellow-500 to-yellow-700',
      audio: 'from-pink-500 to-pink-700',
      video: 'from-indigo-500 to-indigo-700'
    }
    return colors[type] || 'from-gray-500 to-gray-700'
}

// Convert a date into a human-friendly relative string
export function formatDate(date) {
  const now = new Date()
  const diff = now - new Date(date)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`
  return `${Math.floor(days / 30)} months ago`
}