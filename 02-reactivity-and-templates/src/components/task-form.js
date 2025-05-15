import { LitElement, html, css } from 'lit';

/**
 * A form component for adding new tasks
 * Demonstrates:
 * - Form handling in Lit
 * - Reactive properties with value binding
 * - Event handling and form submission
 */
export class TaskForm extends LitElement {
  static styles = css`
    :host {
      display: block;
      margin-bottom: 1.5rem;
    }
    
    .form-container {
      display: flex;
      gap: 0.5rem;
    }
    
    input {
      flex: 1;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: var(--border-radius);
      font-size: 1rem;
    }
    
    button {
      padding: 0 1.5rem;
      background-color: var(--secondary-color);
      color: white;
      border: none;
      border-radius: var(--border-radius);
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.3s;
    }
    
    button:hover {
      background-color: #27ae60;
    }
    
    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
    
    .error {
      color: var(--accent-color);
      font-size: 0.8rem;
      margin-top: 0.5rem;
      height: 1rem;
    }
  `;

  static properties = {
    taskText: { type: String }, // The text input for the new task
    error: { type: String }, // Error message if validation fails
    minLength: { type: Number } // Minimum length validation
  };

  constructor() {
    super();
    this.taskText = '';
    this.error = '';
    this.minLength = 3; // Minimum characters required
  }

  // Update the taskText property when input changes
  handleInput(e) {
    this.taskText = e.target.value;
    
    // Clear error when user starts typing
    if (this.error) {
      this.error = '';
    }
  }

  // Validate and submit the form
  handleSubmit(e) {
    e.preventDefault();
    
    const text = this.taskText.trim();
    
    if (text.length < this.minLength) {
      this.error = `Task text must be at least ${this.minLength} characters`;
      return;
    }
    
    // Dispatch custom event with the new task text
    this.dispatchEvent(new CustomEvent('task-add', {
      bubbles: true,
      composed: true,
      detail: { text }
    }));
    
    // Reset the form
    this.taskText = '';
    this.error = '';
  }

  render() {
    const isValid = this.taskText.trim().length >= this.minLength;
    
    return html`
      <form @submit="${this.handleSubmit}">
        <div class="form-container">
          <input 
            type="text"
            placeholder="Add a new task..."
            .value="${this.taskText}"
            @input="${this.handleInput}"
            aria-label="New task text">
          
          <button 
            type="submit"
            ?disabled="${!isValid}">
            Add
          </button>
        </div>
        <div class="error" role="alert">${this.error}</div>
      </form>
    `;
  }
}

customElements.define('task-form', TaskForm);
