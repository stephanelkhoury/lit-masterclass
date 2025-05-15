import { LitElement, html, css } from 'lit';

/**
 * A simple Todo list component for testing demonstration
 * 
 * @fires todo-added - Fired when a new todo is added
 * @fires todo-removed - Fired when a todo is removed
 * @fires todo-toggled - Fired when a todo is toggled
 */
export class TodoList extends LitElement {
  static properties = {
    todos: { type: Array },
    loading: { type: Boolean },
    filter: { type: String }
  };

  static styles = css`
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      color: var(--todo-text-color, #333);
    }

    .todo-container {
      max-width: 500px;
      margin: 0 auto;
      padding: 16px;
      background-color: var(--todo-background, #fff);
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    h2 {
      margin-top: 0;
      color: var(--todo-title-color, #2962ff);
    }

    .todo-form {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
    }

    input {
      flex: 1;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 16px;
    }

    button {
      background-color: var(--todo-button-bg, #2962ff);
      color: white;
      border: none;
      border-radius: 4px;
      padding: 8px 16px;
      cursor: pointer;
      font-size: 16px;
    }

    button:hover {
      background-color: var(--todo-button-hover, #0039cb);
    }

    .filters {
      display: flex;
      margin-bottom: 16px;
      gap: 8px;
    }

    .filter-btn {
      background-color: #f5f5f5;
      color: #333;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 4px 12px;
      cursor: pointer;
    }

    .filter-btn.active {
      background-color: #2962ff;
      color: white;
      border-color: #2962ff;
    }

    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }

    li {
      padding: 12px 8px;
      border-bottom: 1px solid #eee;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    li:last-child {
      border-bottom: none;
    }

    .completed {
      text-decoration: line-through;
      opacity: 0.7;
    }

    .delete-btn {
      margin-left: auto;
      background-color: #f44336;
      padding: 4px 8px;
    }

    .delete-btn:hover {
      background-color: #d32f2f;
    }

    .loading {
      text-align: center;
      padding: 20px;
      color: #666;
    }

    .empty-state {
      text-align: center;
      padding: 20px;
      color: #666;
      font-style: italic;
    }
  `;

  constructor() {
    super();
    this.todos = [];
    this.loading = false;
    this.filter = 'all';
  }

  /**
   * Add a new todo item
   * @param {string} text - Text for the new todo
   * @returns {object} The newly created todo object
   */
  addTodo(text) {
    if (!text.trim()) return null;
    
    const newTodo = {
      id: Date.now(),
      text,
      completed: false
    };
    
    this.todos = [...this.todos, newTodo];
    
    this.dispatchEvent(new CustomEvent('todo-added', {
      detail: { todo: newTodo },
      bubbles: true,
      composed: true
    }));
    
    return newTodo;
  }

  /**
   * Toggle a todo's completed status
   * @param {number} id - ID of the todo to toggle
   */
  toggleTodo(id) {
    const todo = this.todos.find(t => t.id === id);
    if (!todo) return;
    
    todo.completed = !todo.completed;
    this.todos = [...this.todos];
    
    this.dispatchEvent(new CustomEvent('todo-toggled', {
      detail: { todo },
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Remove a todo item
   * @param {number} id - ID of the todo to remove
   */
  removeTodo(id) {
    const todoToRemove = this.todos.find(t => t.id === id);
    if (!todoToRemove) return;
    
    this.todos = this.todos.filter(t => t.id !== id);
    
    this.dispatchEvent(new CustomEvent('todo-removed', {
      detail: { todo: todoToRemove },
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Set the current filter
   * @param {string} filter - Filter to apply ('all', 'active', 'completed')
   */
  setFilter(filter) {
    this.filter = filter;
  }

  /**
   * Get filtered todos based on current filter
   * @returns {array} Filtered todo items
   */
  get filteredTodos() {
    switch(this.filter) {
      case 'active':
        return this.todos.filter(t => !t.completed);
      case 'completed':
        return this.todos.filter(t => t.completed);
      case 'all':
      default:
        return this.todos;
    }
  }

  /**
   * Simulate loading todos from a remote source
   * @returns {Promise} Promise that resolves when todos are loaded
   */
  async loadTodos() {
    this.loading = true;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      this.todos = [
        { id: 1, text: 'Learn about Lit', completed: true },
        { id: 2, text: 'Build components', completed: false },
        { id: 3, text: 'Write tests', completed: false }
      ];
      
      return this.todos;
    } finally {
      this.loading = false;
    }
  }

  render() {
    return html`
      <div class="todo-container">
        <h2>Todo List</h2>
        
        <!-- Todo input form -->
        <div class="todo-form">
          <input 
            type="text" 
            id="new-todo" 
            placeholder="Add a new task"
            @keyup=${e => e.key === 'Enter' && this.handleSubmit()}
          >
          <button @click=${this.handleSubmit}>Add</button>
        </div>
        
        <!-- Filters -->
        <div class="filters">
          <button 
            class="filter-btn ${this.filter === 'all' ? 'active' : ''}"
            @click=${() => this.setFilter('all')}
          >
            All
          </button>
          <button 
            class="filter-btn ${this.filter === 'active' ? 'active' : ''}"
            @click=${() => this.setFilter('active')}
          >
            Active
          </button>
          <button 
            class="filter-btn ${this.filter === 'completed' ? 'active' : ''}"
            @click=${() => this.setFilter('completed')}
          >
            Completed
          </button>
        </div>
        
        <!-- Loading state -->
        ${this.loading ? 
          html`<div class="loading">Loading todos...</div>` : 
          html`
            <!-- Todo list -->
            ${this.filteredTodos.length ? 
              html`
                <ul>
                  ${this.filteredTodos.map(todo => html`
                    <li>
                      <input 
                        type="checkbox"
                        .checked=${todo.completed}
                        @change=${() => this.toggleTodo(todo.id)}
                      >
                      <span class="${todo.completed ? 'completed' : ''}">${todo.text}</span>
                      <button 
                        class="delete-btn"
                        @click=${() => this.removeTodo(todo.id)}
                      >
                        Delete
                      </button>
                    </li>
                  `)}
                </ul>
              ` : 
              html`<div class="empty-state">No tasks to display</div>`
            }
          `
        }
      </div>
    `;
  }

  handleSubmit() {
    const input = this.shadowRoot.getElementById('new-todo');
    if (input.value.trim()) {
      this.addTodo(input.value);
      input.value = '';
      input.focus();
    }
  }
}

customElements.define('todo-list', TodoList);
