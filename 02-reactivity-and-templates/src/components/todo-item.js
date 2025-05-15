import { LitElement, html, css } from 'lit';

/**
 * A component for displaying and interacting with a single todo item
 * Demonstrates:
 * - Property passing from parent
 * - Event dispatching to parent
 * - Conditional rendering based on properties
 */
export class TodoItem extends LitElement {
  static styles = css`
    :host {
      display: block;
      margin-bottom: 0.5rem;
    }
    
    .todo-item {
      display: flex;
      align-items: center;
      padding: 0.75rem;
      background-color: #fff;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow);
    }
    
    .todo-item.completed {
      background-color: #f9f9f9;
    }
    
    .checkbox {
      margin-right: 0.75rem;
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
    
    .task-text {
      flex: 1;
      transition: opacity 0.3s;
    }
    
    .completed .task-text {
      text-decoration: line-through;
      opacity: 0.7;
    }
    
    .delete-btn {
      background-color: var(--accent-color);
      color: white;
      border: none;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      font-weight: bold;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s;
    }
    
    .delete-btn:hover {
      transform: scale(1.1);
    }
  `;

  static properties = {
    task: { type: Object } // The task object passed from the parent
  };

  constructor() {
    super();
    this.task = { id: 0, text: '', completed: false };
  }

  // Event handlers that dispatch events to the parent
  toggleComplete() {
    this.dispatchEvent(new CustomEvent('task-toggle', {
      bubbles: true,
      composed: true,
      detail: { id: this.task.id }
    }));
  }

  deleteTask() {
    this.dispatchEvent(new CustomEvent('task-delete', {
      bubbles: true,
      composed: true,
      detail: { id: this.task.id }
    }));
  }

  render() {
    // Using the completed status to conditionally add a class
    const itemClass = this.task.completed ? 'todo-item completed' : 'todo-item';

    return html`
      <div class="${itemClass}">
        <input 
          type="checkbox" 
          class="checkbox" 
          ?checked="${this.task.completed}" 
          @click="${this.toggleComplete}">
        <span class="task-text">${this.task.text}</span>
        <button class="delete-btn" @click="${this.deleteTask}">✕</button>
      </div>
    `;
  }
}

customElements.define('todo-item', TodoItem);
