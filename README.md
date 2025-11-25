# TechBook 📖

A modern, fast web app for IT technicians to quickly access bookmarked tools and resources.

## Features

- 🚀 Fast and lightweight React + Vite setup
- 🔍 Search and filter bookmarks by category
- ➕ Add, edit, and delete bookmarks
- 💾 Bookmarks saved to browser localStorage
- 🎨 Modern, dark-themed UI
- 📱 Responsive design

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory. You can preview the production build with:

```bash
npm run preview
```

## Usage

- **Search**: Use the search bar to find bookmarks by name or URL
- **Filter**: Click category buttons to filter bookmarks
- **Add Bookmark**: Click "Add Bookmark" to add a new quick link
- **Open**: Click "Open →" on any bookmark card to open it in a new tab
- **Delete**: Click the "×" button on a bookmark card to remove it

## Customization

Bookmarks are stored in your browser's localStorage, so they persist across sessions. The app comes pre-loaded with common IT tools and resources, but you can customize it to your needs.

## Tech Stack

- React 18
- Vite 5
- Modern CSS with CSS Variables

