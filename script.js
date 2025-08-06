// Poker Hand History Editor - Main JavaScript

class PokerHandHistoryEditor {
    constructor() {
        this.textarea = document.getElementById('handHistory');
        this.exportBtn = document.getElementById('exportBtn');
        this.importBtn = document.getElementById('importBtn');
        this.fileInput = document.getElementById('fileInput');
        this.backspaceBtn = document.getElementById('backspaceBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.undoBtn = document.getElementById('undoBtn');
        
        // History for undo functionality
        this.history = [];
        this.historyIndex = -1;
        this.maxHistorySize = 50;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadFromLocalStorage();
        this.saveToHistory();
    }

    setupEventListeners() {
        // Keyboard button clicks
        document.querySelectorAll('.key-btn').forEach(button => {
            // Prevent virtual keyboard on mobile
            button.setAttribute('readonly', 'readonly');
            button.setAttribute('inputmode', 'none');
            button.setAttribute('autocomplete', 'off');
            button.setAttribute('autocorrect', 'off');
            button.setAttribute('autocapitalize', 'off');
            button.setAttribute('spellcheck', 'false');
            
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const value = button.dataset.value;
                if (value) {
                    this.insertText(value);
                }
            });
            
            // Prevent touch events from triggering virtual keyboard
            button.addEventListener('touchstart', (e) => {
                e.preventDefault();
            }, { passive: false });
            
            button.addEventListener('touchend', (e) => {
                e.preventDefault();
            }, { passive: false });
        });

        // Special buttons
        this.backspaceBtn.addEventListener('click', () => this.backspace());
        this.clearBtn.addEventListener('click', () => this.clearAll());
        this.undoBtn.addEventListener('click', () => this.undo());
        
        // Export/Import
        this.exportBtn.addEventListener('click', () => this.exportHistory());
        this.importBtn.addEventListener('click', () => this.fileInput.click());
        this.fileInput.addEventListener('change', (e) => this.importHistory(e));

        // Auto-save on input
        this.textarea.addEventListener('input', () => {
            this.saveToLocalStorage();
            this.saveToHistory();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
    }

    insertText(text) {
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        const currentValue = this.textarea.value;
        
        // Insert text at cursor position
        const newValue = currentValue.substring(0, start) + text + currentValue.substring(end);
        this.textarea.value = newValue;
        
        // Set cursor position after inserted text
        const newCursorPos = start + text.length;
        this.textarea.setSelectionRange(newCursorPos, newCursorPos);
        
        // Focus back to textarea
        this.textarea.focus();
        
        // Trigger input event for auto-save
        this.textarea.dispatchEvent(new Event('input'));
    }

    backspace() {
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        const currentValue = this.textarea.value;
        
        if (start === end) {
            // No selection, delete character before cursor
            if (start > 0) {
                const newValue = currentValue.substring(0, start - 1) + currentValue.substring(end);
                this.textarea.value = newValue;
                this.textarea.setSelectionRange(start - 1, start - 1);
            }
        } else {
            // Delete selected text
            const newValue = currentValue.substring(0, start) + currentValue.substring(end);
            this.textarea.value = newValue;
            this.textarea.setSelectionRange(start, start);
        }
        
        this.textarea.focus();
        this.textarea.dispatchEvent(new Event('input'));
    }

    clearAll() {
        if (confirm('Are you sure you want to clear all content?')) {
            this.textarea.value = '';
            this.textarea.focus();
            this.textarea.dispatchEvent(new Event('input'));
        }
    }

    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.textarea.value = this.history[this.historyIndex];
            this.textarea.focus();
            this.saveToLocalStorage();
        }
    }

    saveToHistory() {
        const currentValue = this.textarea.value;
        
        // Don't save if it's the same as the last entry
        if (this.history[this.historyIndex] === currentValue) {
            return;
        }
        
        // Remove future history if we're not at the end
        if (this.historyIndex < this.history.length - 1) {
            this.history = this.history.slice(0, this.historyIndex + 1);
        }
        
        // Add current state to history
        this.history.push(currentValue);
        this.historyIndex = this.history.length - 1;
        
        // Limit history size
        if (this.history.length > this.maxHistorySize) {
            this.history.shift();
            this.historyIndex--;
        }
    }

    saveToLocalStorage() {
        try {
            localStorage.setItem('pokerHandHistory', this.textarea.value);
        } catch (error) {
            console.warn('Failed to save to localStorage:', error);
        }
    }

    loadFromLocalStorage() {
        try {
            const saved = localStorage.getItem('pokerHandHistory');
            if (saved) {
                this.textarea.value = saved;
            }
        } catch (error) {
            console.warn('Failed to load from localStorage:', error);
        }
    }

    exportHistory() {
        const content = this.textarea.value;
        if (!content.trim()) {
            this.showMessage('No content to export', 'error');
            return;
        }

        try {
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `poker-hand-history-${new Date().toISOString().slice(0, 10)}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.showMessage('Hand history exported successfully!', 'success');
        } catch (error) {
            console.error('Export failed:', error);
            this.showMessage('Export failed', 'error');
        }
    }

    importHistory(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const content = e.target.result;
                this.textarea.value = content;
                this.textarea.focus();
                this.textarea.dispatchEvent(new Event('input'));
                this.showMessage('Hand history imported successfully!', 'success');
            } catch (error) {
                console.error('Import failed:', error);
                this.showMessage('Import failed', 'error');
            }
        };
        
        reader.onerror = () => {
            this.showMessage('Failed to read file', 'error');
        };
        
        reader.readAsText(file);
        
        // Reset file input
        event.target.value = '';
    }

    handleKeyboardShortcuts(event) {
        // Only handle shortcuts when textarea is focused
        if (document.activeElement !== this.textarea) return;

        // Ctrl+Z for undo
        if (event.ctrlKey && event.key === 'z') {
            event.preventDefault();
            this.undo();
        }
        
        // Ctrl+S for save (export)
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            this.exportHistory();
        }
        
        // Ctrl+O for open (import)
        if (event.ctrlKey && event.key === 'o') {
            event.preventDefault();
            this.fileInput.click();
        }
    }

    showMessage(text, type = 'success') {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());

        // Create new message
        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.textContent = text;
        document.body.appendChild(message);

        // Remove message after 3 seconds
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 3000);
    }

    // Utility method to get cursor position
    getCursorPosition() {
        return {
            start: this.textarea.selectionStart,
            end: this.textarea.selectionEnd
        };
    }

    // Utility method to set cursor position
    setCursorPosition(start, end = start) {
        this.textarea.setSelectionRange(start, end);
        this.textarea.focus();
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PokerHandHistoryEditor();
});

// Add some helpful console messages
console.log('Poker Hand History Editor loaded successfully!');
console.log('Keyboard shortcuts:');
console.log('- Ctrl+Z: Undo');
console.log('- Ctrl+S: Export');
console.log('- Ctrl+O: Import'); 