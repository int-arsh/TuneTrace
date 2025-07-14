# TuneTrace 🎵

A modern, responsive Song Lyrics Finder App built with React, Vite, and Tailwind CSS. Search for any song and get instant access to lyrics, artist information, and more.

## ✨ Features

- **🎯 Smart Search**: Search for songs by artist name and title with intelligent suggestions
- **📝 Complete Lyrics**: Get full lyrics with proper formatting and structure
- **👤 Artist Information**: Detailed artist bios, background info, and Wikipedia integration
- **🌙 Dark/Light Theme**: Beautiful theme toggle with system preference detection
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **🔗 Dynamic Routing**: Clean URLs with `/lyrics/:artist/:title` structure
- **📋 Copy Functionality**: One-click lyrics copying to clipboard
- **🔄 Error Handling**: Graceful error handling with user-friendly messages
- **⚡ Fast Performance**: Built with Vite for lightning-fast development and builds

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS 4
- **Routing**: React Router DOM
- **Package Manager**: Bun
- **APIs**: 
  - Lyrics.ovh API for lyrics
  - MusicBrainz API for artist information
  - Wikipedia API for artist bios

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TuneTrace
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Start the development server**
   ```bash
   bun dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── SearchBar.jsx    # Search input with suggestions
│   ├── LyricsDisplay.jsx # Lyrics display with copy functionality
│   ├── ArtistInfo.jsx   # Artist information and bio
│   └── ThemeToggle.jsx  # Dark/light theme toggle
├── pages/              # Page components
│   ├── HomePage.jsx    # Landing page with search
│   ├── LyricsPage.jsx  # Lyrics and artist info display
│   └── NotFoundPage.jsx # 404 error page
├── context/            # React Context providers
│   └── ThemeContext.jsx # Theme management
├── utils/              # Utility functions
│   └── api.js          # API integration functions
├── App.jsx             # Main app component with routing
├── main.jsx            # App entry point
└── index.css           # Global styles and Tailwind imports
```

## 🎨 Features in Detail

### Search Functionality
- Dual input fields for artist and song title
- Real-time search suggestions
- Auto-complete with popular songs
- URL-based navigation

### Lyrics Display
- Clean, formatted lyrics presentation
- Section headers (Verse, Chorus, etc.) highlighting
- One-click copy to clipboard
- Responsive design for all screen sizes

### Artist Information
- Basic artist details (type, country, gender)
- Genre tags and active dates
- Wikipedia biography integration
- Expandable/collapsible bio sections

### Theme System
- Automatic system preference detection
- Persistent theme storage
- Smooth transitions between themes
- Consistent dark/light mode styling

## 🔧 API Integration

### Lyrics.ovh API
- Fetches song lyrics by artist and title
- Error handling for missing lyrics
- Rate limiting consideration

### MusicBrainz API
- Artist search and basic information
- Genre tags and metadata
- Wikipedia relation detection

### Wikipedia API
- Artist biography extraction
- Thumbnail images
- Direct links to full articles

## 📱 Responsive Design

The app is fully responsive with breakpoints for:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🎯 Usage Examples

### Search for a Song
1. Visit the homepage
2. Enter artist name (e.g., "The Beatles")
3. Enter song title (e.g., "Hey Jude")
4. Click "Search Lyrics" or press Enter

### Navigate Directly
Use the URL format: `/lyrics/artist-name/song-title`
Example: `/lyrics/The%20Beatles/Hey%20Jude`

### Popular Songs
The homepage includes quick links to popular songs for easy testing.

## 🚀 Deployment

### Build for Production
```bash
bun run build
# or
npm run build
```

### Preview Production Build
```bash
bun run preview
# or
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Lyrics.ovh](https://lyrics.ovh/) for providing the lyrics API
- [MusicBrainz](https://musicbrainz.org/) for artist information
- [Wikipedia](https://www.wikipedia.org/) for artist biographies
- [Tailwind CSS](https://tailwindcss.com/) for the amazing styling framework
- [React](https://reactjs.org/) for the powerful UI library

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the existing issues
2. Create a new issue with detailed information
3. Include browser console errors if applicable

---

Made with ❤️ by [Your Name]
