import { LitElement, html, css } from 'lit';
import { highlight } from '../../directives/highlight-directive.js';

/**
 * Component demonstrating the custom highlight directive
 */
export class HighlightDirectiveExample extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    
    .info {
      background-color: #e3f2fd;
      padding: 1rem;
      border-radius: var(--border-radius);
      margin-bottom: 1rem;
      font-size: 0.9rem;
    }
    
    .controls {
      margin: 1rem 0;
    }
    
    input[type="text"] {
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: var(--border-radius);
      width: 100%;
      margin-bottom: 0.5rem;
      font-size: 1rem;
    }
    
    .text-container {
      border: 1px solid #ddd;
      border-radius: var(--border-radius);
      padding: 1.5rem;
      margin: 1rem 0;
      background-color: white;
    }
    
    .highlight {
      background-color: #fff176;
      padding: 0 2px;
      border-radius: 2px;
    }
    
    .example-paragraph + .example-paragraph {
      margin-top: 1rem;
    }
    
    label {
      display: flex;
      align-items: center;
      margin: 0.5rem 0;
    }
    
    label input[type="checkbox"] {
      margin-right: 0.5rem;
    }
  `;

  static properties = {
    searchTerm: { type: String },
    caseSensitive: { type: Boolean }
  };

  constructor() {
    super();
    this.searchTerm = 'lit';
    this.caseSensitive = false;
  }

  // Handle search input changes
  handleSearchInput(e) {
    this.searchTerm = e.target.value;
  }

  // Toggle case sensitivity
  toggleCaseSensitivity() {
    this.caseSensitive = !this.caseSensitive;
  }

  render() {
    const paragraph1 = `Lit is a simple, fast, and lightweight library for building web components. 
                      It provides a set of features including declarative templates, reactive properties, 
                      and efficient rendering.`;
                      
    const paragraph2 = `With Lit, you can create custom elements that work in any framework or with no 
                      framework at all. Lit uses standard web platform features and modern JavaScript.
                      Lit elements are just standard custom elements with a supercharged templating system.`;
                      
    const paragraph3 = `The Lit library includes several packages: lit-html for HTML templating, 
                      lit-element for creating web components, and various directives to extend 
                      the templating system.`;

    return html`
      <div class="info">
        This example demonstrates a custom directive for highlighting search terms within text.
        The directive takes a text string, a search term, and an optional case-sensitivity flag.
      </div>
      
      <div class="controls">
        <input 
          type="text" 
          placeholder="Search term..." 
          .value="${this.searchTerm}"
          @input="${this.handleSearchInput}">
          
        <label>
          <input 
            type="checkbox" 
            ?checked="${this.caseSensitive}"
            @change="${this.toggleCaseSensitivity}">
          Case sensitive
        </label>
      </div>
      
      <div class="text-container">
        <p class="example-paragraph">
          ${highlight(paragraph1, this.searchTerm, this.caseSensitive)}
        </p>
        
        <p class="example-paragraph">
          ${highlight(paragraph2, this.searchTerm, this.caseSensitive)}
        </p>
        
        <p class="example-paragraph">
          ${highlight(paragraph3, this.searchTerm, this.caseSensitive)}
        </p>
      </div>
    `;
  }
}

customElements.define('highlight-directive-example', HighlightDirectiveExample);
