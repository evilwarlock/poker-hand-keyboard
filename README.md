# Poker Hand History Editor

A web-based poker hand history editor designed for easy creation and editing of poker hand histories. Built with vanilla JavaScript, HTML, and CSS, optimized for deployment on GitHub Pages.

## Features

### 🎯 Core Functionality
- **Custom Keyboard**: Quick input buttons for poker-specific terms and actions
- **Real-time Editing**: Large textarea for comfortable hand history editing
- **Auto-save**: Automatically saves your work to browser's local storage
- **Export/Import**: Save and load hand history files

### ⌨️ Custom Keyboard Categories
- **Numbers & Ranks**: 0-9, T, J, Q, K, A
- **Poker Actions**: Check, Fold, Call, Raise, Hero
- **Positions**: UTG, UTG1, MP, LJ, HJ, CO, BTN, SB, BB
- **Bet Sizing**: 3bet, 4bet, 5bet, All-in
- **Street Indicators**: Flop, Turn, River
- **Suitedness**: s (spades), h (hearts), d (diamonds), c (clubs)
- **Utility**: Space, Newline, Backspace, Clear All, Undo

### 💾 Data Management
- **Local Storage**: Automatic saving to browser storage
- **Export**: Download hand history as .txt file
- **Import**: Load previously saved hand history files
- **Undo**: Revert changes with undo functionality

### ⌨️ Keyboard Shortcuts
- `Ctrl+Z`: Undo
- `Ctrl+S`: Export hand history
- `Ctrl+O`: Import hand history

## Getting Started

### Local Development
1. Clone or download the repository
2. Open `index.html` in your web browser
3. Start creating your poker hand histories!

### GitHub Pages Deployment
1. Push the code to a GitHub repository
2. Go to repository Settings → Pages
3. Select "Deploy from a branch" and choose your main branch
4. Your app will be available at `https://yourusername.github.io/repository-name`

## Usage

### Creating Hand Histories
1. Click on the textarea to focus it
2. Use the custom keyboard buttons to quickly insert poker terms
3. Type manually or use the buttons for common poker actions
4. Your work is automatically saved as you type

### Exporting Hand Histories
1. Click the "Export" button or use `Ctrl+S`
2. The hand history will be downloaded as a .txt file
3. File will be named with the current date

### Importing Hand Histories
1. Click the "Import" button or use `Ctrl+O`
2. Select a .txt file containing your hand history
3. The content will be loaded into the editor

### Using the Custom Keyboard
- **Numbers & Ranks**: Click to insert card values
- **Poker Actions**: Quick insertion of common poker actions
- **Bet Sizing**: Insert betting terminology
- **Street Indicators**: Mark different streets in the hand
- **Suitedness**: Indicate card suits and combinations
- **Utility**: Basic text editing functions

## File Structure

```
/
├── index.html          # Main HTML file
├── style.css           # Custom CSS styles
├── script.js           # JavaScript functionality
└── README.md          # This file
```

## Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ❌ Internet Explorer (not supported)

## Features in Detail

### Auto-save
The application automatically saves your work to the browser's local storage every time you make a change. This means your work is never lost, even if you accidentally close the browser.

### Undo Functionality
The undo feature maintains a history of your changes (up to 50 states) and allows you to revert to previous versions of your hand history.

### Responsive Design
The application is designed to work well on both desktop and mobile devices, with touch-friendly buttons and responsive layout.

### Custom Keyboard
The custom keyboard is organized into logical categories to make it easy to find and use the right buttons for your poker hand history needs.

## Contributing

Feel free to contribute to this project by:
- Reporting bugs
- Suggesting new features
- Improving the UI/UX
- Adding new keyboard shortcuts

## License

This project is open source and available under the MIT License.

## Support

If you encounter any issues or have questions, please:
1. Check the browser console for error messages
2. Ensure you're using a modern browser
3. Try clearing your browser's local storage if auto-save isn't working

---

**Happy poker hand history editing!** 🃏 