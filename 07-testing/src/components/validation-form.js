import { LitElement, html, css } from 'lit';

/**
 * A form component with validation for testing purposes
 * 
 * @fires form-submit - Fired when the form is submitted successfully with detail { formData }
 * @fires validation-error - Fired when validation fails with detail { errors }
 */
export class ValidationForm extends LitElement {
  static properties = {
    formData: { type: Object },
    errors: { type: Object },
    loading: { type: Boolean }
  };

  static styles = css`
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      color: var(--form-text-color, #333);
    }

    .form-container {
      max-width: 500px;
      margin: 0 auto;
      padding: 24px;
      background-color: var(--form-background, #fff);
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    h2 {
      margin-top: 0;
      color: var(--form-title-color, #2962ff);
      text-align: center;
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 6px;
      font-weight: 500;
    }

    input, textarea, select {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 16px;
      box-sizing: border-box;
    }

    input:focus, textarea:focus, select:focus {
      outline: none;
      border-color: #2962ff;
      box-shadow: 0 0 0 2px rgba(41, 98, 255, 0.2);
    }

    .error {
      color: #d32f2f;
      font-size: 14px;
      margin-top: 4px;
    }

    input.invalid, textarea.invalid, select.invalid {
      border-color: #d32f2f;
    }

    .submit-btn {
      background-color: var(--form-button-bg, #2962ff);
      color: white;
      border: none;
      border-radius: 4px;
      padding: 12px 24px;
      font-size: 16px;
      cursor: pointer;
      width: 100%;
      margin-top: 16px;
      transition: background-color 0.2s;
    }

    .submit-btn:hover {
      background-color: var(--form-button-hover, #0039cb);
    }

    .submit-btn:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    .loading-spinner {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255,255,255,0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 1s ease-in-out infinite;
      margin-left: 8px;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;

  constructor() {
    super();
    this.formData = {
      name: '',
      email: '',
      message: '',
      subject: 'general'
    };
    this.errors = {};
    this.loading = false;
  }

  /**
   * Validate form input
   * @returns {boolean} Whether the form is valid
   */
  validateForm() {
    const errors = {};
    let isValid = true;

    // Name validation
    if (!this.formData.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    } else if (this.formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(this.formData.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Message validation
    if (!this.formData.message.trim()) {
      errors.message = 'Message is required';
      isValid = false;
    } else if (this.formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
      isValid = false;
    }

    this.errors = errors;
    
    if (!isValid) {
      this.dispatchEvent(new CustomEvent('validation-error', {
        detail: { errors },
        bubbles: true,
        composed: true
      }));
    }
    
    return isValid;
  }

  /**
   * Handle input changes
   * @param {Event} e - Input event
   */
  handleInput(e) {
    const { name, value } = e.target;
    this.formData = {
      ...this.formData,
      [name]: value
    };
    
    // Clear error for this field if it exists
    if (this.errors[name]) {
      const newErrors = {...this.errors};
      delete newErrors[name];
      this.errors = newErrors;
    }
  }

  /**
   * Handle form submission
   * @param {Event} e - Submit event
   */
  async handleSubmit(e) {
    e.preventDefault();
    
    if (!this.validateForm()) {
      return;
    }
    
    this.loading = true;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success!
      this.dispatchEvent(new CustomEvent('form-submit', {
        detail: { formData: {...this.formData} },
        bubbles: true,
        composed: true
      }));
      
      // Reset form
      this.formData = {
        name: '',
        email: '',
        message: '',
        subject: 'general'
      };
    } finally {
      this.loading = false;
    }
  }

  render() {
    return html`
      <div class="form-container">
        <h2>Contact Form</h2>
        
        <form @submit=${this.handleSubmit}>
          <div class="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              .value=${this.formData.name}
              @input=${this.handleInput}
              class=${this.errors.name ? 'invalid' : ''}
              ?disabled=${this.loading}
            >
            ${this.errors.name ? html`<div class="error">${this.errors.name}</div>` : ''}
          </div>
          
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              .value=${this.formData.email}
              @input=${this.handleInput}
              class=${this.errors.email ? 'invalid' : ''}
              ?disabled=${this.loading}
            >
            ${this.errors.email ? html`<div class="error">${this.errors.email}</div>` : ''}
          </div>
          
          <div class="form-group">
            <label for="subject">Subject</label>
            <select
              id="subject"
              name="subject"
              .value=${this.formData.subject}
              @change=${this.handleInput}
              ?disabled=${this.loading}
            >
              <option value="general">General Inquiry</option>
              <option value="support">Technical Support</option>
              <option value="feedback">Feedback</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              .value=${this.formData.message}
              @input=${this.handleInput}
              class=${this.errors.message ? 'invalid' : ''}
              ?disabled=${this.loading}
            ></textarea>
            ${this.errors.message ? html`<div class="error">${this.errors.message}</div>` : ''}
          </div>
          
          <button
            type="submit"
            class="submit-btn"
            ?disabled=${this.loading}
          >
            ${this.loading ? 
              html`Submit <span class="loading-spinner"></span>` : 
              'Submit'
            }
          </button>
        </form>
      </div>
    `;
  }
}

customElements.define('validation-form', ValidationForm);
