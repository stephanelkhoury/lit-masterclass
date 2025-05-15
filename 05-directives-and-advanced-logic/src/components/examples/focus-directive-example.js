import { LitElement, html, css } from 'lit';
import { focusWhen } from '../../directives/focus-directive.js';

/**
 * Component demonstrating the custom focus directive
 */
export class FocusDirectiveExample extends LitElement {
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
    
    .form-group {
      margin-bottom: 1rem;
    }
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    
    input, select {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: var(--border-radius);
      font-size: 1rem;
    }
    
    input:focus, select:focus {
      outline: 2px solid var(--primary-color);
      border-color: var(--primary-color);
    }
    
    .form-buttons {
      display: flex;
      gap: 0.5rem;
      margin: 1.5rem 0 1rem;
    }
    
    .focused-indicator {
      position: absolute;
      top: -8px;
      right: -8px;
      background-color: var(--primary-color);
      color: white;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: bold;
    }
    
    .field-container {
      position: relative;
    }
    
    .options {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 1rem;
      padding: 1rem;
      background-color: #f5f5f5;
      border-radius: var(--border-radius);
    }
    
    .checkbox-group {
      display: flex;
      align-items: center;
    }
    
    .checkbox-group input {
      width: auto;
      margin-right: 0.5rem;
    }
  `;

  static properties = {
    focusedField: { type: String },
    focusOptions: { type: Object },
    formData: { type: Object }
  };

  constructor() {
    super();
    
    this.focusedField = 'name';
    this.focusOptions = {
      preventScroll: false,
      select: false,
      delay: 0
    };
    
    this.formData = {
      name: '',
      email: '',
      phone: '',
      country: 'us'
    };
  }

  // Set which field should be focused
  focusField(fieldName) {
    this.focusedField = fieldName;
  }

  // Handle input changes
  handleInput(e, field) {
    this.formData = {
      ...this.formData,
      [field]: e.target.value
    };
  }

  // Toggle focus options
  toggleOption(option) {
    this.focusOptions = {
      ...this.focusOptions,
      [option]: !this.focusOptions[option]
    };
  }
  
  // Update delay option
  updateDelay(e) {
    this.focusOptions = {
      ...this.focusOptions,
      delay: parseInt(e.target.value) || 0
    };
  }

  // Reset the form
  resetForm() {
    this.formData = {
      name: '',
      email: '',
      phone: '',
      country: 'us'
    };
    this.focusedField = 'name';
  }

  render() {
    return html`
      <div class="info">
        This example demonstrates a custom focus directive that allows declarative
        control of element focus based on conditions. The directive supports options
        like text selection, preventing scroll, and applying focus with delay.
      </div>
      
      <div class="options">
        <div class="checkbox-group">
          <input 
            type="checkbox" 
            id="select-option"
            ?checked=${this.focusOptions.select}
            @change=${() => this.toggleOption('select')}>
          <label for="select-option">Select text when focused</label>
        </div>
        
        <div class="checkbox-group">
          <input 
            type="checkbox" 
            id="prevent-scroll"
            ?checked=${this.focusOptions.preventScroll}
            @change=${() => this.toggleOption('preventScroll')}>
          <label for="prevent-scroll">Prevent scroll</label>
        </div>
        
        <div class="checkbox-group">
          <label for="delay">Focus delay (ms): </label>
          <input 
            type="number" 
            id="delay"
            min="0" 
            max="2000"
            style="width: 80px"
            .value=${this.focusOptions.delay}
            @input=${this.updateDelay}>
        </div>
      </div>
      
      <div class="form-buttons">
        <button @click=${() => this.focusField('name')}>Focus Name</button>
        <button @click=${() => this.focusField('email')}>Focus Email</button>
        <button @click=${() => this.focusField('phone')}>Focus Phone</button>
        <button @click=${() => this.focusField('country')}>Focus Country</button>
        <button @click=${this.resetForm}>Reset Form</button>
      </div>
      
      <div class="form-group">
        <div class="field-container">
          <label for="name">Full Name</label>
          <input 
            type="text" 
            id="name"
            .value=${this.formData.name}
            @input=${(e) => this.handleInput(e, 'name')}
            ${focusWhen(this.focusedField === 'name', this.focusOptions)}>
          ${this.focusedField === 'name' ? html`<span class="focused-indicator">F</span>` : ''}
        </div>
      </div>
      
      <div class="form-group">
        <div class="field-container">
          <label for="email">Email Address</label>
          <input 
            type="email" 
            id="email"
            .value=${this.formData.email}
            @input=${(e) => this.handleInput(e, 'email')}
            ${focusWhen(this.focusedField === 'email', this.focusOptions)}>
          ${this.focusedField === 'email' ? html`<span class="focused-indicator">F</span>` : ''}
        </div>
      </div>
      
      <div class="form-group">
        <div class="field-container">
          <label for="phone">Phone Number</label>
          <input 
            type="tel" 
            id="phone"
            .value=${this.formData.phone}
            @input=${(e) => this.handleInput(e, 'phone')}
            ${focusWhen(this.focusedField === 'phone', this.focusOptions)}>
          ${this.focusedField === 'phone' ? html`<span class="focused-indicator">F</span>` : ''}
        </div>
      </div>
      
      <div class="form-group">
        <div class="field-container">
          <label for="country">Country</label>
          <select 
            id="country"
            .value=${this.formData.country}
            @change=${(e) => this.handleInput(e, 'country')}
            ${focusWhen(this.focusedField === 'country', this.focusOptions)}>
            <option value="us">United States</option>
            <option value="ca">Canada</option>
            <option value="mx">Mexico</option>
            <option value="uk">United Kingdom</option>
            <option value="fr">France</option>
            <option value="de">Germany</option>
          </select>
          ${this.focusedField === 'country' ? html`<span class="focused-indicator">F</span>` : ''}
        </div>
      </div>
    `;
  }
}

customElements.define('focus-directive-example', FocusDirectiveExample);
