import { useState } from 'react'
import './App.css'

// Sample bookmarks for IT technicians
const defaultBookmarks = [
  {
    id: 1,
    name: 'GitHub',
    url: 'https://github.com',
    category: 'Development',
    icon: '🔗'
  },
  {
    id: 2,
    name: 'Stack Overflow',
    url: 'https://stackoverflow.com',
    category: 'Development',
    icon: '💬'
  },
  {
    id: 3,
    name: 'MDN Web Docs',
    url: 'https://developer.mozilla.org',
    category: 'Documentation',
    icon: '📚'
  },
  {
    id: 4,
    name: 'Can I Use',
    url: 'https://caniuse.com',
    category: 'Tools',
    icon: '🌐'
  },
  {
    id: 5,
    name: 'Regex101',
    url: 'https://regex101.com',
    category: 'Tools',
    icon: '🔍'
  },
  {
    id: 6,
    name: 'JSON Formatter',
    url: 'https://jsonformatter.org',
    category: 'Tools',
    icon: '📄'
  },
  {
    id: 7,
    name: 'Base64 Encode/Decode',
    url: 'https://www.base64encode.org',
    category: 'Tools',
    icon: '🔐'
  },
  {
    id: 8,
    name: 'IP Address Lookup',
    url: 'https://www.whatismyip.com',
    category: 'Network',
    icon: '🌍'
  },
  {
    id: 9,
    name: 'Ping Test',
    url: 'https://www.cloudping.info',
    category: 'Network',
    icon: '📡'
  },
  {
    id: 10,
    name: 'SSL Labs Test',
    url: 'https://www.ssllabs.com/ssltest',
    category: 'Security',
    icon: '🔒'
  },
  {
    id: 11,
    name: 'VirusTotal',
    url: 'https://www.virustotal.com',
    category: 'Security',
    icon: '🛡️'
  },
  {
    id: 12,
    name: 'Have I Been Pwned',
    url: 'https://haveibeenpwned.com',
    category: 'Security',
    icon: '🔓'
  },
  {
    id: 13,
    name: 'Postman',
    url: 'https://www.postman.com',
    category: 'Development',
    icon: '📮'
  },
  {
    id: 14,
    name: 'Figma',
    url: 'https://www.figma.com',
    category: 'Design',
    icon: '🎨'
  },
  {
    id: 15,
    name: 'Cloudflare Status',
    url: 'https://www.cloudflarestatus.com',
    category: 'Monitoring',
    icon: '☁️'
  },
  {
    id: 16,
    name: 'AWS Status',
    url: 'https://status.aws.amazon.com',
    category: 'Monitoring',
    icon: '☁️'
  }
]

function App() {
  const [bookmarks, setBookmarks] = useState(() => {
    // Load from localStorage or use defaults
    const saved = localStorage.getItem('techbook-bookmarks')
    return saved ? JSON.parse(saved) : defaultBookmarks
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newBookmark, setNewBookmark] = useState({ name: '', url: '', category: 'Tools', icon: '🔗' })

  // Save to localStorage whenever bookmarks change
  const saveBookmarks = (updatedBookmarks) => {
    setBookmarks(updatedBookmarks)
    localStorage.setItem('techbook-bookmarks', JSON.stringify(updatedBookmarks))
  }

  // Get unique categories
  const categories = ['All', ...new Set(bookmarks.map(b => b.category))]

  // Filter bookmarks
  const filteredBookmarks = bookmarks.filter(bookmark => {
    const matchesSearch = bookmark.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bookmark.url.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || bookmark.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Add new bookmark
  const handleAddBookmark = (e) => {
    e.preventDefault()
    if (newBookmark.name && newBookmark.url) {
      const bookmark = {
        id: Date.now(),
        name: newBookmark.name,
        url: newBookmark.url.startsWith('http') ? newBookmark.url : `https://${newBookmark.url}`,
        category: newBookmark.category,
        icon: newBookmark.icon || '🔗'
      }
      saveBookmarks([...bookmarks, bookmark])
      setNewBookmark({ name: '', url: '', category: 'Tools', icon: '🔗' })
      setShowAddForm(false)
    }
  }

  // Delete bookmark
  const handleDeleteBookmark = (id) => {
    if (confirm('Are you sure you want to delete this bookmark?')) {
      saveBookmarks(bookmarks.filter(b => b.id !== id))
    }
  }

  // Open bookmark in new tab
  const handleOpenBookmark = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="app">
      <header className="header">
        <h1>📖 TechBook</h1>
        <p className="subtitle">Quick access to your IT tools and resources</p>
      </header>

      <div className="controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search bookmarks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="add-btn"
        >
          {showAddForm ? '✕ Cancel' : '+ Add Bookmark'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddBookmark} className="add-form">
          <input
            type="text"
            placeholder="Name"
            value={newBookmark.name}
            onChange={(e) => setNewBookmark({ ...newBookmark, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="URL"
            value={newBookmark.url}
            onChange={(e) => setNewBookmark({ ...newBookmark, url: e.target.value })}
            required
          />
          <select
            value={newBookmark.category}
            onChange={(e) => setNewBookmark({ ...newBookmark, category: e.target.value })}
          >
            {categories.filter(c => c !== 'All').map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Icon (emoji)"
            value={newBookmark.icon}
            onChange={(e) => setNewBookmark({ ...newBookmark, icon: e.target.value })}
            maxLength="2"
          />
          <button type="submit" className="submit-btn">Add</button>
        </form>
      )}

      <div className="bookmarks-grid">
        {filteredBookmarks.length === 0 ? (
          <div className="empty-state">
            <p>No bookmarks found. Try adjusting your search or category filter.</p>
          </div>
        ) : (
          filteredBookmarks.map(bookmark => (
            <div key={bookmark.id} className="bookmark-card">
              <div className="bookmark-header">
                <span className="bookmark-icon">{bookmark.icon}</span>
                <button
                  onClick={() => handleDeleteBookmark(bookmark.id)}
                  className="delete-btn"
                  title="Delete bookmark"
                >
                  ×
                </button>
              </div>
              <h3 className="bookmark-name">{bookmark.name}</h3>
              <p className="bookmark-url">{bookmark.url}</p>
              <span className="bookmark-category">{bookmark.category}</span>
              <button
                onClick={() => handleOpenBookmark(bookmark.url)}
                className="open-btn"
              >
                Open →
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App

