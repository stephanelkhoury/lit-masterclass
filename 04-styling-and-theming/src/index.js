/**
 * Lit Masterclass - Module 4: Styling and Theming
 * Main entry point for the application
 */

// Import components
import './components/theme-selector.js';
import './components/themed-button.js';
import './components/themed-card.js';
import './components/responsive-grid.js';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  console.log('Module 4: Styling and Theming initialized');
  
  // Listen for theme changes
  document.addEventListener('theme-change', (e) => {
    console.log(`Theme changed to: ${e.detail.theme}`);
  });
});
