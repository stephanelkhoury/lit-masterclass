import { LitElement, html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

/**
 * Component demonstrating the classMap and styleMap directives
 */
export class StyleDirectiveExample extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    
    .box {
      padding: 1rem;
      margin: 0.5rem 0;
      border-radius: var(--border-radius);
      transition: all 0.3s;
    }
    
    .rounded {
      border-radius: 20px;
    }
    
    .shadow {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    
    .bordered {
      border: 2px solid currentColor;
    }
    
    .primary {
      background-color: var(--primary-color);
      color: white;
    }
    
    .secondary {
      background-color: var(--secondary-color);
      color: white;
    }
    
    .accent {
      background-color: var(--accent-color);
      color: white;
    }
    
    .controls-section {
      margin: 1.5rem 0;
      padding: 1rem;
      background-color: #f5f5f5;
      border-radius: var(--border-radius);
    }
    
    .control-group {
      margin-bottom: 1rem;
    }
    
    .control-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    
    .toggle-button {
      margin-right: 0.5rem;
      background-color: #e0e0e0;
      color: #333;
      border: none;
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .toggle-button.active {
      background-color: var(--primary-color);
      color: white;
    }
    
    .input-group {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      margin-bottom: 0.5rem;
    }
    
    input[type="range"] {
      flex: 1;
    }
    
    .info {
      background-color: #e3f2fd;
      padding: 1rem;
      border-radius: var(--border-radius);
      margin-bottom: 1rem;
      font-size: 0.9rem;
    }
  `;

  static properties = {
    classes: { type: Object },
    styles: { type: Object },
    colorTheme: { type: String }
  };

  constructor() {
    super();
    
    // Initial class settings
    this.classes = {
      box: true,
      rounded: false,
      shadow: true,
      bordered: false,
      primary: true,
      secondary: false,
      accent: false
    };
    
    // Initial inline styles
    this.styles = {
      padding: '1rem',
      fontSize: '16px',
      opacity: 1,
      transform: 'scale(1)'
    };
    
    this.colorTheme = 'primary';
  }

  // Toggle a specific class
  toggleClass(className) {
    this.classes = {
      ...this.classes,
      [className]: !this.classes[className]
    };
  }

  // Set color theme (mutually exclusive)
  setColorTheme(theme) {
    // Reset all color themes first
    const newClasses = { ...this.classes };
    newClasses.primary = false;
    newClasses.secondary = false;
    newClasses.accent = false;
    
    // Set the new theme
    newClasses[theme] = true;
    this.classes = newClasses;
    this.colorTheme = theme;
  }

  // Update a style property
  updateStyle(property, value) {
    this.styles = {
      ...this.styles,
      [property]: value
    };
  }

  render() {
    return html`
      <div class="info">
        The <code>classMap</code> and <code>styleMap</code> directives provide an efficient way to 
        add multiple classes or inline styles conditionally to elements. They're more readable and 
        performant than string concatenation.
      </div>
      
      <div class="controls-section">
        <div class="control-group">
          <label>Toggle Classes:</label>
          <button 
            class="toggle-button ${this.classes.rounded ? 'active' : ''}"
            @click=${() => this.toggleClass('rounded')}>
            Rounded
          </button>
          <button 
            class="toggle-button ${this.classes.shadow ? 'active' : ''}"
            @click=${() => this.toggleClass('shadow')}>
            Shadow
          </button>
          <button 
            class="toggle-button ${this.classes.bordered ? 'active' : ''}"
            @click=${() => this.toggleClass('bordered')}>
            Bordered
          </button>
        </div>
        
        <div class="control-group">
          <label>Color Theme:</label>
          <button 
            class="toggle-button ${this.colorTheme === 'primary' ? 'active' : ''}"
            @click=${() => this.setColorTheme('primary')}>
            Primary
          </button>
          <button 
            class="toggle-button ${this.colorTheme === 'secondary' ? 'active' : ''}"
            @click=${() => this.setColorTheme('secondary')}>
            Secondary
          </button>
          <button 
            class="toggle-button ${this.colorTheme === 'accent' ? 'active' : ''}"
            @click=${() => this.setColorTheme('accent')}>
            Accent
          </button>
        </div>
        
        <div class="control-group">
          <label>Style Properties:</label>
          <div class="input-group">
            <span>Padding:</span>
            <input 
              type="range" 
              min="0" 
              max="3" 
              step="0.1" 
              .value=${parseFloat(this.styles.padding)} 
              @input=${(e) => this.updateStyle('padding', `${e.target.value}rem`)}>
            <span>${this.styles.padding}</span>
          </div>
          
          <div class="input-group">
            <span>Font Size:</span>
            <input 
              type="range" 
              min="12" 
              max="24" 
              step="1" 
              .value=${parseFloat(this.styles.fontSize)} 
              @input=${(e) => this.updateStyle('fontSize', `${e.target.value}px`)}>
            <span>${this.styles.fontSize}</span>
          </div>
          
          <div class="input-group">
            <span>Opacity:</span>
            <input 
              type="range" 
              min="0.2" 
              max="1" 
              step="0.1" 
              .value=${this.styles.opacity} 
              @input=${(e) => this.updateStyle('opacity', e.target.value)}>
            <span>${this.styles.opacity}</span>
          </div>
          
          <div class="input-group">
            <span>Scale:</span>
            <input 
              type="range" 
              min="0.5" 
              max="1.5" 
              step="0.1" 
              .value=${parseFloat(this.styles.transform.replace('scale(', '').replace(')', ''))} 
              @input=${(e) => this.updateStyle('transform', `scale(${e.target.value})`)}>
            <span>${parseFloat(this.styles.transform.replace('scale(', '').replace(')', ''))}</span>
          </div>
        </div>
      </div>
      
      <div class=${classMap(this.classes)} style=${styleMap(this.styles)}>
        <h3>Dynamic Styling Example</h3>
        <p>This box is styled dynamically using classMap and styleMap directives.</p>
        <p>Try changing the controls above to see how the appearance updates in real-time.</p>
      </div>
    `;
  }
}

customElements.define('style-directive-example', StyleDirectiveExample);
